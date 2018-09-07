export default function unwrap(component) {
  return component.Naked ? unwrap(component.Naked) : component;
}
