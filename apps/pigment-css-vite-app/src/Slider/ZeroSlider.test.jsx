/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { render } from '@testing-library/react';
import Slider from './ZeroSlider';

describe('Slider', () => {
  it('should render', () => {
    const { rerender, container } = render(<Slider />);

    const root = container.getElementsByClassName('MuiSlider-root')[0];
    expect(root.classList.contains('MuiSlider-colorPrimary')).toBeTruthy();
    rerender(<Slider color="secondary" />);
    expect(root.classList.contains('MuiSlider-colorSecondary')).toBeTruthy();

    let rootComputedStyles = window.getComputedStyle(root);
    expect(rootComputedStyles.borderRadius).toEqual('12px');
    expect(rootComputedStyles.cursor).toEqual('pointer');

    rerender(<Slider disabled />);
    rootComputedStyles = window.getComputedStyle(root);
    expect(rootComputedStyles.cursor).toEqual('default');
  });
});
