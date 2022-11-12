import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class FormField extends Component {
  constructor(props: PropsType) {
    const attrs = { ...props?.attrs, class: 'form-field' };

    super('p', { ...props, attrs });
  }

  render() {
    const { id, label, input } = this.props;
    return this.compile(template, { id, label, input });
  }
}

export default FormField;
