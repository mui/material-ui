const fs = require('fs');
const path = require('path');
const parser = require('react-docgen-typescript').withDefaultConfig({
  propFilter: {
    skipPropsWithoutDoc: true,
    skipPropsWithName: [],
  },
});

const doc = {};
const srcPath = path.resolve(__dirname, '..', '..', 'lib', 'src');

const components = {
  DatePicker: 'DatePicker/DatePicker.tsx',
  KeyboardDatePicker: 'DatePicker/KeyboardDatePicker.tsx',
  TimePicker: 'TimePicker/TimePicker.tsx',
  KeyboardTimePicker: 'TimePicker/KeyboardTimePicker.tsx',
  DateTimePicker: 'DateTimePicker/DateTimePicker.tsx',
  KeyboardDateTimePicker: 'DateTimePicker/KeyboardDateTimePicker.tsx',
  ModalWrapper: 'wrappers/ModalWrapper.tsx',
};

const customTypePattern = '\n@type {';
function processProp(prop) {
  const { description } = prop;

  if (description.includes(customTypePattern)) {
    const startOfCustomType = description.indexOf(customTypePattern) + customTypePattern.length;
    const enfOfCustomType = description.indexOf('}', startOfCustomType);

    const customType = description.substr(startOfCustomType, enfOfCustomType - startOfCustomType);

    prop.type.name = customType;
    prop.description = description.slice(0, description.indexOf(customTypePattern));
  }
}

Object.entries(components).forEach(([name, filePart]) => {
  const file = path.join(srcPath, filePart);
  const parsedDoc = parser.parse(file)[0];

  doc[name] = Object.entries(parsedDoc.props)
    .filter(
      // eslint-disable-next-line
      ([key, value]) =>
        value.description && (!value.parent || !value.parent.fileName.includes('@types'))
    )
    .reduce((obj, [key, value]) => {
      processProp(value);
      obj[key] = value;
      return obj;
    }, {});
});

fs.writeFileSync(path.resolve(__dirname, '..', 'prop-types.json'), JSON.stringify(doc));
