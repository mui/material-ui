import * as React from 'react';
import {
  createStyles,
  withStyles,
  createMuiTheme,
  Theme,
  withTheme,
  StyleRules,
  StyleRulesCallback,
  StyledComponentProps,
  WithStyles,
  WithTheme,
  makeStyles,
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import { StandardProps } from '@material-ui/core';

// Shared types for examples
interface ComponentProps extends WithStyles<typeof styles> {
  text: string;
}

// Example 1
const styles = ({ palette, spacing }: Theme) => ({
  root: {
    padding: spacing(1),
    backgroundColor: palette.background.default,
    color: palette.primary.dark,
  },
});

const StyledExampleOne = withStyles(styles)(({ classes, text }: ComponentProps) => (
  <div className={classes.root}>{text}</div>
));
<StyledExampleOne text="I am styled!" />;

// Example 2
const Component: React.FunctionComponent<ComponentProps & WithStyles<typeof styles>> = ({
  classes,
  text,
}) => <div className={classes.root}>{text}</div>;

const StyledExampleTwo = withStyles(styles)(Component);
<StyledExampleTwo text="I am styled!" />;

// Example 3
const styleRule = createStyles({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100vh',
    width: '100%',
  },
});

const ComponentWithChildren: React.FunctionComponent<WithStyles<typeof styles>> = ({
  classes,
  children,
}) => <div className={classes.root}>{children}</div>;

const StyledExampleThree = withStyles(styleRule)(ComponentWithChildren);
<StyledExampleThree />;

// Also works with a plain object
const stylesAsPojo = {
  root: {
    backgroundColor: 'hotpink',
  },
};

const AnotherStyledSFC = withStyles({
  root: { backgroundColor: 'hotpink' },
})(({ classes }: WithStyles<'root'>) => <div className={classes.root}>Stylish!</div>);

