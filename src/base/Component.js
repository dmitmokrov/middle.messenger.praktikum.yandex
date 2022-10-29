import { compile } from 'handlebars';
import { v4 as makeID } from 'uuid';
import EventBus from './EventBus';

class Component {
  static EVENTS = {
    INIT: 'INIT',
    COMPONENT_DID_MOUNT: 'COMPONENT_DID_MOUNT',
    COMPONENT_DID_UPDATE: 'COMPONENT_DID_UPDATE',
    RENDER: 'RENDER',
  }

  #element = null;
  #meta = null;
  #eventBus = null;

  constructor(tagName = 'div', propsAndChildren = {}) {
    this.#meta = { tagName, propsAndChildren };
    const {children, props} = this.#getChildren(propsAndChildren);
    this.children = children;
    this.id = makeID();
    this.props = this.#makePropsProxy({...props, _id: this.id});
    this.#eventBus = new EventBus();
    this.#registerEvents(this.#eventBus);
    this.#eventBus.emit(Component.EVENTS.INIT);
  }

  init() {
    this.#createResources();
    this.#eventBus.emit(Component.EVENTS.RENDER);
  }

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.#eventBus.emit(Component.EVENTS.COMPONENT_DID_MOUNT);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  render() {}

  compile(template, props) {
    const propsAndStubs = {...props};

    console.log('this.children', this.children);
    Object.entries(this.children).forEach(([key, child]) => {
      console.log(key);
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this.#createDocumentElement('template');
    console.log(propsAndStubs);
    fragment.innerHTML = compile(template)(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  setProps(newProps) {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  }

  getContent() {
    return this.#element;
  }

  #registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.COMPONENT_DID_MOUNT, this.#componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.COMPONENT_DID_UPDATE, this.#componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.RENDER, this.#render.bind(this));
  }

  #componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  #componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.#render();
  }

  #render() {
    const component = this.render();
    this.#removeEvents();
    this.#element.innerHTML = '';
    this.#element.append(component);
    this.#addEvents();
  }

  #addEvents() {
    const events = this.#getEvents();
    events.forEach(event => {
      const eventName = this.#getEventName(event);
      this.#element.addEventListener(eventName, this.props[event]);
    });
  }

  #removeEvents() {
    const events = this.#getEvents();
    events.forEach(event => {
      const eventName = this.#getEventName(event);
      this.#element.removeEventListener(eventName, this.props[event]);
    });
  }

  #getEvents() {
    return Object.keys(this.props).filter(event => event.startsWith('on'));
  }

  #getEventName(event) {
    return event.slice(2).toLowerCase();
  }

  #getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {children, props};
  }

  #createResources() {
    const { tagName, propsAndChildren } = this.#meta;
    this.#element = this.#createDocumentElement(tagName);
    const {attrs} = propsAndChildren;
    if (attrs) {
      Object.entries(attrs).forEach(([attr, value]) => {
        this.#element.setAttribute(attr, value);
      });
    }
  }

  #createDocumentElement(tagName) {
    const element = document.createElement(tagName);
    if (this.props?.settings?.withInternalID) {
      element.setAttribute('data-id', this.id);
    }
    if (this.props?.attrs) {
      Object.entries(this.props?.attrs).forEach(([attr, value]) => {
        element.setAttribute(attr, value);
      })
    }
    return element;
  }

  #makePropsProxy(props) {
    const self = this;
    props = new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = {...target};
        target[prop] = value;
        const newProps = target;
        self.#eventBus.emit(Component.EVENTS.COMPONENT_DID_UPDATE, oldProps, newProps);
        return true;
      },
    });

    return props;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Component;
