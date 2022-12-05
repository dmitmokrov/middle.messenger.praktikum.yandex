import { render } from '../utils/render';
import Component, { PropsType as ComponentPropsType } from './Component';

type PropsType = {
  rootQuery: string;
};

class Route<T extends Component> {
  #pathname: string;

  #componentClass: new (props: ComponentPropsType) => T;

  #component: T | null;

  #props: PropsType;

  constructor(
    pathname: string,
    view: new (props: ComponentPropsType) => T,
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
      this.#component = new this.#componentClass({});
      render(this.#props.rootQuery, this.#component);
      return;
    }

    this.#component.show();
  }
}

export default Route;
