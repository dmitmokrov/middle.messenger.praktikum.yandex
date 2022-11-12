import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class ChatCard extends Component {
  constructor(props: PropsType) {
    const attrs = { ...props?.attrs, class: 'chat-card' };

    super('div', { ...props, attrs });
  }

  render() {
    const { avatar } = this.props;
    return this.compile(template, { avatar });
  }
}

export default ChatCard;
