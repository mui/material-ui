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
import { StyleRulesCallback, StyledComponentProps } from '../../src/styles/withStyles';
import blue from '../../src/colors/blue';
import { WithTheme } from '../../src/styles/withTheme';
import { StandardProps } from '../../src';

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
withStyles<'listItem' | 'guttered'>(theme => ({
  guttered: theme.mixins.gutters({
    '&:hover': {
      textDecoration: 'none',
    },
  }),
  listItem: {
    '&:hover $listItemIcon': {
      visibility: 'inherit',
    },
  },
}));

{
  type ListItemContentClassKey = 'root' | 'iiiinset' | 'row';
  const styles = withStyles<ListItemContentClassKey>(
    theme => ({
      // Styled similar to ListItemText
      root: {
        '&:first-child': {
          paddingLeft: 0,
        },
        flex: '1 1 auto',
        padding: '0 16px',
      },

      iiiinset: {
        '&:first-child': {
          paddingLeft: theme.spacing.unit * 7,
        },
      },
      row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      },
    }),
    { name: 'ui-ListItemContent' },
  );

  interface ListItemContentProps extends StyledComponentProps<ListItemContentClassKey> {
    inset?: boolean;
    row?: boolean;
  }

  const ListItemContent = styles<ListItemContentProps>(props => {
    const { children, classes, inset, row } = props;
    return (
      <div className="foo" color="textSecondary">
        {children}
      </div>
    );
  });
}

{
  interface FooProps extends StyledComponentProps<'x' | 'y'> {
    a: number;
    b: boolean;
  }

  const ListItemContent = withStyles({ x: {}, y: {} })<FooProps>(props => <div />);
}

{ // https://github.com/mui-org/material-ui/issues/11109
  // The real test here is with "strictFunctionTypes": false,
  // but we don't have a way currently to test under varying
  // TypeScript configurations.
  interface IStyle {
    content: any;
  }
  
  interface IComponentProps {
    caption: string;
  }
  
  type ComponentProps = IComponentProps & WithStyles<'content'>;
  
  const decorate = withStyles((theme): IStyle => ({
    content: {
      margin: 4
    }
  }));
  
  const Component = (props: ComponentProps) => {
    return <div className={props.classes.content}>Hello {props.caption}</div>
  }
  
  const StyledComponent = decorate(Component);
  
  class App extends React.Component {
    public render() {
      return (
        <div className="App">
          <StyledComponent caption="Developer" />
        </div>
      );
    }
  }

  <App />;
}

{ // https://github.com/mui-org/material-ui/issues/11191
  const decorate = withStyles<classList>((theme) => ({
    main: {}
  }));

  type classList =
    | 'main';

  interface IProps {
    someProp?: string;
  }

  class SomeComponent extends React.PureComponent<IProps & WithStyles<classList>> {
    render() {
      return <div />
    }
  }

  const DecoratedSomeComponent = decorate(SomeComponent); // note that I don't specify a generic type here

  <DecoratedSomeComponent someProp="hello world" />;
}
