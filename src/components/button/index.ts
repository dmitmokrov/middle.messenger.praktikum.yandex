import { template } from './template';
import Component, { PropsType } from '../../base/Component';

type ButtonPropsType = PropsType & { text: string };

class Button extends Component {
  constructor(props: ButtonPropsType) {
    const attrs = {
      ...props?.attrs,
      class: `button ${props?.attrs?.class}`,
    };

    const tag = props?.tag || 'button';

    super(tag, { ...props, attrs });
  }

  render() {
    const { text } = this.props;
    return this.compile(template, { text });
  }
}

export default Button;
