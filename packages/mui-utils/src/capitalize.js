import MuiError from '../macros/MuiError.macro';
// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word in the sentence.
// We only handle the first word.
export default function capitalize(string) {
  if (typeof string !== 'string') {
    throw new MuiError('MUI: `capitalize(string)` expects a string argument.');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}
