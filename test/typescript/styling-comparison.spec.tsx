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
  variant: TypographyProps['variant'];
  color: TypographyProps['color'];
}

const DecoratedSFC = decorate<Props>(({ text, variant, color, classes }) => (
  <Typography  variant={variant} color={color} classes={classes}>
    {text}
  </Typography>
));

const DecoratedClass = decorate(
  class extends React.Component<Props & WithStyles<'root'>> {
    render() {
      const { text, variant, color, classes } = this.props;
      return (
        <Typography  variant={variant} color={color} classes={classes}>
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

const sfcElem = <DecoratedSFC text="Hello, World!" variant="title" color="secondary" />;
const classElem = <DecoratedClass text="Hello, World!" variant="title" color="secondary" />;
const noPropsElem = <DecoratedNoProps />;
