import { expect } from 'chai';
import adaptV4Theme from './adaptV4Theme';

describe('adaptV4Theme', () => {
  it("moves props to components' defaultProps", () => {
    const theme = {
      props: {
        MuiButton: {
          disabled: true,
        },
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(theme.props.MuiButton);
  });

  it("moves overrides to components' styleOverrides", () => {
    const theme = {
      overrides: {
        MuiTable: {
          root: {
            background: 'red',
          },
        },
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiTable.styleOverrides).to.deep.equal(
      theme.overrides.MuiTable,
    );
  });

  it('moves props, and overrides to components', () => {
    const theme = {
      props: {
        MuiButton: {
          disabled: true,
        },
      },
      overrides: {
        MuiTable: {
          root: {
            background: 'red',
          },
        },
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiTable.styleOverrides).to.deep.equal(
      theme.overrides.MuiTable,
    );
  });

  it('merges props and overrides to components', () => {
    const theme = {
      props: {
        MuiButton: {
          disabled: true,
        },
      },
      overrides: {
        MuiButton: {
          root: {
            background: 'red',
          },
        },
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiButton.styleOverrides).to.deep.equal(
      theme.overrides.MuiButton,
    );
  });

  it('merges props and overrides from different components in appropriate key', () => {
    const theme = {
      props: {
        MuiButton: {
          disabled: true,
        },
        MuiFab: {
          color: 'primary',
        },
      },
      overrides: {
        MuiButton: {
          root: {
            background: 'red',
          },
        },
        MuiFab: {
          root: {
            color: 'red',
          },
        },
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiButton.styleOverrides).to.deep.equal(
      theme.overrides.MuiButton,
    );

    expect(transformedTheme.components.MuiFab.defaultProps).to.deep.equal(theme.props.MuiFab);
    expect(transformedTheme.components.MuiFab.styleOverrides).to.deep.equal(theme.overrides.MuiFab);
  });

  it('merges partially migrated props and overrides from different components in appropriate key', () => {
    const theme = {
      defaultProps: {
        MuiButton: {
          disabled: true,
        },
        MuiFab: {
          color: 'primary',
        },
      },
      styleOverrides: {
        MuiButton: {
          root: {
            background: 'red',
          },
        },
        MuiFab: {
          root: {
            color: 'red',
          },
        },
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(
      theme.defaultProps.MuiButton,
    );
    expect(transformedTheme.components.MuiButton.styleOverrides).to.deep.equal(
      theme.styleOverrides.MuiButton,
    );

    expect(transformedTheme.components.MuiFab.defaultProps).to.deep.equal(
      theme.defaultProps.MuiFab,
    );
    expect(transformedTheme.components.MuiFab.styleOverrides).to.deep.equal(
      theme.styleOverrides.MuiFab,
    );
  });
});
