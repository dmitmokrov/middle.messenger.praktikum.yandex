export const template = `
  <div class="messenger__dialog-form">
    <div class="messenger__dialog-input form-field">
      {{{ messageInput }}}
      <span class="form-field__error"></span>
    </div>
    <button class="messenger__dialog-submit" type="submit"><span class="visually-hidden">Отправить сообщение</span></button>
  </div>
`;
