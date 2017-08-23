import * as React from 'react';
import { withStyles, StyleRules } from 'material-ui/styles';
import { Theme } from 'material-ui/styles/theme';

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

interface StyledComponentProps {
  text: string;
}

const Component: React.SFC<
  StyledComponentProps & { classes: StyledComponentClassNames }
> = ({ classes, text }) =>
  <div className={classes.root}>
    {text}
  </div>;

const StyledComponent = withStyles<
  StyledComponentProps,
  StyledComponentClassNames
>(styles)(Component);

<StyledComponent text="I am styled!" />;

// Also works with a plain object

const stylesAsPojo: StyleRules = {
  root: {
    background: 'hotpink',
  },
};

const AnotherStyledComponent = withStyles<{}, StyledComponentClassNames>({
  root: { background: 'hotpink' },
})(({ classes }) => <div className={classes.root}>Stylish!</div>);
