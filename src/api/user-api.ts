import BaseAPI, { getUrl, ContentTypeHeader } from '../base/BaseAPI';
import HTTPTransport from '../base/HTTPTransport';

const userAPIInstance = new HTTPTransport();

type ProfileType = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type PasswordsType = {
  oldPassword: string;
  newPassword: string;
};

class UserAPI extends BaseAPI {
  async updateProfile(profile: ProfileType) {
    const url = getUrl('user/profile');
    const result = await userAPIInstance.put(url, {
      data: profile,
      headers: ContentTypeHeader,
    });
    return result;
  }

  async updateAvatar(avatar: File) {
    const url = getUrl('user/profile/avatar');
    const result = await userAPIInstance.put(url, {
      data: avatar,
    });
    return result;
  }

  async updatePassword(passwords: PasswordsType) {
    const url = getUrl('user/password');
    const result = await userAPIInstance.put(url, {
      data: passwords,
      headers: ContentTypeHeader,
    });
    return result;
  }
}

const userAPI = new UserAPI();

export default userAPI;
