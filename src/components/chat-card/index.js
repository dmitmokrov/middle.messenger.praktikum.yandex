import {template} from './template';
import Component from "../../base/Component";

class ChatCard extends Component {
  constructor(props) {
    const attrs = Object.assign({}, props?.attrs, {
      class: 'chat-card',
    });

    super('div', {...props, attrs});
  }

  render() {
    return this.compile(template, {avatar: this.props.avatar});
  }
}

export default ChatCard;
