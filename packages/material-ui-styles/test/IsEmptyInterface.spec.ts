/**
 * unit testing for IsEmptyInterface utility type
 */
import { IsEmptyInterface } from '@material-ui/styles/makeStyles';

// $ExpectType true
type EmptyInterfaceIsValid = IsEmptyInterface<{}>;

// $ExpectType false
type ObjectIsValid = IsEmptyInterface<object>;

// $ExpectType false
type NullishIsValid = IsEmptyInterface<null | undefined>;

// $ExpectType false
type StringIsValid = IsEmptyInterface<string>;

// $ExpectType false
type NumberIsValid = IsEmptyInterface<number>;

// $ExpectType false
type SymbolIsValid = IsEmptyInterface<symbol>;

// $ExpectType false
type NeverIsValid = IsEmptyInterface<never>;

// $ExpectType false
type UnknownIsValid = IsEmptyInterface<unknown>;

const noop = () => {};
// $ExpectType false
type FunctionIsValid = IsEmptyInterface<typeof noop>;

// $ExpectType false
type RecordIsValid = IsEmptyInterface<Record<'foo' | 'bar', number>>;

const someObject = { foo: 5 };
// $ExpectType false
type ObjectWithPropertiesIsValid = IsEmptyInterface<typeof someObject>;
