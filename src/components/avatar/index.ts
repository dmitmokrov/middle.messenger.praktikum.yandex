import { template } from './template';
import Component, { PropsType } from '../../base/Component';

class Avatar extends Component {
  constructor(props: PropsType) {
    const attrs = {
      ...props?.attrs,
      class: `avatar ${props?.attrs?.class}`,
    };

    super('div', { ...props, attrs });
  }

  render() {
    return this.compile(template, {});
  }
}

export default Avatar;
