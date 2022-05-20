import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen } from 'test/utils';
import SnackbarsProvider, { SnackbarsProviderProps } from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { snackbarClasses } from '@mui/material/Snackbar';
import { ShowSnackbarProps } from './SnackbarsContext';

describe('StackedSnackbars', () => {
  const { render, clock } = createRenderer({ clock: 'fake' });

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
    children,
  }: {
    snackbarsProviderProps?: Omit<SnackbarsProviderProps, 'ref'>;
    snackbarOptions?: ShowSnackbarProps;
    children?: React.ReactNode;
  }) => {
    return render(
      <SnackbarsProvider {...snackbarsProviderProps}>
        {children || <MyApp {...snackbarOptions} />}
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

  it('individual snackbar properties should take precedence over SnackbarsProvider', () => {
    const childRef = React.createRef<HTMLDivElement>();
    const SlideTransition = () => {
      return (
        <Slide>
          <div ref={childRef} />
        </Slide>
      );
    };
    renderComponent({
      snackbarsProviderProps: {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
      snackbarOptions: {
        TransitionComponent: SlideTransition,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      },
    });

    const showSnackbar = screen.getByText('Show Snackbar');
    fireEvent.click(showSnackbar);

    expect(childRef.current!.style.transform).to.contain('translateY');
    expect(screen.getByRole('presentation')).to.have.class(snackbarClasses.anchorOriginBottomRight);
  });

  it('each snackbars can be closed correctly', () => {
    const TestApp = () => {
      const snackbars = useSnackbars();
      return (
        <Button
          onClick={() =>
            snackbars.showSnackbar({
              message: 'Note Archived',
              action: (key: string) => (
                <Button color="secondary" size="small" onClick={snackbars.closeSnackbar(key)}>
                  Close
                </Button>
              ),
            })
          }
        >
          Show Snackbar
        </Button>
      );
    };
    renderComponent({
      children: <TestApp />,
    });

    const showSnackbar = screen.getByText('Show Snackbar');

    fireEvent.click(showSnackbar);
    fireEvent.click(showSnackbar);
    fireEvent.click(showSnackbar);

    fireEvent.click(screen.getAllByText('Close')[1]);
    clock.tick(1000);
    expect(screen.getAllByRole('alert')).to.have.length(2);

    fireEvent.click(screen.getAllByText('Close')[0]);
    clock.tick(1000);
    expect(screen.getAllByRole('alert')).to.have.length(1);
  });
});
