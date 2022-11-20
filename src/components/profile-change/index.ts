import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
import FormField from '../form-field';
import Input from '../input';
import FormContainer from '../form-container';
import { getFormData } from '../../utils/getFormData';
import userController from '../../controllers/user-controller';
import { connect } from '../../store/store';

class ProfileChangePage extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'base-container',
    };

    const initialProps = {
      title: new Title({ text: 'Изменение данных' }),
    };

    super('div', { ...initialProps, ...props, attrs });
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

const withUser = connect((state) => ({
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
            value: state.user.first_name,
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
            value: state.user.second_name,
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
            value: state.user.login,
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
            value:
              state.user.display_name ||
              `${state.user.first_name} ${state.user.second_name}`,
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
            value: state.user.email,
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
            value: state.user.phone,
          },
        }),
      }),
      new Button({ text: 'Сохранить', attrs: { type: 'submit' } }),
    ],
    onSubmit: userController.updateProfile,
  }),
}));

export default withUser(ProfileChangePage);
