import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import { applySoftInversion, applySolidInversion } from '@mui/joy/colorInversion';

describe('colorInversionUtil', () => {
  const { render } = createRenderer();

  it('should not throw error using sx prop', () => {
    expect(() =>
      render(<Box sx={[applySoftInversion('primary'), applySolidInversion('primary')]} />),
    ).not.to.throw();
  });

  it('should not throw error using styled API', () => {
    expect(() => {
      styled('div')(applySoftInversion('primary'), applySolidInversion('primary'));
    }).not.to.throw();
  });
});
