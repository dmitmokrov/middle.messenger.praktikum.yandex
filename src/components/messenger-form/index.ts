import { template } from './template';
import Component, { PropsType } from '../../base/Component';
import { onSubmit } from '../../utils/validate';

class MessengerForm extends Component {
  constructor(props: PropsType) {
    super('form', { ...props, onSubmit });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default MessengerForm;
