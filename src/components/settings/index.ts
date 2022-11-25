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
import authController from '../../controllers/auth-controller';
import { connect } from '../../store/store';
import { getResource } from '../../base/BaseAPI';
import FormAvatar from '../form-avatar';
import userController from '../../controllers/user-controller';

class SettingsPage extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'base-container',
    };

    const initialProps = {
      title: new Title({ text: 'Профиль' }),
    };

    super('div', { ...initialProps, ...props, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = connect((state) => ({
  avatar: new FormAvatar({
    id: 'avatar',
    label: 'Изменить аватар',
    name: 'avatar',
    avatar: new Avatar({
      avatarSrc: state?.user?.avatar
        ? getResource(state.user.avatar)
        : 'https://www.fillmurray.com/300/600',
    }),
    submitButton: new Button({
      text: 'Сохранить аватар',
      attrs: {
        class: 'form-avatar__button',
        type: 'submit',
      },
    }),
    onSubmit: userController.updateAvatar,
  }),
  formContainer: new FormContainer({
    formElements: [
      new FormField({
        id: 'first_name',
        label: 'Имя',
        input: new Input({
          attrs: {
            id: 'first_name',
            name: 'first_name',
            placeholder: state?.user?.first_name,
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
            placeholder: state?.user?.second_name,
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
            placeholder: state?.user?.login,
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
            placeholder:
              state?.user?.display_name ||
              `${state?.user?.first_name} ${state?.user?.second_name}`,
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
            placeholder: state?.user?.email,
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
            placeholder: state?.user?.phone,
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
        attrs: { class: 'button--secondary', type: 'submit' },
      }),
    ],
    onSubmit: authController.logout,
  }),
}));

export default withUser(SettingsPage);
