import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import styled from '@mui/styled-engine-sc';

describe('Vite/Vitest compatibility', () => {
  const { render } = createRenderer();

  it('should work with named import from styled-components (Vite/Vitest fix)', () => {
    // This test verifies that the fix for Vite/Vitest compatibility works
    // The issue was that styled-components v6+ changed to named exports
    // but mui-styled-engine-sc was using default import
    const StyledComponent = styled('div')({
      color: 'red',
      padding: '10px',
    });

    const { container } = render(<StyledComponent>Test Content</StyledComponent>);
    
    expect(container.firstChild).not.to.equal(null);
    expect(container.firstChild.tagName).to.equal('DIV');
    expect(container.firstChild.textContent).to.equal('Test Content');
  });

  it('should work with complex styled components in Vite/Vitest', () => {
    const ComplexStyledComponent = styled('button')(({ theme }) => ({
      backgroundColor: 'blue',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'darkblue',
      },
    }));

    const { container } = render(<ComplexStyledComponent>Click me</ComplexStyledComponent>);
    
    expect(container.firstChild).not.to.equal(null);
    expect(container.firstChild.tagName).to.equal('BUTTON');
    expect(container.firstChild.textContent).to.equal('Click me');
  });

  it('should handle styled-components options correctly in Vite/Vitest', () => {
    const StyledWithOptions = styled('span', {
      shouldForwardProp: (prop) => prop !== 'customColor',
      label: 'ViteTestComponent',
    })(({ customColor }) => ({
      color: customColor || 'black',
    }));

    const { container } = render(<StyledWithOptions customColor="blue">Styled Text</StyledWithOptions>);
    
    expect(container.firstChild).not.to.equal(null);
    expect(container.firstChild.tagName).to.equal('SPAN');
    expect(container.firstChild.textContent).to.equal('Styled Text');
    // The customColor prop should not be forwarded to the DOM
    expect(container.firstChild).not.to.have.attribute('customColor');
  });

  it('should support ThemeContext from styled-components in Vite/Vitest', async () => {
    const { ThemeContext } = await import('@mui/styled-engine-sc');
    expect(ThemeContext).not.to.equal(undefined);
    expect(typeof ThemeContext).to.equal('object');
  });

  it('should support keyframes from styled-components in Vite/Vitest', async () => {
    const { keyframes } = await import('@mui/styled-engine-sc');
    expect(keyframes).not.to.equal(undefined);
    expect(typeof keyframes).to.equal('function');
    
    const animation = keyframes`
      from { opacity: 0; }
      to { opacity: 1; }
    `;
    expect(animation).not.to.equal(undefined);
  });

  it('should support css from styled-components in Vite/Vitest', async () => {
    const { css } = await import('@mui/styled-engine-sc');
    expect(css).not.to.equal(undefined);
    expect(typeof css).to.equal('function');
    
    const styles = css`
      color: red;
      padding: 10px;
    `;
    expect(styles).not.to.equal(undefined);
  });
});