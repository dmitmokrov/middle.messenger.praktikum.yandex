import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import FormContainer from '../form-container';
import { getFormData } from '../../utils/getFormData';

const initialProps = {
  title: new Title({ text: 'Изменение пароля' }),
  formContainer: new FormContainer({
    formElements: [
      new FormField({
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
      new FormField({
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
      new FormField({
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
      new Button({ text: 'Сохранить', attrs: { type: 'submit' } }),
    ],
  }),
};

class PasswordChangePage extends Component {
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

export default PasswordChangePage;
