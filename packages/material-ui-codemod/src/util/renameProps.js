export default function renameProps({ root, componentName, props }) {
  return root.findJSXElements(componentName).forEach((path) => {
    path.node.openingElement.attributes.forEach((node) => {
      if (node.type === 'JSXAttribute' && Object.keys(props).includes(node.name.name)) {
        node.name.name = props[node.name.name];
      }
    });
  });
}
