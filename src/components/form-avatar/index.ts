import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class FormAvatar extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'form-avatar',
    };

    super('form', { ...props, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default FormAvatar;
