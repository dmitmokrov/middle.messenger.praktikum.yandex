import { render } from '../../utils/render';
import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Input from '../input';
import Avatar from '../avatar';
import ChatCard from '../chat-card';
import Message from '../message';
import MessengerForm from '../messenger-form';
import { getFormData } from '../../utils/getFormData';

class Index extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'messenger',
    };

    super('section', { ...props, attrs });
  }

  componentDidMount() {
    const form = this.getContent().querySelector('form');
    if (form) {
      getFormData(form);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

const index = new Index({
  search: new Input({
    attrs: {
      placeholder: 'Поиск...',
    },
  }),
  chatCard: new ChatCard({
    avatar: new Avatar({ attrs: { class: 'chat-card__avatar' } }),
  }),
  avatar: new Avatar({ attrs: { class: 'messenger__dialog-avatar' } }),
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
});

render('.main', index);
