import * as React from 'react';
import { MuiComponent } from '../../src';

declare const Foo: MuiComponent<{
  outerProps: {
    outer: number;
    outerCallback?(b: boolean): void;
    outerInconsistent?: string;
  };
  innerProps: {
    innerAndOverride: string;
    innerInconsistent?: string;
  };
  classKey: 'root' | 'foo' | 'bar';
  defaultComponent: React.ComponentType<{
    defaultPassthru?: boolean;
    defaultPassthruCallback?(s: string): void;
  }>;
}>;

type MyOverrideProps = {
  innerAndOverride: string;
  className: string;
  myString?: string;
  myCallback?(n: number): void;
};
declare const MyOverrideComponent: React.ComponentType<MyOverrideProps>;
declare const MyIncompatibleComponent1: React.ComponentType<{ outerInconsistent?: number }>;
declare const MyIncompatibleComponent2: React.ComponentType<{ innerInconsistent?: number }>;

let shouldSucceed;

// minimally, can provide just outer required props
shouldSucceed = <Foo outer={3} />;

// Can also provide optional outer props and universal props; callback parameter
// types will be inferred.
shouldSucceed = (
  <Foo
    outer={3}
    className="foo"
    style={{ backgroundColor: 'red' }}
    classes={{ root: 'x', foo: 'y' }}
    outerCallback={b => console.log(b)}
  />
);

// Can pass props unique to the default component type; callback parameter types
// will be inferred.
shouldSucceed = <Foo outer={3} defaultPassthru defaultPassthruCallback={s => console.log(s)} />;

// Can override the component and pass props unique to it; props of the override
// component that are provided from the wrapping component ("inner props") do
// not need to be specified.
shouldSucceed = <Foo component={MyOverrideComponent} myString="hello" outer={3} />;

// Can pass a callback prop with an override component; callback parameter must
// be explicitly specified.
shouldSucceed = (
  <Foo component={MyOverrideComponent} myCallback={(n: number) => console.log(n)} outer={3} />
);

// Can pass overriding component type as a parameter and callback parameters
// will be inferred.
shouldSucceed = (
  <Foo<typeof MyOverrideComponent> component={MyOverrideComponent} myCallback={n => console.log(n)} outer={3} />
);

// Can (optionally) override props that are provided by the wrapping component.
shouldSucceed = <Foo outer={3} innerAndOverride="hi" />;
shouldSucceed = <Foo component={MyOverrideComponent} outer={3} innerAndOverride="hi" />;

// Can do this even if the overriding component doesn't know about it.
shouldSucceed = <Foo component="div" outer={3} innerAndOverride="hi" />;

// Can provide a primitive override and an event handler with explicit type.
shouldSucceed = (
  <Foo
    component="button"
    outer={3}
    onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
  />
);

// Can get inferred type for events by providing a component type parameter.
shouldSucceed = (
  <Foo<'button'> component="button" outer={3} onClick={e => e.currentTarget.checkValidity()} />
);

// let shouldFail;

// shouldFail = (
//   <Foo
//     outer={3}
//     bad="hi" // invalid prop
//   />
// );

// shouldFail = (
//   <Foo
//     // error appears on next line; to get a better message annotate with
//     // the type of the overriding component as in the next example
//     component={MyOverrideComponent}
//     myString={4} // should be a string
//     outer={3}
//   />
// );

// shouldFail = (
//   <Foo<typeof MyOverrideComponent>
//     component={MyOverrideComponent}
//     myString={4} // should be a string
//     outer={3}
//   />
// );

// shouldFail = (
//   <Foo
//     component={MyOverrideComponent}
//     myCallback={n => console.log(n)} // n has type any
//     outer={3}
//   />
// );

// shouldFail = (
//   <Foo
//     component={MyIncompatibleComponent1} // inconsistent typing of outer vs passthru prop
//     outer={3}
//     outerInconsistent="hi"
//   />
// );

// shouldFail = (
//   <Foo
//     component="div" // doesn't match onClick handler type
//     outer={3}
//     onClick={e => e.currentTarget.checkValidity()}
//   />
// );

// shouldFail = (
//   <Foo<'div'>
//     component="div"
//     outer={3}
//     // event type doesn't match component type
//     onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
//   />
// );

// // ideally this should fail but haven't figured out a way to enforce it without
// // the whole house of cards collapsing
// shouldFail = (
//   <Foo
//     component={MyIncompatibleComponent2} // inconsistent typing of inner vs passthru prop
//     outer={3}
//     innerInconsistent="hi"
//   />
// );
