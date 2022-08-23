import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogDescription, {
  modalDialogDescriptionClasses as classes,
} from '@mui/joy/ModalDialogDescription';

describe('<ModalDialogDescription />', () => {
  const { render } = createRenderer();

  describeConformance(<ModalDialogDescription />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyModalDialogDescription',
    refInstanceof: window.HTMLDivElement,
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
  }));

  it('call `onClick` together with close context from Modal', () => {
    const { getByRole, getByText } = render(
      <Modal open>
        <ModalDialog>
          <ModalDialogDescription>description</ModalDialogDescription>
        </ModalDialog>
      </Modal>,
    );

    const description = getByText('description');

    expect(getByRole('dialog')).to.have.attr('aria-describedby', description.id);
  });
});
