import assignObject from '../../util/assignObject';
import findComponentJSX from '../../util/findComponentJSX';
import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  replaceComponentsWithSlots(j, { root, componentName: 'AvatarGroup' });

  // replace `slotProps.additionalAvatar` with `slotProps.surplus` in JSX
  findComponentJSX(j, { root, componentName: 'AvatarGroup' }, (elementPath) => {
    const slotPropsIndex = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'slotProps',
    );
    if (slotPropsIndex !== -1) {
      const slotProps = elementPath.node.openingElement.attributes[slotPropsIndex].value.expression;
      const additionalAvatarIndex = slotProps.properties.findIndex(
        (prop) => prop?.key?.name === 'additionalAvatar',
      );
      if (additionalAvatarIndex !== -1) {
        const surplusIndex = slotProps.properties.findIndex(
          (prop) => prop?.key?.name === 'surplus',
        );
        const removedValue = slotProps.properties.splice(additionalAvatarIndex, 1)[0].value;
        if (surplusIndex === -1) {
          assignObject(j, {
            target: elementPath.node.openingElement.attributes[slotPropsIndex],
            key: 'surplus',
            expression: removedValue,
          });
        } else {
          const slotPropsSlotValue = slotProps.properties.splice(surplusIndex, 1)[0].value;
          assignObject(j, {
            target: elementPath.node.openingElement.attributes[slotPropsIndex],
            key: 'surplus',
            expression: j.objectExpression([
              j.spreadElement(removedValue),
              j.spreadElement(slotPropsSlotValue),
            ]),
          });
        }
      }
    }
  });

  // replace `slotProps.additionalAvatar` with `slotProps.surplus` in theme
  root.find(j.ObjectProperty, { key: { name: 'MuiAvatarGroup' } }).forEach((path) => {
    const defaultPropsIndex = path.value.value.properties.findIndex(
      (key) => key.key.name === 'defaultProps',
    );
    if (defaultPropsIndex !== -1) {
      const defaultProps = path.value.value.properties[defaultPropsIndex];
      const slotPropsIndex = defaultProps.value.properties.findIndex(
        (prop) => prop.key.name === 'slotProps',
      );
      if (slotPropsIndex !== -1) {
        const slotProps = defaultProps.value.properties[slotPropsIndex];
        const additionalAvatarIndex = slotProps.value.properties.findIndex(
          (prop) => prop.key.name === 'additionalAvatar',
        );
        if (additionalAvatarIndex !== -1) {
          const removedValue = slotProps.value.properties.splice(additionalAvatarIndex, 1)[0].value;
          const surplusIndex = slotProps.value.properties.findIndex(
            (prop) => prop.key.name === 'surplus',
          );
          if (surplusIndex === -1) {
            slotProps.value.properties.push(
              j.objectProperty(j.identifier('surplus'), removedValue),
            );
          } else {
            const slotPropsSlotValue = slotProps.value.properties.splice(surplusIndex, 1)[0].value;
            slotProps.value.properties.push(
              j.objectProperty(
                j.identifier('surplus'),
                j.objectExpression([
                  j.spreadElement(removedValue),
                  j.spreadElement(slotPropsSlotValue),
                ]),
              ),
            );
          }
        }
      }
    }
  });

  return root.toSource(printOptions);
}
