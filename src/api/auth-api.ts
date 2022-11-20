import BaseAPI, { getUrl, ContentTypeHeader } from '../base/BaseAPI';
import HTTPTransport from '../base/HTTPTransport';

const authAPIInstance = new HTTPTransport();

export type UserType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserSecretsType = {
  login: string;
  password: string;
};

class AuthAPI extends BaseAPI {
  async signUp(user: UserType) {
    const url = getUrl('auth/signup');
    const result = await authAPIInstance.post(url, {
      data: JSON.stringify(user),
      headers: ContentTypeHeader,
    });
    return result;
  }

  async signIn(userSecrets: UserSecretsType) {
    const url = getUrl('auth/signin');
    const result = await authAPIInstance.post(url, {
      data: JSON.stringify(userSecrets),
      headers: ContentTypeHeader,
    });
    return result;
  }

  async getUserInfo() {
    const url = getUrl('auth/user');
    const result = await authAPIInstance.get(url);
    return result;
  }

  async logout() {
    const url = getUrl('auth/logout');
    const result = await authAPIInstance.post(url);
    return result;
  }
}

const authAPI = new AuthAPI();

export default authAPI;
