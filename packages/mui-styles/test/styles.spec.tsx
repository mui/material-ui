import * as React from 'react';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { expectType } from '@mui/types';
import {
  createStyles,
  withStyles,
  withTheme,
  WithTheme,
  WithStyles,
  makeStyles,
  CSSProperties,
  CreateCSSProperties,
  PropsFunc,
} from '@mui/styles';

// Example 1
const simpleStyles = ({ palette, spacing }: Theme) => ({
  root: {
    padding: spacing(1),
    backgroundColor: palette.background.default,
    color: palette.primary.dark,
  },
});

// Shared types for examples
interface SimpleComponentProps extends WithStyles<typeof simpleStyles> {
  text: string;
}

const StyledExampleOne = withStyles(simpleStyles)(({ classes, text }: SimpleComponentProps) => (
  <div className={classes.root}>{text}</div>
));
<StyledExampleOne text="I am styled!" />;

// Example 2
const SimpleComponent: React.FunctionComponent<
  SimpleComponentProps & WithStyles<typeof simpleStyles>
> = function SimpleComponent({ classes, text }) {
  return <div className={classes.root}>{text}</div>;
};

const StyledExampleTwo = withStyles(simpleStyles)(SimpleComponent);
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

const ComponentWithChildren: React.FunctionComponent<
  WithStyles<typeof simpleStyles> & { children?: React.ReactNode }
> = function ComponentWithChildren({ classes, children }) {
  return <div className={classes.root}>{children}</div>;
};

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

// withTheme
const ComponentWithTheme = withTheme<Theme, React.FunctionComponent<WithTheme<Theme>>>(
  ({ theme }: WithTheme<Theme>) => <div>{theme.spacing(1)}</div>,
);

const componentWithThemeRef = React.createRef<HTMLDivElement>();
<ComponentWithTheme ref={componentWithThemeRef} />;

// withStyles + withTheme
type AllTheProps = WithTheme<Theme> & WithStyles<typeof simpleStyles>;

const SimpleStyledComponent = withStyles(simpleStyles)(({ theme, classes }: AllTheProps) => (
  <div className={classes.root}>{theme.palette.text.primary}</div>
));

// @ts-expect-error missing prop theme
<SimpleStyledComponent />;

const AllTheComposition = withTheme<Theme, typeof SimpleStyledComponent>(SimpleStyledComponent);

<AllTheComposition />;

{
  const Foo = withTheme<Theme, React.ComponentClass<WithTheme<Theme>>>(
    class extends React.Component<WithTheme<Theme>> {
      render() {
        return null;
      }
    },
  );

  <Foo />;
}

declare const themed: boolean;
{
  // this is necessary so that TypesScript can infer the theme
  // usually it's better to just use withTheme<Theme> if you're not actual styling
  const themedStyles = (theme: Theme) => ({ root: {} });
  // Test that withTheme: true guarantees the presence of the theme
  const Foo = withStyles(themedStyles, { withTheme: true })(
    class extends React.Component<WithTheme<Theme>> {
      render() {
        return <div style={{ margin: this.props.theme.spacing(1) }} />;
      }
    },
  );
  <Foo />;

  const Bar = withStyles(themedStyles, {
    withTheme: true,
  })(({ theme }: WithStyles<typeof themedStyles, true>) => (
    <div style={{ margin: theme.spacing(1) }} />
  ));
  <Bar />;
}

// Can't use withStyles effectively as a decorator in TypeScript
// due to https://github.com/Microsoft/TypeScript/issues/4881
// @withStyles(styles)
const DecoratedComponent = withStyles(simpleStyles)(
  class extends React.Component<SimpleComponentProps & WithStyles<typeof simpleStyles>> {
    render() {
      const { classes, text } = this.props;
      return <div className={classes.root}>{text}</div>;
    }
  },
);

// no 'classes' property required at element creation time (#8267)
<DecoratedComponent text="foo" />;