// Overriding styles
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    common: {
      white: '#ffffff',
    },
  },
  typography: {
    h1: {
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
  spacing: 5,
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
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
  props: {
    MuiButton: {
      disabled: true,
    },
    MuiAppBar: {
      position: 'fixed',
    },
  },
});

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  props: {
    MuiButton: {
      disabled: false,
      TouchRippleProps: {
        center: true,
      },
    },
    MuiTable: {
      cellPadding: 12,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

const t1: number = createMuiTheme().spacing(1);
const t2: string = createMuiTheme().spacing(1, 2);
const t3: string = createMuiTheme().spacing(1, 2, 3);
const t4: string = createMuiTheme().spacing(1, 2, 3, 4);
// $ExpectError
const t5 = createMuiTheme().spacing(1, 2, 3, 4, 5);

function OverridesTheme() {
  return (
    <ThemeProvider theme={theme}>
      <Button>{'Overrides'}</Button>
    </ThemeProvider>
  );
}

// withTheme
const ComponentWithTheme = withTheme(({ theme }: WithTheme) => <div>{theme.spacing(1)}</div>);

<ComponentWithTheme />;

// withStyles + withTheme
type AllTheProps = WithTheme & WithStyles<typeof styles>;

const StyledComponent = withStyles(styles)(({ theme, classes }: AllTheProps) => (
  <div className={classes.root}>{theme.palette.text.primary}</div>
));

// missing prop theme
<StyledComponent />; // $ExpectError

const AllTheComposition = withTheme(StyledComponent);

<AllTheComposition />;

{
  const Foo = withTheme(
    class extends React.Component<WithTheme> {
      render() {
        return null;
      }
    },
  );

  <Foo />;
}

declare const themed: boolean;
{
  // Test that withTheme: true guarantees the presence of the theme
  const Foo = withStyles({}, { withTheme: true })(
    class extends React.Component<WithTheme> {
      hasRef() {
        // innerRef does not exists, originally caused https://github.com/mui-org/material-ui/issues/14095
        return Boolean(this.props.innerRef); // $ExpectError
      }

      render() {
        return <div style={{ margin: this.props.theme.spacing(1) }} />;
      }
    },
  );
  <Foo />;

  const Bar = withStyles({}, { withTheme: true })(({ theme }: WithStyles<string, true>) => (
    <div style={{ margin: theme.spacing(1) }} />
  ));
  <Bar />;
}

// Can't use withStyles effectively as a decorator in TypeScript
// due to https://github.com/Microsoft/TypeScript/issues/4881
// @withStyles(styles)
const DecoratedComponent = withStyles(styles)(
  class extends React.Component<ComponentProps & WithStyles<typeof styles>> {
    render() {
      const { classes, text } = this.props;
      return <div className={classes.root}>{text}</div>;
    }
  },
);

// no 'classes' property required at element creation time (#8267)
<DecoratedComponent text="foo" />;

// Allow nested pseudo selectors
withStyles(theme =>
  createStyles({
    guttered: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
    listItem: {
      '&:hover $listItemIcon': {
        visibility: 'inherit',
      },
    },
  }),
);

{
  // allow top level media queries
  // https://github.com/mui-org/material-ui/issues/12277

  // typescript thinks `content` is the CSS property not a classname
  const ambiguousStyles = createStyles({
    content: {
      minHeight: '100vh',
    },
    '@media (min-width: 960px)': {
      // $ExpectError
      content: {
        display: 'flex',
      },
    },
  });

  const styles = createStyles({
    contentClass: {
      minHeight: '100vh',
    },
    '@media (min-width: 960px)': {
      contentClass: {
        display: 'flex',
      },
    },
  });
}

{
  const styles = (theme: Theme) =>
    createStyles({
      // Styled similar to ListItemText
      root: {
        '&:first-child': {
          paddingLeft: 0,
        },
        flex: '1 1 auto',
        padding: '0 16px',
      },
      inset: {
        '&:first-child': {
          paddingLeft: theme.spacing(7),
        },
      },
      row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      },
    });

  interface ListItemContentProps extends WithStyles<typeof styles> {
    children?: React.ReactElement;
    inset?: boolean;
    row?: boolean;
  }

  const ListItemContent = withStyles(styles, { name: 'ui-ListItemContent' })(
    ({ children, classes, inset, row }: ListItemContentProps) => (
      <div className={classes.root} color="textSecondary">
        {children}
      </div>
    ),
  );
}

{
  interface FooProps extends WithStyles<'x' | 'y'> {
    a: number;
    b: boolean;
  }

  const ListItemContent = withStyles({ x: {}, y: {} })((props: FooProps) => <div />);
}

{
  // https://github.com/mui-org/material-ui/issues/11109
  // The real test here is with "strictFunctionTypes": false,
  // but we don't have a way currently to test under varying
  // TypeScript configurations.

  interface ComponentProps extends WithStyles<typeof styles> {
    caption: string;
  }

  const styles = (theme: Theme) =>
    createStyles({
      content: {
        margin: 4,
      },
    });

  const Component = (props: ComponentProps) => {
    return <div className={props.classes.content}>Hello {props.caption}</div>;
  };

  const StyledComponent = withStyles(styles)(Component);

  class App extends React.Component {
    render() {
      return (
        <div className="App">
          <StyledComponent caption="Developer" />
        </div>
      );
    }
  }

  <App />;
}

{
  // https://github.com/mui-org/material-ui/issues/11191
  const styles = (theme: Theme) =>
    createStyles({
      main: {},
    });

  interface Props extends WithStyles<typeof styles> {
    someProp?: string;
  }

  class SomeComponent extends React.PureComponent<Props> {
    render() {
      return <div />;
    }
  }

  const DecoratedSomeComponent = withStyles(styles)(SomeComponent);

  <DecoratedSomeComponent someProp="hello world" />;
}

{
  // https://github.com/mui-org/material-ui/issues/11312
  withStyles(styles, { name: 'MyComponent', index: 0 })(() => <div />);
}

{
  // https://github.com/mui-org/material-ui/issues/11164
  const style: StyleRulesCallback = theme => ({
    text: theme.typography.body2,
  });
}

{
  // can't provide own `classes` type
  interface Props {
    classes: number;
  }

  class Component extends React.Component<Props & WithStyles<typeof styles>> {}
  // $ExpectError
  const StyledComponent = withStyles(styles)(Component);

  // implicit FunctionComponent
  withStyles(styles)((props: Props) => null); // $ExpectError
  withStyles(styles)((props: Props & WithStyles<typeof styles>) => null); // $ExpectError
  withStyles(styles)((props: Props & { children?: React.ReactNode }) => null); // $ExpectError
  withStyles(styles)(
    (props: Props & WithStyles<typeof styles> & { children?: React.ReactNode }) => null, // $ExpectError
  );

  // explicit not but with "Property 'children' is missing in type 'ValidationMap<Props>'".
  // which is not helpful
  const StatelessComponent: React.FunctionComponent<Props> = props => null;
  const StatelessComponentWithStyles: React.FunctionComponent<
    Props & WithStyles<typeof styles>
  > = props => null;
  withStyles(styles)(StatelessComponent); // $ExpectError
  withStyles(styles)(StatelessComponentWithStyles); // $ExpectError
}

{
  // https://github.com/mui-org/material-ui/issues/12670
  interface Props {
    nonDefaulted: string;
    defaulted: number;
  }

  class MyButton extends React.Component<Props & WithStyles<typeof styles>> {
    static defaultProps = {
      defaulted: 0,
    };

    render() {
      const { classes, nonDefaulted, defaulted } = this.props;
      return (
        <Button className={classes.btn}>
          {defaulted}, {nonDefaulted}
        </Button>
      );
    }
  }

  const styles = () =>
    createStyles({
      btn: {
        color: 'red',
      },
    });

  const StyledMyButton = withStyles(styles)(MyButton);

  const CorrectUsage = () => <StyledMyButton nonDefaulted="2" />;
  // Property 'nonDefaulted' is missing in type '{}'
  const MissingPropUsage = () => <StyledMyButton />; // $ExpectError
}

{
  // theme is defaulted to type of Theme
  const useStyles = makeStyles(theme => {
    // $ExpectType Theme
    const t = theme;
    return {
      root: {
        margin: t.spacing(1),
      },
    };
  });
}
