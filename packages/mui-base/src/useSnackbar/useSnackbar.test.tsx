import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { fireEvent, createRenderer } from '@mui/internal-test-utils';
import { useSnackbar, UseSnackbarParameters } from '@mui/base/useSnackbar';

describe('useSnackbar', () => {
  const { render } = createRenderer();

  const invokeUseSnackbar = (props: UseSnackbarParameters) => {
    const ref = React.createRef<ReturnType<typeof useSnackbar>>();
    function TestComponent() {
      const snackbarDefinition = useSnackbar(props);
      React.useImperativeHandle(ref, () => snackbarDefinition, [snackbarDefinition]);
      return null;
    }

    render(<TestComponent />);

    return ref.current!;
  };

  describe('getRootProps', () => {
    it('returns props for the root slot', () => {
      const props: UseSnackbarParameters = {};

      const { getRootProps } = invokeUseSnackbar(props);

      const rootProps = getRootProps();

      expect(rootProps.role).to.equal('presentation');
    });

    it('forwards external props including event handlers', () => {
      const handleClickSpy = spy();

      function Snackbar() {
        const { getRootProps } = useSnackbar();

        return <div {...getRootProps({ onClick: handleClickSpy, random: 'arbitraryValue' })} />;
      }
      const { getByRole } = render(<Snackbar />);

      const snackbar = getByRole('presentation');

      expect(snackbar).to.have.attribute('random', 'arbitraryValue');

      fireEvent.click(snackbar);

      expect(handleClickSpy.callCount).to.equal(1);
    });
  });
});
