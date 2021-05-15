import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import OutlinedInput, { outlinedInputClasses as classes } from '@material-ui/core/OutlinedInput';
import InputBase from '@material-ui/core/InputBase';

describe('<OutlinedInput />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<OutlinedInput />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiOutlinedInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} />,
    );

    expect(container.querySelector('.notched-outlined')).not.to.equal(null);
  });

  it('should forward classes to InputBase', () => {
    render(<OutlinedInput error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });
});
