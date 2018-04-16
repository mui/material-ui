import * as React from 'react';
import { Omit } from '../../src';
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

// This is the "scenario 2" example straight from the doc, then invoked:

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

//FAILS!!!
const unionPropElem = <DecoratedUnionProps category="book" author="Twain, Mark" />;

//////
// Here's the same thing, using withStyles directly, for clarity:

class UnstyledUnion extends React.Component<ArtProps & WithStyles<'root'>> {
  render() {
    const props = this.props;
    return (
      <Typography classes={props.classes}>
        {props.category === 'book' ? props.author : props.artist}
      </Typography>
    );
  }
}

const StyledUnion = withStyles({ root: { left: 0 } })<ArtProps>(UnstyledUnion);
const styledUnion = <StyledUnion category="book" author="Twain, Mark" />;

// This gives a clear error message, showing what's going on underneath

type StyleRemoved = Omit<ArtProps & WithStyles<'root'>, keyof WithStyles<'root'>>;
const styleRemoved: StyleRemoved = { category: 'book', author: 'x' };

// Remove the union, and all works:

type Confederacy = Omit<Book & WithStyles<'root'>, keyof WithStyles<'root'>>;

// Plan B: require wrapping of unions

interface WrappedArtProps {
  artProp: Book | Painting;
}

const DecoratedWrappedArtProps = decorate<WrappedArtProps>( // <-- without the type argument, we'd get a compiler error!
  class extends React.Component<WrappedArtProps & WithStyles<'root'>> {
    render() {
      const props = this.props;
      return (
        <Typography classes={props.classes}>
          {props.artProp.category === 'book' ? props.artProp.author : props.artProp.artist}
        </Typography>
      );
    }
  },
);

const decoratedWrappedArtProps = (
  <DecoratedWrappedArtProps artProp={{ category: 'book', author: 'Twain, Mark' }} />
);
