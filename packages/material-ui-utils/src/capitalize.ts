// TODO: error TS7016: Could not find a declaration file for module '../macros/MuiError.macro'. '/tmp/material-ui/packages/material-ui-utils/macros/MuiError.macro.js' implicitly has an 'any' type.
// import MuiError from '../macros/MuiError.macro';
// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word a the sentence.
// We only handle the first word.
export default function capitalize(string: string): string {
  if (typeof string !== 'string') {
    throw new Error('Material-UI: capitalize(string) expects a string argument.');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}
