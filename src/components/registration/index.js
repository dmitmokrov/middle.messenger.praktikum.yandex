import {render} from '../../utils/render';
import Component from '../../base/Component';
import {template} from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';

class Registration extends Component {
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

const registration = new Registration({
  title: new Title({text: 'Регистрация'}),
  firstName: new FormField({
    id: 'first_name',
    label: 'Имя',
    input: new Input({attrs: {
      id: 'first_name',
      name: 'first_name',
      placeholder: 'Александр',
    }}),
  }),
  secondName: new FormField({
    id: 'second_name',
    label: 'Фамилия',
    input: new Input({attrs: {
      id: 'second_name',
      name: 'second_name',
      placeholder: 'Невский',
    }}),
  }),
  login: new FormField({
    id: 'login',
    label: 'Логин',
    input: new Input({attrs: {
      id: 'login',
      name: 'login',
      placeholder: 'Cool_man',
    }}),
  }),
  email: new FormField({
    id: 'email',
    label: 'Почта',
    input: new Input({attrs: {
      id: 'email',
      name: 'email',
      placeholder: 'cool_man@mail.ru',
    }}),
  }),
  phone: new FormField({
    id: 'phone',
    label: 'Телефон',
    input: new Input({attrs: {
      id: 'phone',
      name: 'phone',
      placeholder: '8(123)456-78-90',
    }}),
  }),
  password: new FormField({
    id: 'password',
    label: 'Пароль',
    input: new Input({attrs: {
      id: 'password',
      name: 'password',
      placeholder: 'Secret_word',
    }}),
  }),
  repeatPassword: new FormField({
    id: 'password-repeat',
    label: 'Пароль еще раз',
    input: new Input({attrs: {
      id: 'password-repeat',
      name: 'password-repeat',
      placeholder: 'Secret_word',
    }}),
  }),
  registerButton: new Button({text: 'Зарегистрироваться', attrs: {type: 'submit'}}),
  enterButton: new Button({tag: 'a', text: 'Войти', attrs: {href: '/authorization.html', class: 'button--secondary'}}),
});

render('.main', registration);
