import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import { ThemeProvider as JoyThemeProvider, THEME_ID as JOY_ID } from '@mui/joy/styles';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as createMaterialTheme,
  THEME_ID as MATERIAL_ID,
} from '@mui/material/styles';
import SvgIcon from './SvgIcon';
import svgIconClasses from './svgIconClasses';

describe('<SvgIcon />', () => {
  const { render } = createRenderer();
  let path;

  before(() => {
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" data-testid="test-path" />;
  });

  it('should render without errors', () => {
    expect(() => render(<SvgIcon>{path}</SvgIcon>)).not.to.throw();
  });

  it('should have `medium` default fontSize', () => {
    const { container } = render(<SvgIcon>{path}</SvgIcon>);

    expect(container.firstChild).to.have.class(svgIconClasses.fontSizeMedium);
  });

  it('should use Joy theme if provided', () => {
    const { container } = render(
      <JoyThemeProvider>
        <SvgIcon>{path}</SvgIcon>
      </JoyThemeProvider>,
    );

    expect(container.firstChild).to.have.class('MuiSvgIcon-fontSizeXl2');
  });

  it('should use Material theme if provided', () => {
    const theme = createMaterialTheme({
      components: {
        MuiSvgIcon: {
          defaultProps: {
            fontSize: 'large',
          },
        },
      },
    });
    const { container } = render(
      <MaterialThemeProvider theme={theme}>
        <SvgIcon>{path}</SvgIcon>
      </MaterialThemeProvider>,
    );

    expect(container.firstChild).to.have.class(svgIconClasses.fontSizeLarge);
  });

  describe('theme scoping', () => {
    it('should use Joy theme scoping if provided', () => {
      const { container } = render(
        <JoyThemeProvider
          theme={{
            [JOY_ID]: {
              components: {
                MuiSvgIcon: {
                  defaultProps: {
                    fontSize: 'xl2',
                  },
                },
              },
            },
          }}
        >
          <SvgIcon>{path}</SvgIcon>
        </JoyThemeProvider>,
      );

      expect(container.firstChild).to.have.class('MuiSvgIcon-fontSizeXl2');
    });

    it('should use Material theme scoping if provided', () => {
      const theme = createMaterialTheme({
        components: {
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'large',
            },
          },
        },
      });
      const { container } = render(
        <MaterialThemeProvider theme={{ [MATERIAL_ID]: theme }}>
          <SvgIcon>{path}</SvgIcon>
        </MaterialThemeProvider>,
      );

      expect(container.firstChild).to.have.class(svgIconClasses.fontSizeLarge);
    });
  });
});
