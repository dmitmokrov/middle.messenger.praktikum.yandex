import { compile } from 'handlebars';
import { v4 as makeID } from 'uuid';
import EventBus from './EventBus';

export type PropsType = Record<string, unknown> & {
  attrs?: { [key: string]: any };
  tag?: string;
};
type ChildrenType = Record<string, Component | Component[]>;

abstract class Component {
  id: string;

  children: ChildrenType;

  props: PropsType;

  #meta: { tagName: string; propsAndChildren: PropsType };

  #element: HTMLElement;

  #eventBus: EventBus;

  static EVENTS = {
    INIT: 'INIT',
    COMPONENT_DID_MOUNT: 'COMPONENT_DID_MOUNT',
    COMPONENT_DID_UPDATE: 'COMPONENT_DID_UPDATE',
    RENDER: 'RENDER',
  };

  constructor(tagName: string = 'div', propsAndChildren: PropsType = {}) {
    this.#meta = { tagName, propsAndChildren };
    const { children, props } = this.#getChildren(propsAndChildren);
    this.children = children;
    this.id = makeID();
    this.props = this.#makePropsProxy({ ...props, _id: this.id });
    this.#eventBus = new EventBus();
    this.#registerEvents(this.#eventBus);
    this.#eventBus.emit(Component.EVENTS.INIT);
  }

  init(): void {
    this.#createResources();
    this.#eventBus.emit(Component.EVENTS.RENDER);
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.#eventBus.emit(Component.EVENTS.COMPONENT_DID_MOUNT);
  }

  componentDidUpdate(oldProps: PropsType, newProps: PropsType): boolean {
    return !Object.entries(oldProps).every(
      ([key, value]) =>
        newProps[key] && JSON.stringify(newProps[key]) === JSON.stringify(value)
    );
  }

  abstract render(): DocumentFragment;

  compile(template: string, props: PropsType): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (item) => `<div data-id="${item.id}"></div>`
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this.#createDocumentElement(
      'template'
    ) as HTMLTemplateElement;
    fragment.innerHTML = compile(template)(propsAndStubs);

    Object.values(this.children)
      .flat()
      .forEach((child: Component) => {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      });

    return fragment.content;
  }

  setProps(newProps: PropsType): void {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  }

  getContent(): HTMLElement {
    return this.#element;
  }

  #registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(
      Component.EVENTS.COMPONENT_DID_MOUNT,
      this.#componentDidMount.bind(this)
    );
    eventBus.on(
      Component.EVENTS.COMPONENT_DID_UPDATE,
      this.#componentDidUpdate.bind(this)
    );
    eventBus.on(Component.EVENTS.RENDER, this.#render.bind(this));
  }

  #componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          item.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  #componentDidUpdate(oldProps: PropsType, newProps: PropsType): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.#render();
  }

  #render(): void {
    const component = this.render();
    this.#removeEvents();
    this.#element.innerHTML = '';
    this.#element.append(component);
    this.#addEvents();
  }

  #addEvents(): void {
    const events = this.#getEvents();
    events.forEach((event) => {
      const eventName = this.#getEventName(event);
      this.#element.addEventListener(
        eventName,
        this.props[event] as () => void
      );
    });
  }

  #removeEvents(): void {
    const events = this.#getEvents();
    events.forEach((event) => {
      const eventName = this.#getEventName(event);
      this.#element.removeEventListener(
        eventName,
        this.props[event] as () => void
      );
    });
  }

  #getEvents(): string[] {
    return Object.keys(this.props).filter((event) => event.startsWith('on'));
  }

  #getEventName(event: string): keyof HTMLElementEventMap {
    return event.slice(2).toLowerCase() as keyof HTMLElementEventMap;
  }

  #getChildren(propsAndChildren: PropsType): {
    children: ChildrenType;
    props: PropsType;
  } {
    const children: ChildrenType = {};
    const props: PropsType = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        value instanceof Component ||
        (Array.isArray(value) &&
          value.every((item) => item instanceof Component))
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  #createResources(): void {
    const { tagName, propsAndChildren } = this.#meta;
    this.#element = this.#createDocumentElement(tagName);
    const { attrs } = propsAndChildren;
    if (attrs) {
      Object.entries(attrs).forEach(([attr, value]) => {
        this.#element.setAttribute(attr, value);
      });
    }
  }

  #createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    // @ts-ignore
    if (this.props?.settings?.withInternalID) {
      element.setAttribute('data-id', this.id);
    }
    if (this.props?.attrs) {
      Object.entries(this.props?.attrs).forEach(([attr, value]) => {
        element.setAttribute(attr, value);
      });
    }
    return element;
  }

  #makePropsProxy(props: PropsType) {
    const self = this;
    props = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown): boolean {
        const oldProps = { ...target };
        target[prop] = value;
        const newProps = target;
        self.#eventBus.emit(
          Component.EVENTS.COMPONENT_DID_UPDATE,
          oldProps,
          newProps
        );
        return true;
      },
    });

    return props;
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}

export default Component;
