import * as React from 'react';

type Props = {
  foo: string;
  bar: string;
  baz: string;
};

export default function Foo(props: Props) {
  const { foo, ...other } = props;

  return (
    <div className={props.bar} {...other}>
      {foo}
    </div>
  );
}
