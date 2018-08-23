import * as React from 'react';
import { Grid } from '@material-ui/core';
import { Theme, createStyles } from '@material-ui/core/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.common.black,
    },
  });

interface HelloProps extends WithWidth, WithStyles<typeof styles> {
  name?: string;
}

export class Hello extends React.Component<HelloProps> {
  static defaultProps = {
    name: 'Alex',
  };

  render() {
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
