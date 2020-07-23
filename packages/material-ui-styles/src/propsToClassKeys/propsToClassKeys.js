import MuiError from '@material-ui/utils/macros/MuiError.macro';

// TODO: remove this once the capitalize method is moved to the @material-ui/utils package
export function capitalize(string) {
  if (typeof string !== 'string') {
    throw new MuiError('Material-UI: capitalize(string) expects a string argument.');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isEmpty(string) {
  return string.length === 0;
}

export default function propsToClassKey(props) {
  const { variant, ...rest } = props;

  let classKey = variant || '';

  Object.keys(rest)
    .sort()
    .forEach((key) => {
      if (key === 'color') {
        classKey += isEmpty(classKey) ? props[key] : capitalize(props[key]);
      } else {
        classKey += `${isEmpty(classKey) ? key : capitalize(key)}${capitalize(props[key])}`;
      }
    });

  return classKey;
}
