import authAPI, { UserType, UserSecretsType } from '../api/auth-api';
import router from '../base/Router';
import store from '../store/store';
import { Url } from '../utils/Url';
import { validateForm } from '../utils/validate';
import chatController from './chat-controller';

class AuthController {
  constructor() {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.logout = this.logout.bind(this);
  }

  async signUp(event: Event) {
    validateForm(event)
      .then(async (user: UserType) => {
        await authAPI.signUp(user);
      })
      .then(() => {
        store.setState('isAuth', true);
        localStorage.setItem('isAuth', '1');
      })
      .then(async () => {
        await this.getUserInfo();
      })
      .then(() => router.go(Url.Messenger))
      .catch(console.log);
  }

  async signIn(event: Event) {
    validateForm(event)
      .then(async (userSecrets: UserSecretsType) => {
        await authAPI.signIn(userSecrets);
      })
      .then(() => {
        store.setState('isAuth', true);
        localStorage.setItem('isAuth', '1');
      })
      .then(async () => {
        await this.getUserInfo();
        await chatController.getChats();
      })
      .then(() => router.go(Url.Messenger))
      .catch(console.log);
  }

  async getUserInfo() {
    await authAPI
      .getUserInfo()
      .then((data) => JSON.parse(data.response))
      .then((response) => {
        store.setState('user', response);
        localStorage.setItem('user', JSON.stringify(response));
      })
      .catch(console.log);
  }

  async logout(event: Event) {
    event.preventDefault();
    await authAPI
      .logout()
      .then(() => {
        store.reset();
        localStorage.clear();
        router.go(Url.Index);
      })
      .catch(console.log);
  }
}

export default new AuthController();
