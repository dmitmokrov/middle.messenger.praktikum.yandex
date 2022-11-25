import BaseAPI, { getUrl, ContentTypeHeader } from '../base/BaseAPI';
import HTTPTransport from '../base/HTTPTransport';

type ChatUsersType = {
  users: number[];
  chatId: number;
};

class ChatAPI extends BaseAPI {
  chatAPIInstance: HTTPTransport;

  constructor() {
    super();
    this.chatAPIInstance = new HTTPTransport();
  }

  async getChats() {
    const url = getUrl('chats');
    const result = await this.chatAPIInstance.get(url);
    return result;
  }

  async createChat(title: string) {
    const url = getUrl('chats');
    const result = await this.chatAPIInstance.post(url, {
      data: JSON.stringify({ title }),
      headers: ContentTypeHeader,
    });
    return result;
  }

  async deleteChat(chatId: number) {
    const url = getUrl('chats');
    const result = await this.chatAPIInstance.delete(url, {
      data: JSON.stringify({ chatId }),
      headers: ContentTypeHeader,
    });
    return result;
  }

  async addChatUsers(chatUsers: ChatUsersType) {
    const url = getUrl('chats/users');
    const result = await this.chatAPIInstance.put(url, {
      data: JSON.stringify(chatUsers),
      headers: ContentTypeHeader,
    });
    return result;
  }

  async deleteChatUser(chatUsers: ChatUsersType) {
    const url = getUrl('chats/users');
    const result = await this.chatAPIInstance.delete(url, {
      data: JSON.stringify(chatUsers),
      headers: ContentTypeHeader,
    });
    return result;
  }

  async getChatToken(chatId: number) {
    const url = getUrl(`chats/token/${chatId}`);
    const result = await this.chatAPIInstance.post(url);
    return result;
  }
}

const chatAPI = new ChatAPI();

export default chatAPI;
