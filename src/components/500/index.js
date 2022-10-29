import {render} from '../../utils/render';
import Component from '../../base/Component';
import {template} from './template';
import Title from '../title';
import Button from '../button';

class Page500 extends Component {
  constructor(props) {
    const attrs = {
      class: 'centered-container',
    };

    super('div', {...props, attrs});
  }

  render() {
    return this.compile(template, this.props);
  }
}

const page500 = new Page500({
  title: new Title({text: 'Сервер устал и прилег:( Но мы его скоро разбудим', attrs: {class: 'title--secondary'}}),
  button: new Button({tag: 'a', text: 'Вернуться к чатам', attrs: {href: "/", class: 'button--secondary'}}),
});

render('.main', page500);
