// packages/mui-utils/src/resolveComponentProps/resolveComponentProps.test.ts
// NEW FILE — none exists in the repo yet.
// Run with: pnpm test:unit resolveComponentProps
// Follows Vitest + Chai BDD style used in mergeSlotProps.test.ts (the closest sibling utility).
import { expect } from 'chai';
import resolveComponentProps from './resolveComponentProps';

describe('resolveComponentProps', () => {
  it('returns componentProps as-is when it is a plain object', () => {
    const componentProps = { maxLength: 10 };
    const result = resolveComponentProps(componentProps, { type: 'text' });
    // Strict reference equality — the object must not be cloned or wrapped.
    expect(result).to.equal(componentProps);
  });

  it('returns undefined when componentProps is undefined', () => {
    const result = resolveComponentProps(undefined, { type: 'text' });
    expect(result).to.equal(undefined);
  });

  it('calls componentProps with ownerState when it is a function', () => {
    const ownerState = { type: 'text' as const };
    const componentProps = (state: typeof ownerState) => ({
      maxLength: state.type === 'text' ? 10 : 20,
    });
    const result = resolveComponentProps(componentProps, ownerState);
    expect(result).to.deep.equal({ maxLength: 10 });
  });

  it('passes slotState through as the second argument when the function accepts it', () => {
    // This is the three-argument form added for Base UI-style components.
    // No existing test in the repo (direct or indirect) exercises this path.
    const ownerState = { type: 'text' as const };
    const slotState = { focused: true };
    let receivedArgs: unknown[] = [];
    const componentProps = (...args: unknown[]) => {
      receivedArgs = args;
      return { 'aria-pressed': true };
    };
    resolveComponentProps(componentProps, ownerState, slotState);
    expect(receivedArgs).to.deep.equal([ownerState, slotState]);
  });

  it('calls the function with slotState undefined when no slotState is provided', () => {
    let receivedSlotState: unknown = 'not-called';
    const componentProps = (_ownerState: unknown, slotState: unknown) => {
      receivedSlotState = slotState;
      return {};
    };
    resolveComponentProps(componentProps, { type: 'text' });
    expect(receivedSlotState).to.equal(undefined);
  });
});
