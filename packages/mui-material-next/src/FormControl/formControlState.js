// TODO v6: decide whether to update/refactor this, keep as-is, or drop it
export default function formControlState({ props, states, muiFormControl }) {
  // for every prop in `states` that is undefined, set it with the value from formControlContext
  return states.reduce((acc, state) => {
    acc[state] = props[state];

    if (muiFormControl) {
      if (typeof props[state] === 'undefined') {
        acc[state] = muiFormControl[state];
      }
    }

    return acc;
  }, {});
}
