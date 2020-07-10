const fs = require('fs');
const path = require('path');

const removeExternalDeps = propItem =>
  propItem.description && (!propItem.parent || !propItem.parent.fileName.includes('@types'));

const removeWrapperProps = (propItem, Component) => {
  return (
    Component.name === 'ModalWrapper' ||
    (propItem.parent && propItem.parent.name !== 'ModalWrapperProps')
  );
};

const parser = require('react-docgen-typescript').withCustomConfig(
  path.resolve(__dirname, '..', '..', 'lib', 'tsconfig.json'),
  {
    // @ts-ignore
    propFilter: (...args) => removeExternalDeps(...args) && removeWrapperProps(...args),
  }
);

const doc = {};
const srcPath = path.resolve(__dirname, '..', '..', 'lib', 'src');

const components = [
  'wrappers/MobileWrapper.tsx',
  'wrappers/DesktopWrapper.tsx',
  'DatePicker/DatePicker.tsx',
  'TimePicker/TimePicker.tsx',
  'DateTimePicker/DateTimePicker.tsx',
  'DateRangePicker/DateRangePicker.tsx',
  // internal components
  'views/Calendar/Calendar.tsx',
  'views/Calendar/Day.tsx',
  'views/Clock/ClockView.tsx',
];

const customTypePattern = '\n@type {';
const arrowFunctionRegex = /\((\((.*)=>(.*))\)/;

function overrideTypeNameWithCustom(description, prop) {
  const startOfCustomType = description.indexOf(customTypePattern) + customTypePattern.length;
  const enfOfCustomType = description.indexOf('}', startOfCustomType);
  const customType = description.substr(startOfCustomType, enfOfCustomType - startOfCustomType);

  prop.type.name = customType;
  prop.description = description.slice(0, description.indexOf(customTypePattern));
}

function processProp(prop) {
  const { description } = prop;

  if (description.includes('@DateIOType')) {
    prop.type.name = prop.type.name.replace(/unknown/g, 'DateIOType');
    prop.description = description.replace(' @DateIOType', '');
  }

  // override type with a custom name if needed
  if (description.includes(customTypePattern)) {
    overrideTypeNameWithCustom(description, prop);
  }

  // replace additional () injected outside of arrow functions
  const arrowFunctionMatch = prop.type.name.match(arrowFunctionRegex);
  if (arrowFunctionMatch && arrowFunctionMatch[1]) {
    prop.type.name = arrowFunctionMatch[1];
  }

  // replace | undefined
  prop.type.name = prop.type.name.replace(' | undefined', '');
}

components.forEach(filePart => {
  const file = path.join(srcPath, filePart);
  const parsedDocs = parser.parse(file);

  parsedDocs.forEach(parsedDoc => {
    if (
      parsedDoc.displayName.match(/^(Mobile|Desktop|Static)/) &&
      !parsedDoc.displayName.endsWith('Wrapper')
    ) {
      return;
    }

    if (Object.keys(parsedDoc.props).length === 0) {
      return;
    }

    doc[parsedDoc.displayName] = Object.entries(parsedDoc.props).reduce(
      (obj, [key, propTypeObj]) => {
        processProp(propTypeObj);

        obj[key] = propTypeObj;
        return obj;
      },
      {}
    );
  });
});

fs.writeFileSync(path.resolve(__dirname, '..', 'prop-types.json'), JSON.stringify(doc, null, 2));
