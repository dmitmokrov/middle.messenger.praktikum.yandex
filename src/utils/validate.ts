const INPUT_NAME = {
  FIRST_NAME: 'first_name',
  SECOND_NAME: 'second_name',
  LOGIN: 'login',
  EMAIL: 'email',
  PASSWORD: 'password',
  OLD_PASSWORD: 'oldPassword',
  NEW_PASSWORD: 'newPassword',
  PHONE: 'phone',
  MESSAGE: 'message',
};

const isValueLengthValid = (value: string, min: number, max: number): boolean =>
  value.length >= min && value.length <= max;

const validate = (inputName: string, value: string): string => {
  let error = '';

  switch (inputName) {
    case INPUT_NAME.FIRST_NAME:
    case INPUT_NAME.SECOND_NAME:
      if (!/[A-ZА-ЯЁ]/.test(value[0])) {
        error = 'Первая буква должна быть заглавной';
        break;
      }

      if (!/^[a-zA-Zа-яёА-ЯЁ-]*$/.test(value.slice(1))) {
        error = 'Разрешены только буквы или символ "-"';
      }

      break;

    case INPUT_NAME.LOGIN:
      if (!/^[a-zA-Z_\-\d]+$/.test(value)) {
        error =
          'Логин может состоять из латинских букв, цифр и символов "_" и "-"';
        break;
      }

      if (!isValueLengthValid(value, 3, 20)) {
        error = 'Логин должен содержать не менее 3 и не более 20 символов';
        break;
      }

      if (/^\d+$/.test(value)) {
        error = 'Логин не может состоять из одних цифр';
      }

      break;

    case INPUT_NAME.EMAIL:
      if (!/^[a-zA-Z_\-.\d]+@[a-zA-Z]+\./.test(value)) {
        error = 'Неверный формат электронной почты';
      }

      break;
    case INPUT_NAME.PASSWORD:
    case INPUT_NAME.OLD_PASSWORD:
    case INPUT_NAME.NEW_PASSWORD:
      if (!isValueLengthValid(value, 8, 40)) {
        error = 'Пароль должен содержать не менее 8 и не более 40 символов';
        break;
      }

      if (!/[A-ZА-ЯЁ]/.test(value)) {
        error = 'Пароль должен содержать хотя бы одну заглавную букву';
        break;
      }

      if (!/\d/.test(value)) {
        error = 'Пароль должен содержать хотя бы одну цифру';
      }

      break;
    case INPUT_NAME.PHONE:
      if (!/^(\+)?\d+$/.test(value)) {
        error = 'Телефон должен состоять из цифр';
        break;
      }

      if (!isValueLengthValid(value, 10, 15)) {
        error = 'Телефон должен содержать не менее 10 и не более 15 символов';
      }

      break;
    case INPUT_NAME.MESSAGE:
      if (value.length === 0) {
        error = 'Сообщение не может быть пустым';
      }

      break;
    default:
  }

  return error;
};

const setInputValidity = (input: HTMLInputElement, isValid: boolean) => {
  if (!isValid) {
    input.classList.add('input--invalid');
    input.classList.remove('input--valid');
  } else {
    input.classList.add('input--valid');
    input.classList.remove('input--invalid');
  }
};

const setError = (node: HTMLSpanElement, error: string) => {
  if (error) {
    node.textContent = error;
  } else {
    node.textContent = '';
  }
};

export const validateForm = (event: Event) => {
  event.preventDefault();
  let hasErrors = false;
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  [...formData].forEach(([inputName, value]) => {
    if (typeof value === 'string') {
      const target = form.querySelector(
        `[name="${inputName}"]`
      ) as HTMLInputElement;
      const error = validate(inputName, value);
      if (error) {
        hasErrors = true;
      }
      const errorField = target.nextElementSibling as HTMLSpanElement;
      if (errorField) {
        setError(errorField, error);
      }
      setInputValidity(target, !error);
    }
  });

  return hasErrors
    ? Promise.reject()
    : Promise.resolve(Object.fromEntries(formData));
};

export const onBlur = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const { name, value } = target;
  const error = validate(name, value);
  const errorField = target.nextElementSibling as HTMLSpanElement;
  if (errorField) {
    setError(errorField, error);
  }
  setInputValidity(target, !error);
};
