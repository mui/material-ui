import * as React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { Theme } from 'material-ui/styles/theme';



const stylesheet = createStyleSheet(({ palette, spacing }: Theme) => ({
  root: {
    padding: spacing.unit,
    background: palette.background,
    color: palette.primary
  }
}));


interface StyledComponentClassNames {
  root: string;
}

interface StyledComponentProps {
  text: string;
}

const Component: React.SFC<StyledComponentProps & { classes: StyledComponentClassNames }> =
  ({ classes, text }) =>
    <div className={classes.root}>{text}</div>

const StyledComponent = withStyles<StyledComponentProps, StyledComponentClassNames>(stylesheet)(Component);

<StyledComponent text="I am styled!"/>