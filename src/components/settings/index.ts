import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import Avatar from '../avatar';
import FormContainer from '../form-container';
import { goTo } from '../../base/Router';
import { Url } from '../../utils/Url';

const initialProps = {
  title: new Title({ text: 'Профиль' }),
  formContainer: new FormContainer({
    formElements: [
      new Avatar({}),
      new FormField({
        id: 'first_name',
        label: 'Имя',
        input: new Input({
          attrs: {
            id: 'first_name',
            name: 'first_name',
            placeholder: 'Александр',
            disabled: 'disabled',
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
            disabled: 'disabled',
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
            disabled: 'disabled',
          },
        }),
      }),
      new FormField({
        id: 'display_name',
        label: 'Имя в чате',
        input: new Input({
          attrs: {
            id: 'display_name',
            name: 'display_name',
            placeholder: 'Cool_man',
            disabled: 'disabled',
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
            disabled: 'disabled',
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
            disabled: 'disabled',
          },
        }),
      }),
      new Button({
        text: 'Изменить данные',
        onClick: goTo(Url.ProfileChange),
      }),
      new Button({
        text: 'Изменить пароль',
        onClick: goTo(Url.PasswordChange),
      }),
      new Button({
        text: 'Выйти',
        attrs: { class: 'button--secondary' },
      }),
    ],
  }),
};

class SettingsPage extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'base-container',
    };

    super('div', { ...props, ...initialProps, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default SettingsPage;
