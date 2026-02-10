import * as React from 'react';

export default function TextField(props) {
  const { value, variant } = props;

  return (
    <React.Fragment>
      {variant}: <input value={value} />
    </React.Fragment>
  );
}
