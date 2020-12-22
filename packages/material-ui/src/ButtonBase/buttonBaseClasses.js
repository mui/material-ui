export function getButtonBaseUtilityClass(name) {
  return `MuiButtonBase-${name}`;
}

const buttonBaseClasses = {
  root: getButtonBaseUtilityClass('root'),
  disabled: 'Mui-disabled',
  focusVisible: 'Mui-focusVisible',
};

export default buttonBaseClasses;
