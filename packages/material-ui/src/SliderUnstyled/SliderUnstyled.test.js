import * as React from 'react';
import {
  createClientRender,
} from 'test/utils';
import SliderUnstyled from './SliderUnstyled';

describe('<SliderUnstyled />', () => {
  const render = createClientRender();

  it('should not throw when rendered', () => {
    expect(() => {
      render(<SliderUnstyled />)
    }).not.to.throw();
  });
});