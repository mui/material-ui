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

  describe('props filtering', () => {
    const { render } = createRenderer();

    it('composes shouldForwardProp on composed styled components', () => {
      const StyledDiv = styled('div', {
        shouldForwardProp: (prop) => prop !== 'foo',
      })<{ foo?: any }>();

      const ComposedDiv = styled(StyledDiv, {
        shouldForwardProp: (prop) => prop !== 'bar',
      })<{ bar?: any }>();

      const { container } = render(<ComposedDiv foo bar xyz="true" />);

      chai.expect(container.firstChild).to.not.have.attribute('foo');
      chai.expect(container.firstChild).to.not.have.attribute('bar');
    });

    it('custom shouldForwardProp works', () => {
      function Svg(props: JSX.IntrinsicElements['svg']) {
        return (
          <svg {...props}>
            <rect x="10" y="10" height="100" width="100" style={{ stroke: '#ff0000' }} />
          </svg>
        );
      }

      const StyledSvg = styled(Svg, {
        shouldForwardProp: (prop) => ['className', 'width', 'height'].indexOf(prop) !== -1,
      })`
        &,
        & * {
          fill: ${({ color }) => color};
        }
      `;

      const { container } = render(<StyledSvg color="#0000ff" width="100px" height="100px" />);
      chai.expect(container.firstChild).to.not.have.attribute('color');
      chai.expect(container.firstChild).to.have.attribute('width', '100px');
      chai.expect(container.firstChild).to.have.attribute('height', '100px');
    });

    it('default prop filtering for native html tag', () => {
      const Link = styled('a')`
        color: green;
      `;
      const rest = { m: [3], pt: [4] };

      const { container } = render(
        <Link
          a="true"
          b="true"
          wow="true"
          prop="true"
          filtering="true"
          is="true"
          cool="true"
          aria-label="some label"
          data-wow="value"
          href="link"
          {...rest}
        >
          hello world
        </Link>,
      );
      chai.expect(container.firstChild).to.have.attribute('href', 'link');
      chai.expect(container.firstChild).to.have.attribute('aria-label', 'some label');
      chai.expect(container.firstChild).to.have.attribute('data-wow', 'value');
      chai.expect(container.firstChild).to.have.attribute('is', 'true');

      chai.expect(container.firstChild).not.to.have.attribute('a');
      chai.expect(container.firstChild).not.to.have.attribute('b');
      chai.expect(container.firstChild).not.to.have.attribute('wow');
      chai.expect(container.firstChild).not.to.have.attribute('prop');
      chai.expect(container.firstChild).not.to.have.attribute('filtering');
      chai.expect(container.firstChild).not.to.have.attribute('cool');
    });
  });
});
