import chatAPI from '../api/chat-api';
import store from '../store/store';
import { createWS } from '../base/WebSocket';
import { validateForm } from '../utils/validate';

class ChatController {
  constructor() {
    this.getChats = this.getChats.bind(this);
    this.createChat = this.createChat.bind(this);
    this.deleteChat = this.deleteChat.bind(this);
  }

  async getChats() {
    await chatAPI
      .getChats()
      .then((data) => JSON.parse(data.response))
      .then((response) => {
        store.setState('chats', response);
        localStorage.setItem('chats', JSON.stringify(response));
      })
      .catch(console.log);
  }

  async createChat() {
    try {
      const chatName = prompt('Введите название чата') || 'Новый чат';
      await chatAPI.createChat(chatName);
      await this.getChats();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteChat(chatId: number) {
    try {
      await chatAPI.deleteChat(chatId);
      await this.getChats();
    } catch (e) {
      console.log(e);
    }
  }

  async addChatUsers(chatId: number) {
    try {
      const users = prompt('Введите id участников через запятую без пробелов')
        ?.split(',')
        .map(Number);

      const chatUsers = {
        users,
        chatId,
      };
      await chatAPI.addChatUsers(chatUsers);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteChatUser(chatId: number) {
    try {
      const users = prompt('Введите id участников через запятую без пробелов')
        ?.split(',')
        .map(Number);

      const chatUsers = {
        users,
        chatId,
      };

      await chatAPI.deleteChatUser(chatUsers);
    } catch (e) {
      console.log(e);
    }
  }

  async connectToChat(chatId: number) {
    store.setState('chatMessages', []);
    await chatAPI
      .getChatToken(chatId)
      .then((data) => JSON.parse(data.response))
      .then((response) => {
        const parameters = {
          userId: store.getState().user.id,
          chatId,
          token: response.token,
        };

        createWS(parameters);
      })
      .catch(console.log);
  }

  async sendMessage(event: Event) {
    const form = event.target as HTMLFormElement;
    validateForm(event)
      .then((formData) => {
        store.getState()?.socket.send(
          JSON.stringify({
            content: formData.message,
            type: 'message',
          })
        );
      })
      .then(() => form.reset())
      .catch(console.log);
  }
}

export default new ChatController();
