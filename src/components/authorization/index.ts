import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import FormContainer from '../form-container';
import { getFormData } from '../../utils/getFormData';
import { goTo } from '../../base/Router';
import { Url } from '../../utils/Url';

const initialProps = {
  title: new Title({ text: 'Авторизация' }),
  formContainer: new FormContainer({
    formElements: [
      new FormField({
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
      new FormField({
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
      new Button({ text: 'Войти', attrs: { type: 'submit' } }),
      new Button({
        text: 'Зарегистрироваться',
        attrs: { class: 'button--secondary' },
        onClick: goTo(Url.SignUp),
      }),
    ],
  }),
};
class AuthorizationPage extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'base-container',
    };

    super('div', { ...props, ...initialProps, attrs });
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

export default AuthorizationPage;
