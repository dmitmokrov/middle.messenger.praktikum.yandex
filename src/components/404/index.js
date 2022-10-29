import {render} from '../../utils/render';
import Component from '../../base/Component';
import {template} from './template';
import Title from '../title';
import Button from '../button';

class Page404 extends Component {
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

const page404 = new Page404({
  title: new Title({text: 'Такой странички неть :(', attrs: {class: 'title--secondary'}}),
  button: new Button({tag: 'a', text: 'Вернуться к чатам', attrs: {href: "/", class: 'button--secondary'}}),
});

render('.main', page404);
