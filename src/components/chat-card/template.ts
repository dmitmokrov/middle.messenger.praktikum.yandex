export const template = `
  {{{ avatar }}}
  <div>
    <h3 class="chat-card__title">{{ chatInfo.title }}</h3>
    <p class="chat-card__info">{{ chatInfo.last_message.user.display_name }}: {{ chatInfo.last_message.content }}</p>
    {{{ deleteChatButton }}}
    {{{ addUserButton }}}
    {{{ deleteUserButton }}}
  </div>
  <time class="chat-card__time" datetime="2022-05-15 12:46">12:46</time>
  <div class="chat-card__unread">{{ chatInfo.unread_count }}</div>
`;
