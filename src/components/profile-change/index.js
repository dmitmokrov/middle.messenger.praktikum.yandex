import {render} from '../../utils/render';
import Component from '../../base/Component';
import {template} from './template';
import Title from '../title';
import FormAvatar from '../form-avatar';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import Avatar from '../avatar';

class ProfileChange extends Component {
  constructor(props) {
    const attrs = {
      class: 'base-container',
    };

    super('div', {...props, attrs});
  }

  render() {
    return this.compile(template, this.props);
  }
}

const profileChange = new ProfileChange({
  title: new Title({text: 'Изменение данных'}),
  avatar: new FormAvatar({
    id: "avatar",
    label:"Изменить аватар",
    name: "avatar",
    avatar: new Avatar({}),
  }),
  firstName: new FormField({
    id: 'first_name',
    label: 'Имя',
    input: new Input({attrs: {
      id: 'first_name',
      name: 'first_name',
      placeholder: "Александр",
    }}),
  }),
  secondName: new FormField({
    id: 'second_name',
    label: 'Фамилия',
    input: new Input({attrs: {
      id: 'second_name',
      name: 'second_name',
      placeholder: "Невский",
    }}),
  }),
  login: new FormField({
    id: 'login',
    label: 'Логин',
    input: new Input({attrs: {
      id: 'login',
      name: 'login',
      placeholder: "Cool_man",
    }}),
  }),
  chatName: new FormField({
    id: 'display_name',
    label: 'Имя в чате',
    input: new Input({attrs: {
      id: 'display_name',
      name: 'display_name',
      placeholder: "Cool_man",
    }}),
  }),
  email: new FormField({
    id: 'email',
    label: 'Почта',
    input: new Input({attrs: {
      id: 'email',
      name: 'email',
      placeholder: "cool_man@mail.ru",
    }}),
  }),
  phone: new FormField({
    id: 'phone',
    label: 'Телефон',
    input: new Input({attrs: {
      id: 'phone',
      name: 'phone',
      placeholder: "8(123)456-78-90",
    }}),
  }),
  button: new Button({text: 'Сохранить', attrs: {type: 'submit'}}),
});

render('.main', profileChange);
