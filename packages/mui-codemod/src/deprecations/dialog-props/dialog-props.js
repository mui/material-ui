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

  findComponentJSX(j, { root, componentName: 'Dialog' }, (elementPath) => {
    let index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'TransitionComponent',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slots') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'transition',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slots',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('transition'), removed[0].value.expression),
          ]),
        });
      }
    }

    index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'TransitionProps',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slotProps') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'transition',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slotProps',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('transition'), removed[0].value.expression),
          ]),
        });
      }
    }
  });

  findComponentJSX(j, { root, componentName: 'Dialog' }, (elementPath) => {
    let index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'PaperComponent',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slots') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'paper',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slots',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('paper'), removed[0].value.expression),
          ]),
        });
      }
    }

    index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'PaperProps',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slotProps') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'paper',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slotProps',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('paper'), removed[0].value.expression),
          ]),
        });
      }
    }
  });

  root.find(j.ObjectProperty).forEach((path) => {
    if (path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiDialog') {
      if (['PaperComponent', 'TransitionComponent'].includes(path.node.key.name)) {
        const isSlotsCreated = !!path.parent.parent.node.value?.properties?.find(
          (prop) => prop.key.name === 'slots',
        );

        const PaperComponent = path.parent.parent.node.value?.properties?.find(
          (prop) => prop.key.name === 'PaperComponent',
        )?.value;
        const TransitionComponent = path.parent.parent.node.value?.properties?.find(
          (prop) => prop.key.name === 'TransitionComponent',
        )?.value;

        if (!isSlotsCreated) {
          path.replace(
            j.property(
              'init',
              j.identifier('slots'),
              j.objectExpression(
                [
                  TransitionComponent
                    ? j.objectProperty(j.identifier('transition'), TransitionComponent)
                    : null,
                  PaperComponent ? j.objectProperty(j.identifier('paper'), PaperComponent) : null,
                ].filter(Boolean),
              ),
            ),
          );
        }
      }
      if (['PaperProps', 'TransitionProps'].includes(path.node.key.name)) {
        const isSlotPropsCreated = !!path.parent.parent.node.value?.properties?.find(
          (prop) => prop.key.name === 'slotProps',
        );

        const PaperProps = path.parent.parent.node.value?.properties?.find(
          (prop) => prop.key.name === 'PaperProps',
        )?.value;
        const TransitionProps = path.parent.parent.node.value?.properties?.find(
          (prop) => prop.key.name === 'TransitionProps',
        )?.value;

        if (!isSlotPropsCreated) {
          path.replace(
            j.property(
              'init',
              j.identifier('slotProps'),
              j.objectExpression(
                [
                  TransitionProps
                    ? j.objectProperty(j.identifier('transition'), TransitionProps)
                    : TransitionProps,
                  PaperProps ? j.objectProperty(j.identifier('paper'), PaperProps) : null,
                ].filter(Boolean),
              ),
            ),
          );
        }
      }
    }
  });

  // root.find(j.ObjectProperty).forEach((path) => {
  //   if (
  //     path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiDialog' &&
  //     ['PaperProps', 'TransitionProps'].includes(path.node.key.name)
  //   ) {
  //     if (!isSlotPropsCreated) {
  //       path.replace(
  //         j.property(
  //           'init',
  //           j.identifier('slotProps'),
  //           j.objectExpression(
  //             [
  //               TransitionProps
  //                 ? j.objectProperty(j.identifier('transition'), TransitionProps)
  //                 : TransitionProps,
  //               PaperProps ? j.objectProperty(j.identifier('paper'), PaperProps) : null,
  //             ].filter(Boolean),
  //           ),
  //         ),
  //       );
  //       isSlotPropsCreated = true;
  //     }
  //   }
  // });

  root.find(j.ObjectExpression).forEach((path) => {
    if (path.node.properties) {
      path.node.properties = path.node.properties.filter(
        (prop) =>
          !['PaperComponent', 'TransitionComponent', 'TransitionProps', 'PaperProps'].includes(
            prop.key.name,
          ),
      );
    }
  });

  return root.toSource(printOptions);
}
