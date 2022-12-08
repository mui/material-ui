import * as React from 'react';

export default function Primitives() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <div>test case</div>
      ))}
    </React.Fragment>
  );
}
