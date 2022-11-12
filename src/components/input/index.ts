import { template } from './template';
import Component, { PropsType } from '../../base/Component';
import { onBlur } from '../../utils/validate';

class Input extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'input',
      type: 'text',
      ...props?.attrs,
    };

    super('input', { ...props, attrs, onBlur });
  }

  render() {
    return this.compile(template, {});
  }
}

export default Input;
