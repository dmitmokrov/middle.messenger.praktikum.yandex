import { render } from '../../utils/render';
import Component from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import Avatar from '../avatar';

class Settings extends Component {
  constructor(props) {
    const attrs = {
      class: 'base-container',
    };

    super('div', { ...props, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const settings = new Settings({
  title: new Title({ text: 'Профиль' }),
  avatar: new Avatar({}),
  firstName: new FormField({
    id: 'first_name',
    label: 'Имя',
    input: new Input({
      attrs: {
        id: 'first_name',
        name: 'first_name',
        placeholder: 'Александр',
        readonly: 'readonly',
      },
    }),
  }),
  secondName: new FormField({
    id: 'second_name',
    label: 'Фамилия',
    input: new Input({
      attrs: {
        id: 'second_name',
        name: 'second_name',
        placeholder: 'Невский',
        readonly: 'readonly',
      },
    }),
  }),
  login: new FormField({
    id: 'login',
    label: 'Логин',
    input: new Input({
      attrs: {
        id: 'login',
        name: 'login',
        placeholder: 'Cool_man',
        readonly: 'readonly',
      },
    }),
  }),
  chatName: new FormField({
    id: 'display_name',
    label: 'Имя в чате',
    input: new Input({
      attrs: {
        id: 'display_name',
        name: 'display_name',
        placeholder: 'Cool_man',
        readonly: 'readonly',
      },
    }),
  }),
  email: new FormField({
    id: 'email',
    label: 'Почта',
    input: new Input({
      attrs: {
        id: 'email',
        name: 'email',
        placeholder: 'cool_man@mail.ru',
        readonly: 'readonly',
      },
    }),
  }),
  phone: new FormField({
    id: 'phone',
    label: 'Телефон',
    input: new Input({
      attrs: {
        id: 'phone',
        name: 'phone',
        placeholder: '8(123)456-78-90',
        readonly: 'readonly',
      },
    }),
  }),
  changeProfileButton: new Button({
    tag: 'a',
    text: 'Изменить данные',
    attrs: { href: '/profile-change.html' },
  }),
  changePasswordButton: new Button({
    tag: 'a',
    text: 'Изменить пароль',
    attrs: { href: '/password-change.html' },
  }),
  exitButton: new Button({
    text: 'Выйти',
    attrs: { class: 'button--secondary' },
  }),
});

render('.main', settings);
