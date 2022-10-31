import { render } from '../../utils/render';
import Component from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import { getFormData } from '../../utils/getFormData';
import { validateForm } from '../../utils/validate';

class Authorization extends Component {
  constructor(props) {
    const attrs = {
      class: 'base-container',
    };

    super('div', { ...props, attrs });
  }

  componentDidMount() {
    const form = this.getContent().querySelector('form');
    if (form) {
      getFormData(form);
      validateForm(form);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

const authorization = new Authorization({
  title: new Title({ text: 'Авторизация' }),
  login: new FormField({
    id: 'login',
    label: 'Логин',
    input: new Input({
      attrs: {
        label: 'Логин',
        id: 'login',
        name: 'login',
        placeholder: 'Cool_man',
      },
    }),
  }),
  password: new FormField({
    id: 'password',
    label: 'Пароль',
    input: new Input({
      attrs: {
        label: 'Пароль',
        id: 'password',
        name: 'password',
        type: 'password',
        placeholder: 'Secret_word',
      },
    }),
  }),
  enterButton: new Button({ text: 'Войти', attrs: { type: 'submit' } }),
  registerButton: new Button({
    tag: 'a',
    text: 'Зарегистрироваться',
    attrs: { href: '/registration.html', class: 'button--secondary' },
  }),
});

render('.main', authorization);
