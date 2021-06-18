import * as React from 'react';
import { expect } from 'chai';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createClientRender, screen } from 'test/utils';

describe('<Dialog /> integration', () => {
  const render = createClientRender();

  it('is automatically labelled by its DialogTitle', () => {
    render(
      <Dialog open>
        <DialogTitle>Set backup account</DialogTitle>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toHaveAccessibleName('Set backup account');
  });
});
