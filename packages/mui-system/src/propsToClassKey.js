import capitalize from '@mui/utils/capitalize';

function isEmpty(string) {
  return string.length === 0;
}

/**
 * Generates string classKey based on the properties provided. It starts with the
 * variant if defined, and then it appends all other properties in alphabetical order.
 * @param {object} props - the properties for which the classKey should be created.
 */
export default function propsToClassKey(props) {
  const { variant, ...other } = props;

  let classKey = variant || '';

  Object.keys(other)
    .sort()
    .forEach((key) => {
      if (key === 'color') {
        classKey += isEmpty(classKey) ? props[key] : capitalize(props[key]);
      } else {
        classKey += `${isEmpty(classKey) ? key : capitalize(key)}${capitalize(
          props[key].toString(),
        )}`;
      }
    });

  return classKey;
}
