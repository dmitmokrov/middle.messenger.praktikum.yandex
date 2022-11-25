import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class FormContainer extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'form-container',
    };

    super('form', { ...props, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default FormContainer;
