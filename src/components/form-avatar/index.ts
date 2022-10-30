import {template} from './template';
import Component from "../../base/Component";

class FormAvatar extends Component {
  constructor(props) {
    const attrs = {
      class: 'form-avatar',
    };

    super('div', {...props, attrs});
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default FormAvatar;
