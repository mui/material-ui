import * as React from 'react';

function Component(props) {
  const { Foo, Bar } = props;
  return (
    <>
      <Foo />
      <Bar />
    </>
  );
}

export default Component;
