const fs = require('fs');
const path = require('path');
const parser = require('react-docgen-typescript').withCustomConfig(
  path.resolve(__dirname, '..', '..', 'lib', 'tsconfig.json'),
  {
    propFilter: {
      skipPropsWithoutDoc: true,
      skipPropsWithName: [],
    },
  }
);

const doc = {};
const srcPath = path.resolve(__dirname, '..', '..', 'lib', 'src');

const components = [
  // wrappers must be on top to correctly filter
  'wrappers/ModalWrapper.tsx',
  'DatePicker/DatePicker.tsx',
  'DatePicker/KeyboardDatePicker.tsx',
  'TimePicker/TimePicker.tsx',
  'DateTimePicker/DateTimePicker.tsx',
  'DateTimePicker/KeyboardDateTimePicker.tsx',
  // internal components
  'DatePicker/components/Calendar.tsx',
  'TimePicker/components/TimePickerView.tsx',
];

const customTypePattern = '\n@type {';
const arrowFunctionRegex = /\((\((.*)=>(.*))\)/;

function processProp(prop) {
  const { description } = prop;

  // override type with a custom name if needed
  if (description.includes(customTypePattern)) {
    const startOfCustomType = description.indexOf(customTypePattern) + customTypePattern.length;
    const enfOfCustomType = description.indexOf('}', startOfCustomType);

    const customType = description.substr(startOfCustomType, enfOfCustomType - startOfCustomType);

    prop.type.name = customType;
    prop.description = description.slice(0, description.indexOf(customTypePattern));
  }

  // replace additional () injected outside of arrow functions
  const arrowFunctionMatch = prop.type.name.match(arrowFunctionRegex);
  if (arrowFunctionMatch && arrowFunctionMatch[1]) {
    prop.type.name = arrowFunctionMatch[1];
  }

  // replace | undefined
  prop.type.name = prop.type.name.replace(' | undefined', '');
}

const removeExternalDeps = ([_, value]) =>
  value.description && (!value.parent || !value.parent.fileName.includes('@types'));

const removeWrapperProps = name => ([_, value]) => {
  if (name !== 'ModalWrapper') {
    return !Object.keys(doc['ModalWrapper']).includes(value.name);
  }

  return true;
};

components.forEach(filePart => {
  const file = path.join(srcPath, filePart);
  const parsedDocs = parser.parse(file);

  parsedDocs.forEach(parsedDoc => {
    if (Object.keys(parsedDoc.props).length === 0) {
      return;
    }

    doc[parsedDoc.displayName] = Object.entries(parsedDoc.props)
      .filter(removeExternalDeps)
      .filter(removeWrapperProps(parsedDoc.displayName))
      .reduce((obj, [key, value]) => {
        processProp(value);

        obj[key] = value;
        return obj;
      }, {});
  });
});

fs.writeFileSync(path.resolve(__dirname, '..', 'prop-types.json'), JSON.stringify(doc, null, 2));
