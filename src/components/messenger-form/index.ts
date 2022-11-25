import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class MessengerForm extends Component {
  constructor(props: PropsType) {
    super('form', { ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default MessengerForm;
