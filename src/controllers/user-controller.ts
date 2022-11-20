import userAPI, { ProfileType, PasswordsType } from '../api/user-api';
import router from '../base/Router';
import store from '../store/store';
import { Url } from '../utils/Url';
import { validateForm } from '../utils/validate';

class UserController {
  async updateProfile(event: Event) {
    validateForm(event)
      .then(async (profile: ProfileType) => {
        const result = await userAPI.updateProfile(profile);
        return result;
      })
      .then((data) => JSON.parse(data.response))
      .then((response) => {
        store.setState('user', response);
        localStorage.setItem('user', JSON.stringify(response));
      })
      .then(() => router.go(Url.Messenger))
      .catch(console.log);
  }

  async updatePassword(event: Event) {
    validateForm(event)
      .then(async (passwords: PasswordsType) => {
        await userAPI.updatePassword(passwords);
      })
      .then(() => router.go(Url.Messenger))
      .catch(console.log);
  }

  async updateAvatar(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const avatar = new FormData(form);

    await userAPI
      .updateAvatar(avatar)
      .then((data) => JSON.parse(data.response))
      .then((response) => {
        store.setState('user', response);
        localStorage.setItem('user', JSON.stringify(response));
      })
      .then(() => router.go(Url.Messenger))
      .catch(console.log);
  }
}

export default new UserController();
