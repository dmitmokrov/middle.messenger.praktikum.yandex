import { render } from '../utils/render';
import Component from './Component';

type PropsType = {
  rootQuery: string;
};

type InstantiableComponent<T extends Component> = {
  new (...args: any[]): T;
};

class Route {
  #pathname: string;

  #componentClass: InstantiableComponent<Component>;

  #component: Component | null;

  #props: PropsType;

  constructor(
    pathname: string,
    view: InstantiableComponent<any>,
    props: PropsType
  ) {
    this.#pathname = pathname;
    this.#componentClass = view;
    this.#component = null;
    this.#props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this.#component) {
      this.#component.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this.#pathname;
  }

  render(): void {
    if (!this.#component) {
      this.#component = new this.#componentClass();
      render(this.#props.rootQuery, this.#component);
      return;
    }

    this.#component.show();
  }
}

export default Route;
