import {template} from './template';
import Component from "../../base/Component";

class Title extends Component {
  constructor(props) {
    const attrs = Object.assign({}, props?.attrs, {
      class: `title ${props?.attrs?.class}`,
    });

    super('h1', {...props, attrs});
  }

  render() {
    return this.compile(template, {text: this.props.text});
  }
}

export default Title;
