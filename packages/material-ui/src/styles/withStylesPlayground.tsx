import * as React from 'react';

import withStyles, { WithStylesAndTheme } from './withStyles';
import { Theme } from '.';
import createStyles from './createStyles';

const baseStyles = createStyles({
  root: {
    fontSize: 5,
  },
  title: {
    borderStyle: 'solid',
  },
});

interface IProps extends WithStylesAndTheme<typeof baseStyles> {
  title: string;
}

function FooWithTheme({ theme, classes, title }: IProps) {
  return (
    <div className={classes.title} title={`theme is here!` + theme.direction}>
      {title}
    </div>
  );
}

// theme and classes are missing here
[<FooWithTheme title={'bla'} />];

const Foo = withStyles(baseStyles, { withTheme: true })(FooWithTheme);

// theme and classes are NOT missing here.
[<Foo title={'bla'} />];


// theme is NOT available, as  withTheme is not true
withStyles(baseStyles, { withTheme: false })((props) => <div>{props.theme.direction}</div>);

// theme IS available, as withTheme is true
withStyles(baseStyles, { withTheme: true })((props) => <div>{props.theme.direction}</div>);

const Foo2  = withStyles(baseStyles, { withTheme: false })(FooWithTheme);
const Foo3  = withStyles(baseStyles)(FooWithTheme);

// theme is mandatory! due to withTheme: false / missing
[<Foo2 title={"title"}/>, <Foo3 title="title" />]
