import React from 'react';
import { expect } from 'chai';
import { cleanup, createClientRender, wait } from 'test/utils/createClientRender';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';

describe('<Select> integration', () => {
  // StrictModeViolation: uses Fade
  const render = createClientRender({ strict: false });

  afterEach(() => {
    cleanup();
  });

  describe('with Dialog', () => {
    function SelectAndDialog() {
      const [value, setValue] = React.useState(10);
      const handleChange = event => {
        setValue(Number(event.target.value));
      };

      return (
        <Dialog open>
          <Select
            MenuProps={{
              transitionDuration: 0,
              BackdropProps: { 'data-testid': 'select-backdrop' },
            }}
            value={value}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Dialog>
      );
    }

    it('should focus the selected item', async () => {
      const { getByTestId, getAllByRole, getByRole, queryByRole } = render(<SelectAndDialog />);

      // Let's open the select component
      // in the browser user click also focuses
      getByRole('button').focus();
      getByRole('button').click();

      expect(getAllByRole('option')[1]).to.be.focused;

      // Now, let's close the select component
      getByTestId('select-backdrop').click();

      await wait(() => expect(queryByRole('listbox')).to.be.null);
      expect(getByRole('button')).to.focused;
    });

    it('should be able to change the selected item', async () => {
      const { getAllByRole, getByRole, queryByRole } = render(<SelectAndDialog />);
      expect(getByRole('button')).to.have.text('Ten');

      // Let's open the select component
      // in the browser user click also focuses
      getByRole('button').focus();
      getByRole('button').click();

      expect(getAllByRole('option')[1]).to.be.focused;

      // Now, let's close the select component
      getAllByRole('option')[2].click();

      await wait(() => expect(queryByRole('listbox')).to.be.null);
      expect(getByRole('button')).to.focused;
      expect(getByRole('button')).to.have.text('Twenty');
    });
  });
});
