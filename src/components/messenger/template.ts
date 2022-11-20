export const template = `
  <div class="messenger__aside">
    <div class="messenger__search">
      {{{ search }}}
    </div>
    <div class="messenger__add-chat">{{{ addChatButton }}}</div>
    <ul class="messenger__chats">
      {{#each chats}}
        <li>
          {{{ this }}}
        </li>
      {{/each}}
    </ul>
  </div>
  <div class="messenger__dialog">
    <div class="messenger__dialog-header">
      {{{ avatar }}}
      <span class="messenger__dialog-name">{{ userName }}</span>
      {{{ messengerSettingsLink }}}
    </div>
    <div class="messenger__dialog-body">
      {{{ myMessage }}}
      {{{ opponentMessage }}}
    </div>
    <div class="messenger__dialog-form-container">
      {{{ messengerForm }}}
    </div>
  </div>
`;
