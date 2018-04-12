import * as React from 'react';
import {
  withStyles,
  WithStyles,
  createMuiTheme,
  MuiThemeProvider,
  Theme,
  withTheme,
  StyleRules,
} from '../../src/styles';
import Button from '../../src/Button/Button';
import { StyleRulesCallback } from '../../src/styles/withStyles';
import blue from '../../src/colors/blue';
import { WithTheme } from '../../src/styles/withTheme';

// Shared types for examples
type ComponentClassNames = 'root';
interface ComponentProps {
  text: string;
}

// Example 1
const styles: StyleRulesCallback<'root'> = ({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.dark,
  },
});

const StyledExampleOne = withStyles(styles)<ComponentProps>(({ classes, text }) => (
  <div className={classes.root}>{text}</div>
));
<StyledExampleOne text="I am styled!" />;

// Example 2
const Component: React.SFC<ComponentProps & WithStyles<ComponentClassNames>> = ({
  classes,
  text,
}) => <div className={classes.root}>{text}</div>;

const StyledExampleTwo = withStyles(styles)(Component);
<StyledExampleTwo text="I am styled!" />;

// Example 3
const styleRule: StyleRules<ComponentClassNames> = {
  root: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100vh',
    width: '100%',
  },
};

const ComponentWithChildren: React.SFC<WithStyles<ComponentClassNames>> = ({
  classes,
  children,
}) => <div className={classes.root}>{children}</div>;

const StyledExampleThree = withStyles(styleRule)<{}>(ComponentWithChildren);
<StyledExampleThree />;

// Also works with a plain object
const stylesAsPojo = {
  root: {
    backgroundColor: 'hotpink',
  },
};

const AnotherStyledSFC = withStyles({
  root: { backgroundColor: 'hotpink' },
})(({ classes }) => <div className={classes.root}>Stylish!</div>);

// Overriding styles
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    common: {
      white: '#ffffff',
    },
  },
  typography: {
    display4: {
      fontSize: 24,
    },
    fontSize: 18,
  },
  mixins: {
    toolbar: {
      backgroundColor: 'red',
    },
  },
  breakpoints: {
    step: 3,
  },
  transitions: {
    duration: {
      short: 50,
    },
  },
  spacing: {},
  zIndex: {
    appBar: 42,
  },
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

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

function OverridesTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>{'Overrides'}</Button>
    </MuiThemeProvider>
  );
}

// withTheme
const ComponentWithTheme = withTheme()(({ theme }) => <div>{theme.spacing.unit}</div>);

<ComponentWithTheme />;

// withStyles + withTheme
type AllTheProps = WithTheme & WithStyles<'root'>;

const AllTheComposition = withTheme()(
  withStyles(styles)(({ theme, classes }: AllTheProps) => (
    <div className={classes.root}>{theme.palette.text.primary}</div>
  )),
);

<AllTheComposition />;

// Can't use withStyles effectively as a decorator in TypeScript
// due to https://github.com/Microsoft/TypeScript/issues/4881
//@withStyles(styles)
const DecoratedComponent = withStyles(styles)(
  class extends React.Component<ComponentProps & WithStyles<'root'>> {
    render() {
      const { classes, text } = this.props;
      return <div className={classes.root}>{text}</div>;
    }
  },
);

// no 'classes' property required at element creation time (#8267)
<DecoratedComponent text="foo" />;

// Allow nested pseudo selectors
withStyles<'listItem'>(theme => ({
  listItem: {
    '&:hover $listItemIcon': {
      visibility: 'inherit',
    },
  },
}))