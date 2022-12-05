import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Input from '../input';
import Avatar from '../avatar';
import ChatCard from '../chat-card';
import Message from '../message';
import MessengerForm from '../messenger-form';
import { getFormData } from '../../utils/getFormData';
import MessengerSettingsLink from '../messenger-settings-link';
import { goTo } from '../../base/Router';
import { Url } from '../../utils/Url';
import { connect } from '../../store/store';
import chatController from '../../controllers/chat-controller';
import Button from '../button';
import { getResource } from '../../base/BaseAPI';

class MessengerPage extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'messenger',
    };

    const initialProps = {
      search: new Input({
        attrs: {
          placeholder: 'Поиск...',
        },
      }),
      addChatButton: new Button({
        text: 'Новый чат',
        attrs: { class: 'messenger__add-chat-button' },
        onClick: chatController.createChat,
      }),
      messengerSettingsLink: new MessengerSettingsLink({
        onClick: goTo(Url.Settings),
      }),
      messengerForm: new MessengerForm({
        messageInput: new Input({
          attrs: {
            id: 'message',
            name: 'message',
            placeholder: 'Сообщение...',
          },
          onBlur: () => {},
        }),
        onSubmit: chatController.sendMessage,
      }),
    };

    super('section', { ...initialProps, ...props, attrs });
  }

  async componentDidMount() {
    const form = this.getContent().querySelector('form');
    if (form) {
      getFormData(form);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = connect((state) => ({
  avatar: new Avatar({
    avatarSrc: state?.user?.avatar
      ? getResource(state.user.avatar)
      : 'https://www.fillmurray.com/300/600',
    attrs: { class: 'messenger__dialog-avatar' },
  }),
  userName: state?.user?.first_name,
  // @ts-ignore
  chats: state?.chats.map(
    (chat) =>
      new ChatCard({
        avatar: new Avatar({
          attrs: { class: 'chat-card__avatar' },
          avatarSrc: chat?.avatar || 'https://www.fillmurray.com/300/600',
        }),
        deleteChatButton: new Button({
          text: 'Удалить чат',
          attrs: { class: 'chat-card__button' },
          onClick: (event: Event) => {
            event.stopPropagation();
            chatController.deleteChat(chat.id);
          },
        }),
        addUserButton: new Button({
          text: 'Добавить участников',
          attrs: { class: 'chat-card__button' },
          onClick: (event: Event) => {
            event.stopPropagation();
            chatController.addChatUsers(chat.id);
          },
        }),
        deleteUserButton: new Button({
          text: 'Удалить участников',
          attrs: { class: 'chat-card__button' },
          onClick: (event: Event) => {
            event.stopPropagation();
            chatController.deleteChatUser(chat.id);
          },
        }),
        chatInfo: chat,
        onClick: () => {
          chatController.connectToChat(chat.id);
        },
      })
  ),
  // @ts-ignore
  chatMessages: state.chatMessages.map(
    (message) =>
      new Message({
        text: message.content,
        attrs: {
          class: `${
            message.user_id !== state.user.id ? 'message--opponent' : ''
          } messenger__dialog-message`,
        },
      })
  ),
}));

export default withUser(MessengerPage);
