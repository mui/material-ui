import * as React from 'react';
import { Theme } from '@material-ui/core';
import { AppBarProps } from '@material-ui/core/AppBar';
import { createStyles, makeStyles } from '@material-ui/styles';

// makeStyles
{
  interface StyleProps {
    color?: 'blue' | 'red';
  }

  const styles = (theme: Theme) =>
    createStyles({
      root: (props: StyleProps) => ({
        backgroundColor: props.color || theme.palette.primary.main,
      }),
    });
  const useMyStyles = makeStyles(styles);

  interface MyComponentProps extends StyleProps {
    message: string;
  }

  const MyComponent = (props: MyComponentProps) => {
    const { color, message } = props;
    // @ts-expect-error Expected 1 argument, but got 0
    const emptyClasses = useMyStyles();
    const classes = useMyStyles(props);
    // @ts-expect-error
    const invalidClasses = useMyStyles({ colourTypo: 'red' });
    // @ts-expect-error
    const undefinedClassName = classes.toot;

    return (
      <div className={classes.root}>
        {color}: {message}
      </div>
    );
  };

  // testing options
  makeStyles(styles, {
    flip: true,
    name: 'some-sheet',
    generateId: (_, sheet) => (sheet ? sheet.classes.root : 'no-sheet'),
  });
  makeStyles(styles, {
    // rules are added at runtime so no compile time error
    generateId: (_, sheet) => (sheet ? sheet.classes.toot : 'no-sheet'),
  });

  // optional props
  const useWithoutProps = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        background: 'none',
      },
    }),
  );
  const chartStyles = {
    chart: {
      width: '100%',
      height: 70,
      backgroundColor: '#f9f9f9',
    },
  };
  const useChartClasses = makeStyles(chartStyles);
  const NoPropsComponent = () => {
    const classes = useWithoutProps();
    const chartClasses = useChartClasses();
    const alsoClasses = useWithoutProps(5);
  };

  // unsafe any props make the param optional
  const useUnsafeProps = makeStyles(
    createStyles({
      root: (props: any) => ({
        backgroundColor: props.deep.color,
      }),
    }),
  );

  const UnsafeProps = (props: StyleProps) => {
    // would be nice to have at least a compile time error because we forgot the argument
    const classes = useUnsafeProps(); // runtime: Can't read property color of undefined
    // but this would pass anyway
    const alsoClasses = useUnsafeProps(undefined); // runtime: Can't read property color of undefined
  };

  // default theme
  interface CustomTheme {
    attribute: number;
    [key: string]: any;
  }

  const validCustomTheme = { attribute: 8, otherStuff: true };
  const invalidCustomTheme = { otherStuff: true };

  const style = (theme: CustomTheme) =>
    createStyles({
      root: {
        margin: theme.attribute,
      },
    });

  makeStyles(style, {
    defaultTheme: validCustomTheme,
  });

  makeStyles(style, {
    // @ts-expect-error
    defaultTheme: invalidCustomTheme,
  });

  // Use styles with props and theme without createStyles
  makeStyles((theme: Theme) => ({
    root: (props: StyleProps) => ({
      background: props.color,
      color: theme.palette.primary.main,
    }),
  }));

  {
    // If any generic is provided, inferrence breaks.
    // If the proposal https://github.com/Microsoft/TypeScript/issues/26242 goes through, we can fix this.
    const useStyles = makeStyles<Theme>((theme) => ({
      root: {
        background: 'blue',
      },
    }));

    const classes = useStyles();

    // This doesn't fail, because inferrence is broken
    classes.other;
  }
}
