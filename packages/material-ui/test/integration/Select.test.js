import React from 'react';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import { createMount } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';

class SelectAndDialog extends React.Component {
  state = {
    value: 10,
  };

  handleChange = event => {
    this.setState({ value: Number(event.target.value) });
  };

  render() {
    return (
      <Dialog open>
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          MenuProps={this.props.MenuProps}
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
}

SelectAndDialog.propTypes = {
  MenuProps: PropTypes.object,
};

describe('<Select> integration', () => {
  let mount;

  before(() => {
    // StrictModeViolation: unknown
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('with Dialog', () => {
    it('should focus the selected item', done => {
      const wrapper = mount(<SelectAndDialog />);
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
      const selectDisplay = portalLayer.querySelector('[data-mui-test="SelectDisplay"]');

      wrapper.setProps({
        MenuProps: {
          onExited: () => {
            assert.strictEqual(
              document.activeElement,
              selectDisplay,
              'should focus back the select input',
            );
            done();
          },
        },
      });

      // Let's open the select component
      selectDisplay.focus();
      selectDisplay.click();

      const dialogPortalLayer = document.querySelectorAll('[data-mui-test="Modal"]')[1];

      assert.strictEqual(
        document.activeElement,
        dialogPortalLayer.querySelectorAll('li')[1],
        'should focus the selected menu item',
      );

      // Now, let's close the select component
      const backdrop = dialogPortalLayer.querySelector('[data-mui-test="Backdrop"]');
      backdrop.click();
    });

    it('should be able to change the selected item', done => {
      const wrapper = mount(<SelectAndDialog />);
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
      const selectDisplay = portalLayer.querySelector('[data-mui-test="SelectDisplay"]');

      wrapper.setProps({
        MenuProps: {
          onExited: () => {
            assert.strictEqual(
              document.activeElement,
              selectDisplay,
              'should focus back the select input',
            );
            done();
          },
        },
      });

      // Let's open the select component
      selectDisplay.focus();
      selectDisplay.click();

      const dialogPortalLayer = document.querySelectorAll('[data-mui-test="Modal"]')[1];

      assert.strictEqual(
        document.activeElement,
        dialogPortalLayer.querySelectorAll('li')[1],
        'should focus the selected menu item',
      );

      // Now, let's close the select component
      dialogPortalLayer.querySelectorAll('li')[2].click();
    });
  });
});
