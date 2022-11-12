export const getFormData = (form: HTMLFormElement): void => {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));
  };

  form?.addEventListener('submit', onSubmit);
};
