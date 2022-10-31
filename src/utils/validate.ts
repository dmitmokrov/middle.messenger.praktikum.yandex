const INPUT_NAME = {
  FIRST_NAME: 'first_name',
  SECOND_NAME: 'second_name',
  LOGIN: 'login',
  EMAIL: 'email',
  PASSWORD: 'password',
  PHONE: 'phone',
  MESSAGE: 'message',
};

const isValueLengthValid = (value: string, min: number, max: number): boolean =>
  value.length >= min && value.length <= max;

const validate = (inputName: string, value: string): boolean => {
  switch (inputName) {
    case INPUT_NAME.FIRST_NAME:
    case INPUT_NAME.SECOND_NAME:
      return /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/.test(value);

    case INPUT_NAME.LOGIN:
      return (
        /^[a-zA-Z_\-\d]+$/.test(value) &&
        isValueLengthValid(value, 3, 20) &&
        !/^\d+$/.test(value)
      );
    case INPUT_NAME.EMAIL:
      return /^[a-zA-Z_\-.\d]+@[a-zA-Z]+\./.test(value);
    case INPUT_NAME.PASSWORD:
      return (
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        isValueLengthValid(value, 8, 40)
      );
    case INPUT_NAME.PHONE:
      return /^(\+)?\d+$/.test(value) && isValueLengthValid(value, 10, 15);
    case INPUT_NAME.MESSAGE:
      return value.length > 0;
    default:
      return true;
  }
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

export const validateForm = (form: HTMLFormElement): void => {
  // Обработчик для формы
  const onSubmit = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(form);
    [...formData].forEach(([inputName, value]) => {
      if (typeof value === 'string') {
        const target = form.querySelector(
          `[name="${inputName}"]`
        ) as HTMLInputElement;
        setInputValidity(target, validate(inputName, value));
      }
    });
  };
  form.addEventListener('submit', onSubmit);

  // Обработчик для инпутов
  const inputs = form?.querySelectorAll('input');
  const onBlur = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setInputValidity(target, validate(name, value));
  };
  inputs?.forEach((input) => {
    input.addEventListener('blur', onBlur);
  });
};
