/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import Drawer from './Drawer';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Drawer />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('propTypes', () => {
    it('accepts number in the width props', () => {
      shallowWithContext(
        <Drawer width={400} />
      );
    });

    it('accepts width in decimal format', () => {
      shallowWithContext(
        <Drawer width={0.5} />
      );
    });
  });
});
