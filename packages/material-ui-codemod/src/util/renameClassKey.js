export default function renameClassKey({ root, componentName, classes }) {
  return root.findJSXElements(componentName).forEach((path) => {
    path.node.openingElement.attributes.forEach((node) => {
      if (node.type === 'JSXAttribute' && node.name.name === 'classes') {
        node.value.expression.properties.forEach((subNode) => {
          if (Object.keys(classes).includes(subNode.key.name)) {
            subNode.key.name = classes[subNode.key.name];
          }
        });
      }
    });
  });
}
