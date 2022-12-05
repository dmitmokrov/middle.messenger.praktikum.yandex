// eslint-disable-next-line
import { expect } from 'chai';
import Route from './Route';
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

function createRoute() {
  return new Route(Url.Index, TestComponent, { rootQuery: '.test' });
}

describe('Проверка методов роута', () => {
  it('Проверяем метод match', () => {
    const route = createRoute();
    expect(route.match(Url.Index)).to.eq(true);
    expect(route.match(Url.Messenger)).to.eq(false);
  });
});
