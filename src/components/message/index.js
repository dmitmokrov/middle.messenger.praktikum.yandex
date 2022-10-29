import {template} from './template';
import Component from "../../base/Component";

class Button extends Component {
  constructor(props) {
    const attrs = Object.assign({}, props?.attrs, {
      class: `message ${props?.attrs?.class}`,
    });

    super('p', {...props, attrs});
  }

  render() {
    return this.compile(template, {text: this.props.text});
  }
}

export default Button;
