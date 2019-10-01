import React from 'react';
import { expect } from 'chai';
import { createClientRender, fireEvent, wait } from 'test/utils/createClientRender';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

describe('<Select> integration', () => {
  // StrictModeViolation: uses Fade
  const render = createClientRender({ strict: false });

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

  describe('with label', () => {
    // we're somewhat abusing "focus" here. What we're actually interested in is
    // displaying it as "active". WAI-ARIA authoring practices do not consider the
    // the trigger part of the widget while a native <select /> will outline the trigger
    // as well
    it('is displayed as focused while open', () => {
      const { container, getByRole } = render(
        <FormControl>
          <InputLabel classes={{ focused: 'focused-label' }} htmlFor="age-simple">
            Age
          </InputLabel>
          <Select inputProps={{ id: 'age' }} value="">
            <MenuItem value="">none</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>,
      );

      const trigger = getByRole('button');
      trigger.focus();
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });

      expect(container.querySelector('[for="age-simple"]')).to.have.class('focused-label');
    });

    it('does not stays in an active state if an open action did not actually open', () => {
      // test for https://github.com/mui-org/material-ui/issues/17294
      // we used to set a flag to stop blur propagation when we wanted to open the
      // select but never considered what happened if the select never opened
      const { container, getByRole } = render(
        <FormControl>
          <InputLabel classes={{ focused: 'focused-label' }} htmlFor="age-simple">
            Age
          </InputLabel>
          <Select inputProps={{ id: 'age' }} open={false} value="">
            <MenuItem value="">none</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>,
      );

      getByRole('button').focus();

      expect(container.querySelector('[for="age-simple"]')).to.have.class('focused-label');

      fireEvent.keyDown(document.activeElement, { key: 'Enter' });

      expect(container.querySelector('[for="age-simple"]')).to.have.class('focused-label');

      getByRole('button').blur();

      expect(container.querySelector('[for="age-simple"]')).not.to.have.class('focused-label');
    });
  });
});
