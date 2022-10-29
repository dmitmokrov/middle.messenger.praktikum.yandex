import {template} from './template';
import Component from "../../base/Component";

class Button extends Component {
  constructor(props) {
    const attrs = Object.assign({}, props?.attrs, {
      class: `button ${props?.attrs?.class}`,
    });

    const tag = props?.tag || 'button';

    super(tag, {...props, attrs});
  }

  render() {
    return this.compile(template, {text: this.props.text});
  }
}

export default Button;
