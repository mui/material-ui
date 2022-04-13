import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen } from 'test/utils';
import SnackbarsProvider, { SnackbarsProviderProps } from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import { ShowSnackbarProps } from './SnackbarsContext';

describe('MultipleSnackbars', () => {
  const { render } = createRenderer();

  const MyApp = (snackbarOptions: ShowSnackbarProps) => {
    const snackbars = useSnackbars();
    return (
      <Button
        onClick={() => snackbars.showSnackbar({ message: 'Note Archived', ...snackbarOptions })}
      >
        Show Snackbar
      </Button>
    );
  };

  const renderComponent = ({
    snackbarsProviderProps,
    snackbarOptions,
  }: {
    snackbarsProviderProps?: Omit<SnackbarsProviderProps, 'ref'>;
    snackbarOptions?: ShowSnackbarProps;
  }) => {
    return render(
      <SnackbarsProvider {...snackbarsProviderProps}>
        <MyApp {...snackbarOptions} />
      </SnackbarsProvider>,
    );
  };

  it('should limit the number of snackbars on click', () => {
    const { setProps } = renderComponent({});
    const showSnackbar = screen.getByText('Show Snackbar');

    fireEvent.click(showSnackbar);
    fireEvent.click(showSnackbar);
    fireEvent.click(showSnackbar);
    fireEvent.click(showSnackbar);

    expect(screen.getAllByRole('alert')).to.have.length(3);

    setProps({ limit: 4 });

    fireEvent.click(showSnackbar);
    fireEvent.click(showSnackbar);

    expect(screen.getAllByRole('alert')).to.have.length(4);
  });
});
