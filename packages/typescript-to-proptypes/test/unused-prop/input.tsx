import * as React from 'react';

type Props = {
  foo: string;
  bar: string;
  baz: string;
};

export default function Foo(props: Props) {
  const { foo, ...rest } = props;

  return (
    <div className={props.bar} {...rest}>
      {foo}
    </div>
  );
}
