import * as React from 'react';
import Typography, { TypographyProps } from '../../src/Typography/Typography';
import { withStyles, WithStyles } from '../../src/styles';

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    backgroundColor: palette.background,
    color: palette.primary,
  },
}));

interface Props {
  text: string;
  type: TypographyProps['type'];
  color: TypographyProps['color'];
}

const DecoratedSFC = decorate<Props>(({ text, type, color, classes }) => (
  <Typography type={type} color={color} classes={classes}>
    {text}
  </Typography>
));

const DecoratedClass = decorate(
  class extends React.Component<Props & WithStyles<'root'>> {
    render() {
      const { text, type, color, classes } = this.props;
      return (
        <Typography type={type} color={color} classes={classes}>
          {text}
        </Typography>
      );
    }
  },
);

const DecoratedNoProps = decorate<{}>(
  class extends React.Component<WithStyles<'root'>> {
    render() {
      return <Typography classes={this.props.classes}>Hello, World!</Typography>;
    }
  },
);

const sfcElem = <DecoratedSFC text="Hello, World!" type="title" color="secondary" />;
const classElem = <DecoratedClass text="Hello, World!" type="title" color="secondary" />;
const noPropsElem = <DecoratedNoProps />;
