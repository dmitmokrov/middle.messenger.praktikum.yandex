import Component from "../base/Component";

export function render(selector: string, component: Component) : Element | null {
  const root = document.querySelector(selector);
  if (root) {
    root.append(component.getContent());
    component.dispatchComponentDidMount();
  }
  return root;
}
