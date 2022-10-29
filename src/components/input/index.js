import Component from "../../base/Component";

class Input extends Component {
  constructor(props) {
    const attrs = Object.assign(
      {},
      {
        class: 'input', type: 'text'
      },
      props?.attrs
    );

    super('input', {...props, attrs});
  }

  render() {
    return this.compile('', {});
  }
}

export default Input;
