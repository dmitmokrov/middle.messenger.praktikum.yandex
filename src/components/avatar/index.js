import {template} from './template';
import Component from "../../base/Component";

class Avatar extends Component {
  constructor(props) {
    const attrs = Object.assign({}, props?.attrs, {
      class: `avatar ${props?.attrs?.class}`,
    });

    super('div', {...props, attrs});
  }

  render() {
    return this.compile(template, {});
  }
}

export default Avatar;
