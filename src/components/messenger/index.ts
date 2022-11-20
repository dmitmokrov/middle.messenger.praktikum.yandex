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
      myMessage: new Message({
        text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА
        в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.
        Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря,
        все тушки этих камер все еще находятся на поверхности Луны, так как астронавты
        с собой забрали только кассеты с пленкой.`,
        attrs: { class: 'messenger__dialog-message' },
      }),
      opponentMessage: new Message({
        text: `Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету
        они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно
        продали на аукционе за 45000 евро.`,
        attrs: { class: 'message--opponent messenger__dialog-message' },
      }),
      messengerForm: new MessengerForm({
        messageInput: new Input({
          attrs: {
            id: 'message',
            name: 'message',
            placeholder: 'Сообщение...',
          },
        }),
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
    avatarSrc: state?.user?.avatar ? getResource(state.user.avatar) : 'https://www.fillmurray.com/300/600',
    attrs: { class: 'messenger__dialog-avatar' },
  }),
  userName: state?.user?.first_name,
  chats: state?.chats.map(
    (chat) =>
      new ChatCard({
        avatar: new Avatar({
          attrs: { class: 'chat-card__avatar' },
          avatarSrc: chat.avatar || 'https://www.fillmurray.com/300/600',
        }),
        deleteChatButton: new Button({
          text: 'Удалить чат',
          attrs: { class: 'chat-card__button' },
          onClick: () => {
            chatController.deleteChat(chat.id);
          },
        }),
        addUserButton: new Button({
          text: 'Добавить участников',
          attrs: { class: 'chat-card__button' },
          onClick: () => {
            chatController.addChatUsers(chat.id);
          },
        }),
        deleteUserButton: new Button({
          text: 'Удалить участников',
          attrs: { class: 'chat-card__button' },
          onClick: () => {
            chatController.deleteChatUser(chat.id);
          },
        }),
        chatInfo: chat,
      })
  ),
}));

export default withUser(MessengerPage);
