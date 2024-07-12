import { expect } from 'chai';
import extractEventHandlers from '@mui/utils/extractEventHandlers';

describe('extractEventHandlers', () => {
  it('extracts the fields starting with `on[A-Z]` and being a function', () => {
    const input = {
      onClick: () => {},
      onChange: () => {},
      once: () => {},
      on: () => {},
      onInvalid: 0,
      on1: () => {},
      xonClick: () => {},
    };

    const result = extractEventHandlers(input);
    expect(result).to.deep.equal({
      onClick: input.onClick,
      onChange: input.onChange,
    });
  });

  it('returns an empty object if an empty object is provided', () => {
    const result = extractEventHandlers({});
    expect(result).to.deep.equal({});
  });

  it('returns an empty object if undefined is passed in', () => {
    const result = extractEventHandlers(undefined);
    expect(result).to.deep.equal({});
  });

  it('excludes the provided handlers from the result', () => {
    const input = {
      onClick: () => {},
      onChange: () => {},
      onFocus: () => {},
    };

    const result = extractEventHandlers(input, ['onClick', 'onFocus']);
    expect(result).to.deep.equal({ onChange: input.onChange });
  });
});
