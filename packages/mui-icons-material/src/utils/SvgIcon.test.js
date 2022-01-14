import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import SvgIcon from './SvgIcon';

describe('SvgIcon', () => {
  const { render } = createRenderer();

  it('works as standalone', () => {
    const { container } = render(<SvgIcon />);

    expect(container.firstChild).to.have.class('MuiSvgIcon-root');
  });

  it('should be able to change color', () => {
    const { container } = render(<SvgIcon color="primary" />);

    expect(container.firstChild).to.have.class('MuiSvgIcon-colorPrimary');
  });

  it('should be able to change fontSize', () => {
    const { container } = render(<SvgIcon fontSize="small" />);

    expect(container.firstChild).to.have.class('MuiSvgIcon-fontSizeSmall');
  });
});
