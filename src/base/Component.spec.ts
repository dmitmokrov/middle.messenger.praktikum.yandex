// eslint-disable-next-line
import { expect } from 'chai';
import Component, { PropsType } from './Component';

class TestComponent extends Component {
  constructor(props: PropsType) {
    super('div', props);
  }

  render() {
    return this.compile('', this.props);
  }
}

function createComponent() {
  return new TestComponent({});
}

describe('Проверка методов компонента', () => {
  it('Проверяем метод componentDidUpdate', () => {
    const component = createComponent();
    const oldProps = { prop: 'oldProp' };
    const newProps = { prop: 'newProp' };
    expect(component.componentDidUpdate(oldProps, oldProps)).to.eq(false);
    expect(component.componentDidUpdate(oldProps, newProps)).to.eq(true);
  });

  it('Проверяем метод setProps', () => {
    const component = createComponent();
    const newProps = { prop: 'newProp' };
    component.setProps(newProps);
    expect(component.props).to.have.property('prop');
    expect(component.props.prop).to.eq('newProp');
  });
});
