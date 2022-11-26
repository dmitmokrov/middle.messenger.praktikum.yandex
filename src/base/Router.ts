import Route from './Route';
import Component from './Component';
import { Url } from '../utils/Url';
import store from '../store/store';

class Router {
  routes: Route[];

  history: History;

  #currentRoute: Route | null;

  #rootQuery: string;

  static #instance: Router;

  constructor(rootQuery: string) {
    if (Router.#instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.#instance;
    }

    this.routes = [];
    this.history = window.history;
    this.#currentRoute = null;
    this.#rootQuery = rootQuery;
    Router.#instance = this;
  }

  use(pathname: string, component: typeof Component): Router {
    const route = new Route(pathname, component, {
      rootQuery: this.#rootQuery,
    });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: Event) => {
      const currentTarget = event.currentTarget as Window;
      this.#onRoute(currentTarget.location.pathname);
    };

    this.#onRoute(window.location.pathname);
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this.#onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  #onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go(Url.NotFound);
      return;
    }

    const { isAuth } = store.getState();

    if (
      !isAuth &&
      pathname !== Url.Index &&
      pathname !== Url.SignUp &&
      pathname !== Url.NotFound
    ) {
      this.go(Url.Index);
      return;
    }

    if (this.#currentRoute && this.#currentRoute !== route) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
  }
}

const router = new Router('.main');

export const goTo = (pathname: string) => (event: Event) => {
  event.preventDefault();
  router.go(pathname);
};

export default router;
