import { expect } from 'chai';
import { getForwardableProps } from '.';

const props = {
  foo: 42,
  fooBar: true,
  'data-testid': 'a',
  'aria-label': 'Foo',
  role: 'button',
  className: 'foo',
  tabIndex: -1,
};

describe('getForwardableProps', () => {
  describe('when React component is provided as targetElement', () => {
    it('returns the props without modification', () => {
      const Component = () => null;
      const returnedProps = getForwardableProps(Component, props);
      expect(returnedProps).to.equal(props);
    });
  });

  describe('when HTML element is provided as targetElement', () => {
    it('filters out the invalid props', () => {
      const returnedProps = getForwardableProps('span', props);
      const expectedProps = {
        'data-testid': 'a',
        'aria-label': 'Foo',
        role: 'button',
        className: 'foo',
        tabIndex: -1,
      };
      expect(returnedProps).to.deep.equal(expectedProps);
    });
  });
});
