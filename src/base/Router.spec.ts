// eslint-disable-next-line
import { expect } from 'chai';
import { Router } from './Router';
import Component, { PropsType } from './Component';
import { Url } from '../utils/Url';

class TestComponent extends Component {
  constructor(props: PropsType) {
    super('div', props);
  }

  render() {
    return this.compile('', this.props);
  }
}

function createRouter() {
  return new Router('.test');
}

describe('Проверка методов роутера', () => {
  it('Проверяем метод use', () => {
    const router = createRouter();
    router.use(Url.Index, TestComponent);
    expect(router.routes).to.have.length(1);
  });

  it('Проверяем метод getRoute', () => {
    const router = createRouter();
    router.use(Url.Index, TestComponent);
    expect(router.getRoute(Url.Index)).to.be.not.equal(undefined);
  });

  it('Проверяем метод go', () => {
    const router = createRouter();
    router
      .use(Url.Index, TestComponent)
      .use(Url.NotFound, TestComponent)
      .start();
    router.go(Url.NotFound);
    expect(router.history).to.have.length(2);
  });
});
