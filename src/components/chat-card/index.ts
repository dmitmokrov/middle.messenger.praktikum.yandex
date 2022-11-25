import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class ChatCard extends Component {
  constructor(props: PropsType) {
    const attrs = { ...props?.attrs, class: 'chat-card' };

    super('div', { ...props, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatCard;
