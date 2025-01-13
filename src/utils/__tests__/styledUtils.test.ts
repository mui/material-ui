import { shouldForwardProp } from '../styledUtils';

describe('styledUtils', () => {
  it('should filter out MUI internal props', () => {
    expect(shouldForwardProp('sx')).toBe(false);
    expect(shouldForwardProp('as')).toBe(false);
    expect(shouldForwardProp('theme')).toBe(false);
    expect(shouldForwardProp('component')).toBe(false);
    expect(shouldForwardProp('ownerState')).toBe(false);
    expect(shouldForwardProp('classes')).toBe(false);
  });

  it('should filter out custom props', () => {
    expect(shouldForwardProp('customProp')).toBe(false);
    expect(shouldForwardProp('variant')).toBe(false);
    expect(shouldForwardProp('color')).toBe(false);
  });

  it('should allow valid HTML attributes', () => {
    expect(shouldForwardProp('id')).toBe(true);
    expect(shouldForwardProp('className')).toBe(true);
    expect(shouldForwardProp('data-testid')).toBe(true);
  });
}); 