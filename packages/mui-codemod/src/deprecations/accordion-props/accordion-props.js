import findComponentJSX from '../../util/findComponentJSX';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  findComponentJSX(j, { root, componentName: 'Accordion' }, (elementPath) => {
    let expression = elementPath.node.openingElement.attributes.find(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'TransitionComponent',
    )?.value?.expression;
    if (expression) {
      const slotsNode = elementPath.node.openingElement.attributes.find(
        (attr) => attr.name?.name === 'slots',
      );

      if (slotsNode) {
        assignObject(j, {
          target: slotsNode,
          key: 'transition',
          expression,
        });
      } else {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slots',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('transition'), expression),
          ]),
        });
      }

      elementPath.node.openingElement.attributes =
        elementPath.node.openingElement.attributes.filter(
          (attr) => attr.name.name === 'TransitionComponent',
        );
    }

    expression = elementPath.node.openingElement.attributes.find(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'TransitionProps',
    )?.value?.expression;
    if (expression) {
      const slotsNode = elementPath.node.openingElement.attributes.find(
        (attr) => attr.name?.name === 'slotProps',
      );

      if (slotsNode) {
        assignObject(j, {
          target: slotsNode,
          key: 'transition',
          expression,
        });
      } else {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slotProps',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('transition'), expression),
          ]),
        });
      }

      elementPath.node.openingElement.attributes =
        elementPath.node.openingElement.attributes.filter(
          (attr) => attr.name.name === 'TransitionProps',
        );
    }
  });

  root.find(j.ObjectProperty, { key: { name: 'TransitionComponent' } }).forEach((path) => {
    if (path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiAccordion') {
      path.replace(
        j.property(
          'init',
          j.identifier('slots'),
          j.objectExpression([j.objectProperty(j.identifier('transition'), path.node.value)]),
        ),
      );
    }
  });

  root.find(j.ObjectProperty, { key: { name: 'TransitionProps' } }).forEach((path) => {
    if (path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiAccordion') {
      path.replace(
        j.property(
          'init',
          j.identifier('slotProps'),
          j.objectExpression([j.objectProperty(j.identifier('transition'), path.node.value)]),
        ),
      );
    }
  });

  return root.toSource(printOptions);
}
