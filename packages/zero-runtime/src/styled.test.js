import * as React from 'react';
import { createRenderer } from '@mui-internal/test-utils';
import { styled } from '@mui/zero-runtime';
import { expect } from 'chai';

describe('styled', () => {
  const { render } = createRenderer();
  it('should not set css variable where the value is undefined', () => {
    const Component = styled('div', {
      displayName: 'Component',
      classes: 'component',
      vars: {
        'var-1': [({ isBlue }) => (isBlue ? 'blue' : undefined), true],
        'var-2': [() => 'red', true],
      },
      shouldForwardProp: (propKey) => propKey !== 'isBlue',
    });
    const screen = render(
      <Component data-testid="component" className="extra-class">
        Hello
      </Component>,
    );
    expect(screen.getByTestId('component')).attribute('style', '--var-2: red;');
    screen.rerender(
      <Component data-testid="component" className="extra-class" isBlue>
        Hello
      </Component>,
    );
    expect(screen.getByTestId('component')).attribute('style', '--var-2: red; --var-1: blue;');
  });
});
