export default function renameClassKey({ root, componentName, classes }) {
  return root.findJSXElements(componentName).forEach((path) => {
    path.node.openingElement.attributes.forEach((node) => {
      if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
        node.value.expression.properties.forEach((node) => {
          if (Object.keys(classes).includes(node.key.name)) {
            node.key.name = classes[node.key.name];
          }
        });
      }
    });
  });
}