// Allow nested pseudo selectors
withStyles((theme) =>
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
  // https://github.com/mui/material-ui/issues/12277

  // typescript thinks `content` is the CSS property not a classname
  const ambiguousStyles = createStyles({
    content: {
      minHeight: '100vh',
    },
    '@media (min-width: 960px)': {
      content: {
        // @ts-expect-error
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
    children?: React.ReactElement<any>;
    inset?: boolean;
    row?: boolean;
  }

  const ListItemContent = withStyles(styles, { name: 'ui-ListItemContent' })(
    ({ children, classes, inset, row }: ListItemContentProps) => (
      <div className={classes.root} color="text.secondary">
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
  // https://github.com/mui/material-ui/issues/11109
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
  // https://github.com/mui/material-ui/issues/11191
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
  // https://github.com/mui/material-ui/issues/11312
  withStyles(simpleStyles, { name: 'MyComponent', index: 0 })(() => <div />);
}

{
  // can't provide own `classes` type
  interface Props {
    classes: number;
  }

  class Component extends React.Component<Props & WithStyles<typeof simpleStyles>> {}
  // @ts-expect-error
  const StyledComponent = withStyles(simpleStyles)(Component);

  // @ts-expect-error implicit FunctionComponent
  withStyles(simpleStyles)((props: Props) => null);
  // @ts-expect-error
  withStyles(simpleStyles)((props: Props & WithStyles<typeof simpleStyles>) => null);
  // @ts-expect-error
  withStyles(simpleStyles)((props: Props & { children?: React.ReactNode }) => null);
  withStyles(simpleStyles)(
    // @ts-expect-error
    (props: Props & WithStyles<typeof simpleStyles> & { children?: React.ReactNode }) => null,
  );

  // explicit not but with "Property 'children' is missing in type 'ValidationMap<Props>'".
  // which is not helpful
  const StatelessComponent: React.FunctionComponent<Props> = function StatelessComponent(props) {
    return null;
  };
  const StatelessComponentWithStyles: React.FunctionComponent<
    Props & WithStyles<typeof simpleStyles>
  > = function StatelessComponentWithStyles(props) {
    return null;
  };
  // @ts-expect-error
  withStyles(simpleStyles)(StatelessComponent);
  // @ts-expect-error
  withStyles(simpleStyles)(StatelessComponentWithStyles);
}

{
  // https://github.com/mui/material-ui/issues/12670
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
  // @ts-expect-error Property 'nonDefaulted' is missing in type '{}'
  const MissingPropUsage = () => <StyledMyButton />;
}

{
  // styles from props
  interface StyleProps {
    color?: 'blue' | 'red';
  }

  const styles = (theme: Theme) => ({
    root: (props: StyleProps) => ({ backgroundColor: props.color || theme.palette.primary.main }),
  });

  interface MyComponentProps extends WithStyles<typeof styles> {
    message: string;
  }

  class MyComponent extends React.Component<MyComponentProps> {
    render() {
      const { classes, color, message } = this.props;
      return (
        <div className={classes.root}>
          {color}: {message}
        </div>
      );
    }
  }

  const StyledMyComponent = withStyles(styles)(MyComponent);
  const renderedStyledMyComponent = <StyledMyComponent message="Hi" />;

  // @ts-expect-error number is not assignable to 'blue' | 'red'
  interface InconsistentProps extends WithStyles<typeof styles> {
    color: number;
  }
}

function ForwardRefTest() {
  const styles = createStyles({
    root: { color: 'red' },
  });

  function Anchor(props: WithStyles<typeof styles>) {
    const { classes } = props;
    return <a className={classes.root} />;
  }
  const StyledAnchor = withStyles(styles)(Anchor);

  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  // forwarded to function components which can't hold refs
  // @ts-expect-error property 'ref' does not exists
  <StyledAnchor ref={anchorRef} />;

  const RefableAnchor = React.forwardRef<HTMLAnchorElement, WithStyles<typeof styles>>(
    (props, ref) => {
      const { classes } = props;
      return <a className={classes.root} />;
    },
  );
  const StyledRefableAnchor = withStyles(styles)(RefableAnchor);

  <StyledRefableAnchor ref={anchorRef} />;
  const buttonRef = React.createRef<HTMLButtonElement>();
  // @ts-expect-error HTMLButtonElement is missing properties
  <StyledRefableAnchor ref={buttonRef} />;
}

{
  // https://github.com/mui/material-ui/pull/15546
  // Update type definition to let CSS properties be functions
  interface TestProps {
    foo: boolean;
  }
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: (prop: TestProps) => (prop.foo ? 100 : 0),
    },
    root2: (prop2: TestProps) => ({
      width: (prop: TestProps) => (prop.foo && prop2.foo ? 100 : 0),
      height: 100,
    }),
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const styles = useStyles({ foo: true });
  expectType<Record<'root' | 'root2', string>, typeof styles>(styles);
}

{
  // If there are no props, use the definition that doesn't accept them
  // https://github.com/mui/material-ui/issues/16198

  const styles = createStyles({
    root: {
      width: 1,
    },
  });
  expectType<
    Record<'root', CSSProperties | CreateCSSProperties | PropsFunc<{}, CreateCSSProperties>>,
    typeof styles
  >(styles);

  const styles2 = createStyles({
    root: () => ({
      width: 1,
    }),
  });
  expectType<
    Record<'root', CSSProperties | CreateCSSProperties | PropsFunc<{}, CreateCSSProperties>>,
    typeof styles2
  >(styles2);

  interface TestProps {
    foo: boolean;
  }

  const styles3 = createStyles({
    root: (props: TestProps) => ({
      width: 1,
    }),
  });
  expectType<
    Record<
      'root',
      | CSSProperties
      | CreateCSSProperties<TestProps>
      | PropsFunc<TestProps, CreateCSSProperties<TestProps>>
    >,
    typeof styles3
  >(styles3);
}
