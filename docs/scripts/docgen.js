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
  // wrappers must be on top to correctly filter
  ModalWrapper: 'wrappers/ModalWrapper.tsx',
  DatePicker: 'DatePicker/DatePicker.tsx',
  KeyboardDatePicker: 'DatePicker/KeyboardDatePicker.tsx',
  TimePicker: 'TimePicker/TimePicker.tsx',
  KeyboardTimePicker: 'TimePicker/KeyboardTimePicker.tsx',
  DateTimePicker: 'DateTimePicker/DateTimePicker.tsx',
  KeyboardDateTimePicker: 'DateTimePicker/KeyboardDateTimePicker.tsx',
  // internal components
  Calendar: 'DatePicker/components/Calendar.tsx',
  TimePickerView: 'TimePicker/components/TimePickerView.tsx',
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

const removeExternalDeps = ([_, value]) =>
  value.description && (!value.parent || !value.parent.fileName.includes('@types'));

const removeWrapperProps = name => ([_, value]) => {
  if (name !== 'ModalWrapper') {
    return !Object.keys(doc['ModalWrapper']).includes(value.name);
  }

  return true;
};

Object.entries(components).forEach(([name, filePart]) => {
  const file = path.join(srcPath, filePart);
  const parsedDoc = parser.parse(file)[0];

  doc[name] = Object.entries(parsedDoc.props)
    .filter(removeExternalDeps)
    .filter(removeWrapperProps(name))
    .reduce((obj, [key, value]) => {
      processProp(value);

      obj[key] = value;
      return obj;
    }, {});
});

fs.writeFileSync(path.resolve(__dirname, '..', 'prop-types.json'), JSON.stringify(doc));
