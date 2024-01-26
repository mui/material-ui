/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  root.find(j.JSXAttribute, { name: { name: 'TransitionComponent' } }).forEach((path) => {
    const slotsNode = /** @type import('jscodeshift').JSXOpeningElement */ (
      path.parent.node
    ).attributes.find((attr) => attr.name?.name === 'slots');

    if (slotsNode) {
      const expContainer = /** @type import('jscodeshift').JSXExpressionContainer */ (
        slotsNode.value
      );
      if (expContainer.expression.type === 'ObjectExpression') {
        // case `slots={{ ... }}`
        expContainer.expression.properties.push(
          j.objectProperty(j.identifier('transition'), path.node.value.expression),
        );
      } else if (expContainer.expression.type === 'Identifier') {
        // case `slots={outerSlots}
        expContainer.expression = j.objectExpression([
          j.spreadElement(j.identifier(expContainer.expression.name)),
          j.objectProperty(j.identifier('transition'), path.node.value.expression),
        ]);
      }
    } else {
      path.insertAfter(
        j.jsxAttribute(
          j.jsxIdentifier('slots'),
          j.jsxExpressionContainer(
            j.objectExpression([
              j.objectProperty(j.identifier('transition'), path.node.value.expression),
            ]),
          ),
        ),
      );
    }

    // remove `TransitionComponent` prop
    path.replace();
  });

  root.find(j.JSXAttribute, { name: { name: 'TransitionProps' } }).forEach((path) => {
    const slotPropsNode = /** @type import('jscodeshift').JSXOpeningElement */ (
      path.parent.node
    ).attributes.find((attr) => attr.name?.name === 'slotProps');

    if (slotPropsNode) {
      // insert to `slotProps` prop
      const expContainer = /** @type import('jscodeshift').JSXExpressionContainer */ (
        slotPropsNode.value
      );
      if (expContainer.expression.type === 'ObjectExpression') {
        // case `slotProps={{ ... }}`
        expContainer.expression.properties.push(
          j.objectProperty(j.identifier('transition'), path.node.value.expression),
        );
      } else if (expContainer.expression.type === 'Identifier') {
        // case `slotProps={outerSlotProps}
        expContainer.expression = j.objectExpression([
          j.spreadElement(j.identifier(expContainer.expression.name)),
          j.objectProperty(j.identifier('transition'), path.node.value.expression),
        ]);
      }
    } else {
      path.insertAfter(
        j.jsxAttribute(
          j.jsxIdentifier('slotProps'),
          j.jsxExpressionContainer(
            j.objectExpression([
              j.objectProperty(j.identifier('transition'), path.node.value.expression),
            ]),
          ),
        ),
      );
    }

    // remove `TransitionProps` prop
    path.replace();
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
