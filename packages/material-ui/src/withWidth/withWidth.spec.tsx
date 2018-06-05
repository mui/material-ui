import * as React from 'react';
import { Grid } from '..';
import { Theme, createStyles } from '../styles';
import withStyles, { WithStyles } from '../styles/withStyles';
import withWidth, { WithWidthProps } from '../withWidth';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.common.black,
    },
  });

interface IHelloProps extends WithWidthProps, WithStyles<typeof styles> {
  name?: string;
}

export class Hello extends React.Component<IHelloProps> {
  public static defaultProps = {
    name: 'Alex',
  };

  public render() {
    return (
      <Grid
        className={this.props.classes.root}
        direction={this.props.width === 'sm' ? 'column' : 'row'}
      >
        <h1>Hello {this.props.name}!</h1>
      </Grid>
    );
  }
}

const Decorated = withWidth()(withStyles(styles)(Hello));

<Decorated name="Bob" />;

const WidthSFC = withWidth()<{
  // shouldn't need to specify width here; it's a given
  name: string;
}>(({ width, name }) => <div style={{ width }}>hello, {name}</div>);

<WidthSFC name="Hortense" />;
