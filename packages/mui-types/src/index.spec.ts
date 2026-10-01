import { expectType } from '.';

function expectTypeTypes() {
  // it rejects assignability to `any`
  function onClick(event: any) {
    // @ts-expect-error
    expectType<MouseEvent, typeof event>(event);
  }
}

function overridableStringUnionTests() {
  // @ts-expect-error Numeric values are not valid string-union members.
  type InvalidUnion = OverridableStringUnion<'a' | 1>;
}
