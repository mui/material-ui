import * as React from 'react';
import Typography, { TypographyProps } from '../../src/Typography/Typography';
import { withStyles, WithStyles } from '../../src/styles';

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.dark,
  },
}));

interface Props {
  color: TypographyProps['color'];
  text: string;
  variant: TypographyProps['variant'];
}

const DecoratedSFC = decorate<Props>(({ text, variant, color, classes }) => (
  <Typography variant={variant} color={color} classes={classes}>
    {text}
  </Typography>
));

const DecoratedClass = decorate(
  class extends React.Component<Props & WithStyles<'root'>> {
    render() {
      const { text, variant, color, classes } = this.props;
      return (
        <Typography variant={variant} color={color} classes={classes}>
          {text}
        </Typography>
      );
    }
  },
);

const DecoratedNoProps = decorate(
  class extends React.Component<WithStyles<'root'>> {
    render() {
      return <Typography classes={this.props.classes}>Hello, World!</Typography>;
    }
  },
);

const sfcElem = <DecoratedSFC text="Hello, World!" variant="title" color="secondary" />;
const classElem = <DecoratedClass text="Hello, World!" variant="title" color="secondary" />;
const noPropsElem = <DecoratedNoProps />;

interface Book {
  category: 'book';
  author: string;
}

interface Painting {
  category: 'painting';
  artist: string;
}

type ArtProps = Book | Painting;

const DecoratedUnionProps = decorate<ArtProps>( // <-- without the type argument, we'd get a compiler error!
  class extends React.Component<ArtProps & WithStyles<'root'>> {
    render() {
      const props = this.props;
      return (
        <Typography classes={props.classes}>
          {props.category === 'book' ? props.author : props.artist}
        </Typography>
      );
    }
  },
);

const unionPropElem = <DecoratedUnionProps category="book" author="Twain, Mark" />;
