import { expectType, OverridableStringUnion } from '.';

function expectTypeTypes() {
  // it rejects assignability to `any`
  function onClick(event: any) {
    // @ts-expect-error
    expectType<MouseEvent, typeof event>(event);
  }
}

const valueA: 'a'|'b' = 'a';
type a = OverridableStringUnion<'a' | 1>;

type b = OverridableStringUnion<'a' | 'b', { c: true }>;
type c = OverridableStringUnion<'a' | 'b', { c: false; d: true, b:false }>;
