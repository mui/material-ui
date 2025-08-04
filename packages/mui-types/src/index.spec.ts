import { expectType } from '.';

function expectTypeTypes() {
  // it rejects assignability to `any`
  function onClick(event: any) {
    // @ts-expect-error
    expectType<MouseEvent, typeof event>(event);
  }
}
