// @flow weak

export default function unwrap(component: Object) {
  return component.Naked ? unwrap(component.Naked) : component;
}
