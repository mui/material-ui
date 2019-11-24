import React from 'react';

export default function useStateChangeWarning(componentName, isControlled, prop, propName) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (isControlled !== (prop != null)) {
        console.error(
          [
            `Material-UI: A component is changing ${
              isControlled ? 'a ' : 'an un'
            }controlled ${componentName} to be ${isControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${componentName} ` +
              'element for the lifetime of the component.',
            `Please check the \`${propName}\` prop`,
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [componentName, prop, isControlled, propName]);
  }
}
