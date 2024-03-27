import path from 'node:path';
import * as React from 'react';
import * as chai from 'chai';
import { createRenderer, screen } from '@mui-internal/test-utils';
import styled from '../../src/styled';
import { runTransformation, expect } from '../testUtils';

const theme = {
  palette: {
    primary: {
      main: 'red',
    },
  },
  size: {
    font: {
      h1: '3rem',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        rail: {
          fontSize: '1.5rem',
        },
      },
    },
  },
};

describe('Pigment CSS - styled', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should work with theme', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled-theme.input.js'),
      {
        themeArgs: {
          theme,
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should work with theme and rtl', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled-rtl.input.js'),
      {
        themeArgs: {
          theme,
        },
        css: {
          defaultDirection: 'ltr',
          generateForBothDir: true,
          getDirSelector(dir) {
            return `:dir(${dir})`;
          },
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  describe('props forwarding', () => {
    const { render } = createRenderer();

    it('composes shouldForwardProp on composed styled components', () => {
      const StyledDiv = styled('div', {
        shouldForwardProp: (prop) => prop !== 'foo',
      })<{ foo?: any }>();

      const ComposedDiv = styled(StyledDiv, {
        shouldForwardProp: (prop) => prop !== 'bar',
      })<{ bar?: any }>();

      // eslint-disable-next-line react/react-in-jsx-scope
      const { container } = render(<ComposedDiv foo bar xyz />);

      expect(container.firstChild).to.not.have.attribute('foo');
      expect(container.firstChild).to.not.have.attribute('bar');
    });
  });
});
