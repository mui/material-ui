import { expect } from 'chai';
import adaptV4Theme from './adaptV4Theme';

describe('adaptV4Theme', () => {
  it('moves props to components', () => {
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

    expect(transformedTheme.components.MuiButton.props).to.deep.equal(theme.props.MuiButton);
  });

  it('moves variants to components', () => {
    const theme = {
      variants: {
        MuiFab: [
          {
            props: { variant: 'dashed' },
            styles: {
              border: '1px dashed grey',
            },
          },
        ],
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiFab.variants).to.deep.equal(theme.variants.MuiFab);
  });

  it('moves overrides to components', () => {
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

    expect(transformedTheme.components.MuiTable.overrides).to.deep.equal(theme.overrides.MuiTable);
  });

  it('moves props, variants and overrides to components', () => {
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
      variants: {
        MuiFab: [
          {
            props: { variant: 'dashed' },
            styles: {
              border: '1px dashed grey',
            },
          },
        ],
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.props).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiFab.variants).to.deep.equal(theme.variants.MuiFab);
    expect(transformedTheme.components.MuiTable.overrides).to.deep.equal(theme.overrides.MuiTable);
  });

  it('merges props, variants and overrides to components', () => {
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
      variants: {
        MuiButton: [
          {
            props: { variant: 'dashed' },
            styles: {
              border: '1px dashed grey',
            },
          },
        ],
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.props).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiButton.variants).to.deep.equal(theme.variants.MuiButton);
    expect(transformedTheme.components.MuiButton.overrides).to.deep.equal(
      theme.overrides.MuiButton,
    );
  });

  it('merges props, variants and overrides from different components in appropriate key', () => {
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
      variants: {
        MuiButton: [
          {
            props: { variant: 'dashed' },
            styles: {
              border: '1px dashed grey',
            },
          },
        ],
        MuiFab: [
          {
            props: { variant: 'strong' },
            styles: {
              fontWeight: 'bold',
            },
          },
        ],
      },
    };

    let transformedTheme;

    expect(() => {
      transformedTheme = adaptV4Theme(theme);
    }).toWarnDev(['adaptV4Theme() is deprecated']);

    expect(transformedTheme.components.MuiButton.props).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiButton.variants).to.deep.equal(theme.variants.MuiButton);
    expect(transformedTheme.components.MuiButton.overrides).to.deep.equal(
      theme.overrides.MuiButton,
    );

    expect(transformedTheme.components.MuiFab.props).to.deep.equal(theme.props.MuiFab);
    expect(transformedTheme.components.MuiFab.variants).to.deep.equal(theme.variants.MuiFab);
    expect(transformedTheme.components.MuiFab.overrides).to.deep.equal(theme.overrides.MuiFab);
  });
});
