import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
  },
  input: {
    margin: 10,
  },
  large: {
    width: 300,
  },
};

// type Props = {
//  classes: Object,
//  theme?: Object,
// };

class Inputs extends React.Component {
  componentDidMount() {
    this.focusInput.focus();
  }

  focusInput = null;

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <Input value="Hello world" className={classes.input} />
          <Input placeholder="Placeholder" className={classes.input} />
          <Input value="Disabled" className={classes.input} disabled />
          <Input error value="Error" className={classes.input} />
          <Input
            value="Focused"
            inputRef={node => {
              this.focusInput = node;
            }}
            className={classes.input}
          />
        </div>
        <Input value="Large input" className={classNames(classes.input, classes.large)} />
      </div>
    );
  }
}

Inputs.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Inputs);
