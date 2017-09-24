import * as React from 'react';
import { StyledComponent } from '../../src';
import {
  withStyles,
  WithStyles,
  createMuiTheme,
  MuiThemeProvider,
  Theme,
  withTheme,
} from '../../src/styles';
import Button from '../../src/Button/Button';
import { StyledComponentProps } from '../../src/index'

const styles = ({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    background: palette.background,
    color: palette.primary,
  },
});

interface StyledComponentClassNames {
  root: string;
}

interface NonStyleProps {
  text: string;
}

const StyledSFC = withStyles(styles)<NonStyleProps>(
  ({ classes, text }) => (
    <div className={classes.root}>
      {text}
    </div>
  )
);

<StyledSFC text="I am styled!" />;

// Also works with a plain object

const stylesAsPojo = {
  root: {
    background: 'hotpink',
  },
};

const AnotherStyledSFC = withStyles({
  root: { background: 'hotpink' },
})(({ classes }) => <div className={classes.root}>Stylish!</div>);

// Overriding styles

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

const customTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function OverridesTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>
        {'Overrides'}
      </Button>
    </MuiThemeProvider>
  );
}

// withTheme

const ThemedComponent: React.SFC<{ theme: Theme }> = ({ theme }) =>
  <div>
    {theme.spacing.unit}
  </div>;
const ComponentWithTheme = withTheme(ThemedComponent);

// withStyles + withTheme
interface AllTheProps {
  theme: Theme;
  classes: StyledComponentClassNames;
}

const AllTheStyles: React.SFC<AllTheProps> = ({ theme, classes }) =>
  <div className={classes.root}>
    {theme.palette.text.primary}
  </div>;

const AllTheComposition = withTheme(
  withStyles(styles)(AllTheStyles)
);

@withStyles(styles)
class DecoratedComponent extends React.Component<NonStyleProps & StyledComponentProps<'root'>> {
  render() {
    const { classes, text } = this.props;
    return (
      <div className={classes!.root}>
        {text}
      </div>
    );
  }
}

// no 'classes' property required at element creation time (#8267)
<DecoratedComponent text="foo" />
