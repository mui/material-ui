/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
import React from 'react';

const useControlled = ({ controlled, default: defaultProp, name }) => {
  const { current: isControlled } = React.useRef(controlled !== undefined);
  const { current: defaultValue } = React.useRef(defaultProp);
  const [valueState, setValue] = React.useState(() => {
    return !isControlled ? defaultValue || null : null;
  });
  const value = isControlled ? controlled : valueState;

  if (process.env.NODE_ENV !== 'production') {
    React.useEffect(() => {
      if (isControlled !== (controlled !== undefined)) {
        console.error(
          [
            `Material-UI: A component is changing ${
              isControlled ? 'a ' : 'an un'
            }controlled ${name} to be ${isControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${name} ` +
              'element for the lifetime of the component.',
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [controlled, isControlled, name]);

    React.useEffect(() => {
      if (defaultValue !== defaultProp) {
        console.error(
          [
            `Material-UI: A component is changing the default value of an uncontrolled ${name} after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n'),
        );
      }
    }, [JSON.stringify(defaultProp)]);
  }

  return { value, setValue, isControlled };
};

export default useControlled;
