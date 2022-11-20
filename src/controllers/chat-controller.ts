import chatAPI, { ChatUsersType } from '../api/chat-api';
import router from '../base/Router';
import store from '../store/store';
import { Url } from '../utils/Url';
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
    const chatName = prompt('Введите название чата') || 'Новый чат';
    await chatAPI.createChat(chatName);
    await this.getChats();
  }

  async deleteChat(chatId: number) {
    await chatAPI.deleteChat(chatId);
    await this.getChats();
  }

  async addChatUsers(chatId: number) {
    const users = prompt('Введите id участников через запятую без пробелов')
      ?.split(',')
      .map(Number);

    const chatUsers = {
      users,
      chatId,
    };

    await chatAPI.addChatUsers(chatUsers);
    // await this.getChats();
  }

  async deleteChatUser(chatId: number) {
    const users = prompt('Введите id участников через запятую без пробелов')
      ?.split(',')
      .map(Number);

    const chatUsers = {
      users,
      chatId,
    };

    await chatAPI.deleteChatUser(chatUsers);
    // await this.getChats();
  }
}

export default new ChatController();
