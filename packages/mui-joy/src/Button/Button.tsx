import * as React from 'react';

const Button = (props: JSX.IntrinsicElements['button']) => {
  return <button type="button" {...props} />;
};

export default Button;
