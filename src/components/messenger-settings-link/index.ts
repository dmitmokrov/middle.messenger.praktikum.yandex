import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class MessengerSettingsLink extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: `messenger__dialog-button`,
    };

    super('a', { ...props, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default MessengerSettingsLink;
