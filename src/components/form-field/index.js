import {template} from './template';
import Component from "../../base/Component";

class FormField extends Component {
  constructor(props) {
    const attrs = Object.assign({}, props?.attrs, {
      class: 'form-field',
    });

    super('p', {...props, attrs});
  }

  render() {
    return this.compile(template, {id: this.props.id, label: this.props.label, input: this.props.input});
  }
}

export default FormField;
