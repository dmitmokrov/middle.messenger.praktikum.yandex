import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class Input extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'input',
      type: 'text',
      ...props?.attrs,
    };

    super('input', { ...props, attrs });
  }

  render() {
    return this.compile(template, {});
  }
}

export default Input;
