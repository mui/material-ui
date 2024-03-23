import * as React from 'react';

export default function Hidden(props) {
  const { color, only } = props;

  return <div color={color} hidden={only !== 'xs'} />;
}
