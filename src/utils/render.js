export function render(selector, component) {
  const root = document.querySelector(selector);
  root.append(component.getContent());
  component.dispatchComponentDidMount();
  return root;
}
