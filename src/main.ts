import { Url } from './utils/Url';
import router from './base/Router';
import AuthorizationPage from './components/authorization';
import SignUpPage from './components/sign-up';
import SettingsPage from './components/settings';
import MessengerPage from './components/messenger';
import PasswordChangePage from './components/password-change';
import ProfileChangePage from './components/profile-change';
import Page404 from './components/404';
import Page500 from './components/500';
import './styles/style.scss';

router
  .use(Url.Index, AuthorizationPage)
  .use(Url.SignUp, SignUpPage)
  .use(Url.Settings, SettingsPage)
  .use(Url.Messenger, MessengerPage)
  .use(Url.PasswordChange, PasswordChangePage)
  .use(Url.ProfileChange, ProfileChangePage)
  .use(Url.NotFound, Page404)
  .use(Url.ServerError, Page500)
  .start();
