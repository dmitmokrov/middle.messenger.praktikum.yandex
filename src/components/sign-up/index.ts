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
import authController from '../../controllers/auth-controller';
import store, { StoreEvent } from '../../store/store';

const initialProps = {
  title: new Title({ text: 'Регистрация' }),
  formContainer: new FormContainer({
    formElements: [
      new FormField({
        id: 'first_name',
        label: 'Имя',
        input: new Input({
          attrs: {
            id: 'first_name',
            name: 'first_name',
            placeholder: 'Александр',
          },
        }),
      }),
      new FormField({
        id: 'second_name',
        label: 'Фамилия',
        input: new Input({
          attrs: {
            id: 'second_name',
            name: 'second_name',
            placeholder: 'Невский',
          },
        }),
      }),
      new FormField({
        id: 'login',
        label: 'Логин',
        input: new Input({
          attrs: {
            id: 'login',
            name: 'login',
            placeholder: 'Cool_man',
          },
        }),
      }),
      new FormField({
        id: 'email',
        label: 'Почта',
        input: new Input({
          attrs: {
            id: 'email',
            name: 'email',
            placeholder: 'cool_man@mail.ru',
          },
        }),
      }),
      new FormField({
        id: 'phone',
        label: 'Телефон',
        input: new Input({
          attrs: {
            id: 'phone',
            name: 'phone',
            placeholder: '8(123)456-78-90',
          },
        }),
      }),
      new FormField({
        id: 'password',
        label: 'Пароль',
        input: new Input({
          attrs: {
            id: 'password',
            name: 'password',
            placeholder: 'Secret_word',
          },
        }),
      }),
      new Button({
        text: 'Зарегистрироваться',
        attrs: { type: 'submit' },
      }),
      new Button({
        text: 'Войти',
        attrs: { class: 'button--secondary' },
        onClick: goTo(Url.Index),
      }),
    ],
    onSubmit: authController.signUp,
  }),
};

class SignUpPage extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'base-container',
    };

    super('div', { ...props, ...initialProps, attrs });
    store.on(StoreEvent.UPDATED, () => {
      console.log('Init store');
    });
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

export default SignUpPage;
