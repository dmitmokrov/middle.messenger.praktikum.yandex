import Component, { PropsType } from '../../base/Component';
import { template } from './template';
import Title from '../title';
import Button from '../button';
// @ts-ignore
import * as imgSrc from '../../../static/icons/404.svg';
import { goTo } from '../../base/Router';
import { Url } from '../../utils/Url';

const initialProps = {
  imgSrc: imgSrc as string,
  title: new Title({
    text: 'Такой странички неть :(',
    attrs: { class: 'title--secondary' },
  }),
  button: new Button({
    text: 'Вернуться к чатам',
    attrs: { class: 'button--secondary' },
    onClick: goTo(Url.Messenger),
  }),
};

class Page404 extends Component {
  constructor(props: PropsType) {
    const attrs = {
      class: 'centered-container',
    };

    super('div', { ...props, ...initialProps, attrs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Page404;
