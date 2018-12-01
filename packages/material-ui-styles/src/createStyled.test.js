import React from 'react';
import { assert } from 'chai';
import { SheetsRegistry } from 'jss';
import { createMount } from '@material-ui/core/test-utils';
import createStyled from './createStyled';
import StylesProvider from './StylesProvider';

describe('createStyled', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work as expected', () => {
    const Styled = createStyled({
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    });

    function RenderProps() {
      return (
        <Styled>
          {({ classes }) => (
            <button type="button" className={classes.root}>
              Render props
            </button>
          )}
        </Styled>
      );
    }

    const sheetsRegistry = new SheetsRegistry();

    mount(
      <StylesProvider sheetsRegistry={sheetsRegistry}>
        <RenderProps />
      </StylesProvider>,
    );

    assert.strictEqual(sheetsRegistry.registry.length, 1);
    assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Styled-root-1' });
  });
});
