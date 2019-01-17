import * as React from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { PropsOf } from '@material-ui/core';

declare const Foo: OverridableComponent<{
  props: {
    numberProp: number;
    callbackProp?(b: boolean): void;
    inconsistentProp?: string;
  };
  defaultComponent: React.ComponentType<{
    defaultProp?: boolean;
    defaultCallbackProp?(s: string): void;
  }>;
  classKey: 'root' | 'foo' | 'bar';
}>;

interface MyOverrideProps {
  className: string;
  myString?: string;
  myCallback?(n: number): void;
}
declare const MyOverrideComponent: React.ComponentType<MyOverrideProps>;
declare const MyOverrideClassComponent: React.ComponentClass<MyOverrideProps>;
declare const MyIncompatibleComponent1: React.ComponentType<{ inconsistentProp?: number }>;

let shouldSucceed;

// Can provide basic props; callback parameter types will be inferred.
shouldSucceed = (
  <Foo
    numberProp={3}
    className="foo"
    style={{ backgroundColor: 'red' }}
    classes={{ root: 'x', foo: 'y' }}
    callbackProp={b => console.log(b)}
  />
);

// Can pass props unique to the default component type; callback parameter types
// will be inferred.
shouldSucceed = <Foo numberProp={3} defaultProp defaultCallbackProp={s => console.log(s)} />;

// Can override the component and pass props unique to it; props of the override
// component that are provided from the wrapping component ("inner props") do
// not need to be specified.
shouldSucceed = <Foo component={MyOverrideComponent} myString="hello" numberProp={3} />;

// Can pass a callback prop with an override component; callback parameter must
// be explicitly specified.
shouldSucceed = (
  <Foo component={MyOverrideComponent} myCallback={(n: number) => console.log(n)} numberProp={3} />
);

// Can pass overriding component type as a parameter and callback parameters
// will be inferred.
shouldSucceed = (
  <Foo<typeof MyOverrideComponent>
    component={MyOverrideComponent}
    myCallback={n => console.log(n)}
    numberProp={3}
  />
);

// Can provide a primitive override and an event handler with explicit type.
shouldSucceed = (
  <Foo
    component="button"
    numberProp={3}
    onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
  />
);

// Can get inferred type for events by providing a component type parameter.
shouldSucceed = (
  <Foo<'button'>
    numberProp={3}
    component="button"
    ref={elem => {
      elem; // $ExpectType HTMLButtonElement | null
    }}
    onClick={e => {
      e; // $ExpectType MouseEvent<HTMLButtonElement, MouseEvent>
      e.currentTarget.checkValidity();
    }}
  />
);

shouldSucceed = (
  <Foo<typeof MyOverrideClassComponent>
    numberProp={3}
    component={MyOverrideClassComponent}
    ref={elem => {
      elem; // $ExpectType Component<MyOverrideProps, any, any> | null
    }}
  />
);

let shouldFail;

shouldFail = (
  // $ExpectError
  <Foo
    numberProp={3}
    bad="hi" // invalid prop
  />
);

shouldFail = (
  // $ExpectError
  <Foo
    component={MyOverrideComponent}
    myString={4} // should be a string
    numberProp={3}
  />
);

shouldFail = (
  <Foo<typeof MyOverrideComponent>
    component={MyOverrideComponent}
    // $ExpectError
    myString={4} // should be a string
    numberProp={3}
  />
);

shouldFail = (
  <Foo
    component={MyOverrideComponent}
    // $ExpectError
    myCallback={n => console.log(n)} // n has type any
    numberProp={3}
  />
);

shouldFail = (
  // $ExpectError
  <Foo
    component={MyIncompatibleComponent1} // inconsistent typing of base vs override prop
    numberProp={3}
    inconsistentProp="hi"
  />
);

shouldFail = (
  <Foo<'div'>
    component="div"
    numberProp={3}
    // event type doesn't match component type
    // $ExpectError
    onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
  />
);

shouldFail = (
  // $ExpectError
  <Foo<typeof MyOverrideComponent>
    component={MyOverrideComponent}
    ref={() => {}} // MyOverrideComponent doesn't forward refs
  />
);
