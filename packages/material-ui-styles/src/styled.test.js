import React from 'react';
import { assert } from 'chai';
import styled from './styled';
import { SheetsRegistry } from 'jss';
import { createMount } from '@material-ui/core/test-utils';
import { createGenerateClassName } from '@material-ui/styles';
import StylesProvider from './StylesProvider';

describe('styled', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work as expected', () => {
    const StyledButton = styled('button')({
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    });

    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    mount(
      <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
        <StyledButton>Styled Components</StyledButton>
      </StylesProvider>,
    );

    assert.strictEqual(sheetsRegistry.registry.length, 1);
    assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Styled-button--root-1ds4xjv' });
  });
});
