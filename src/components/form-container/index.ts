import { template } from './template';
import Component, { PropsType } from '../../base/Component';
import { onSubmit } from '../../utils/validate';

class FormContainer extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'form-container',
    };

    super('form', { ...props, attrs, onSubmit });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default FormContainer;
