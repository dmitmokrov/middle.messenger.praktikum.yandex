import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Title from '../title';
import FormAvatar from '../form-avatar';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import Avatar from '../avatar';
import FormContainer from '../form-container';
import { getFormData } from '../../utils/getFormData';

const initialProps = {
  title: new Title({ text: 'Изменение данных' }),
  formContainer: new FormContainer({
    formElements: [
      new FormAvatar({
        id: 'avatar',
        label: 'Изменить аватар',
        name: 'avatar',
        avatar: new Avatar({}),
      }),
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
        id: 'display_name',
        label: 'Имя в чате',
        input: new Input({
          attrs: {
            id: 'display_name',
            name: 'display_name',
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
      new Button({ text: 'Сохранить', attrs: { type: 'submit' } }),
    ],
  }),
};

class ProfileChangePage extends Component {
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

export default ProfileChangePage;
