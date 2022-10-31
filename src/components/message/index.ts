import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class Button extends Component {
  constructor(props: PropsType) {
    const attrs = {
      ...props?.attrs,
      class: `message ${props?.attrs?.class}`,
    };

    super('p', { ...props, attrs });
  }

  render() {
    const { text } = this.props;
    return this.compile(template, { text });
  }
}

export default Button;
