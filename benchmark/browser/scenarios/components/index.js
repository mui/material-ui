import * as React from 'react';

const Div = React.forwardRef(function Div(props, ref) {
  return <div ref={ref} {...props} />;
});

export default function Components() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Div>test case</Div>
      ))}
    </React.Fragment>
  );
}
