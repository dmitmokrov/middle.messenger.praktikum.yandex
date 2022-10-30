export const template = `
  <div class="messenger__aside">
    <div class="messenger__search">
      {{{ search }}}
    </div>
    <ul class="messenger__chats">
      <li>{{{ chatCard }}}</li>
    </ul>
  </div>
  <div class="messenger__dialog">
    <div class="messenger__dialog-header">
      {{{ avatar }}}
      <span class="messenger__dialog-name">Дмитрий</span>
      <a class="messenger__dialog-button" href="/settings.html">
        <span class="visually-hidden">Открыть настройки</span>
      </a>
    </div>
    <div class="messenger__dialog-body">
      {{{ myMessage }}}
      {{{ opponentMessage }}}
    </div>
    <div class="messenger__dialog-form-container">
      <form action="">
        <div class="messenger__dialog-form">
          <div class="messenger__dialog-input">
            {{{ messageInput }}}
          </div>
          <button class="messenger__dialog-submit" type="submit"><span class="visually-hidden">Отправить сообщение</span></button>
        </div>
      </form>
    </div>
  </div>
`;
