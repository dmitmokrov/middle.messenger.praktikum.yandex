import { render } from '../../utils/render';
import Component from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import { getFormData } from '../../utils/getFormData';
import { validateForm } from '../../utils/validate';

class PasswordChange extends Component {
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

const passwordChange = new PasswordChange({
  title: new Title({ text: 'Изменение пароля' }),
  oldPassword: new FormField({
    id: 'oldPassword',
    label: 'Старый пароль',
    input: new Input({
      attrs: {
        label: 'Старый пароль',
        id: 'oldPassword',
        name: 'oldPassword',
        type: 'password',
        placeholder: 'Secret_word',
      },
    }),
  }),
  newPassword: new FormField({
    id: 'newPassword',
    label: 'Новый пароль',
    input: new Input({
      attrs: {
        label: 'Новый пароль',
        id: 'newPassword',
        name: 'newPassword',
        type: 'password',
        placeholder: 'New_secret_word',
      },
    }),
  }),
  repeatNewPassword: new FormField({
    id: 'newPasswordRepeat',
    label: 'Повторить новый пароль',
    input: new Input({
      attrs: {
        label: 'Повторить новый пароль',
        id: 'newPasswordRepeat',
        name: 'newPasswordRepeat',
        type: 'password',
        placeholder: 'New_secret_word',
      },
    }),
  }),
  button: new Button({ text: 'Сохранить', attrs: { type: 'submit' } }),
});

render('.main', passwordChange);
