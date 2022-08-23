import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle, { modalDialogTitleClasses as classes } from '@mui/joy/ModalDialogTitle';

describe('<ModalDialogTitle />', () => {
  const { render } = createRenderer();

  describeConformance(<ModalDialogTitle />, () => ({
    classes,
    inheritComponent: 'h2',
    render,
    ThemeProvider,
    muiName: 'JoyModalDialogTitle',
    refInstanceof: window.HTMLHeadingElement,
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
  }));

  it('call `onClick` together with close context from Modal', () => {
    const { getByRole } = render(
      <Modal open>
        <ModalDialog>
          <ModalDialogTitle />
        </ModalDialog>
      </Modal>,
    );

    const title = getByRole('heading');

    expect(getByRole('dialog')).to.have.attr('aria-labelledby', title.id);
  });
});
