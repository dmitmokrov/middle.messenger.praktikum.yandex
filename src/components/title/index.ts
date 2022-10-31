import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class Title extends Component {
  constructor(props: PropsType) {
    const attrs = {
      ...props?.attrs,
      class: `title ${props?.attrs?.class}`,
    };

    super('h1', { ...props, attrs });
  }

  render() {
    const { text } = this.props;
    return this.compile(template, { text });
  }
}

export default Title;
