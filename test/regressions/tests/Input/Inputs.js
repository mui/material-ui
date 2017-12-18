<<<<<<< c5a2837d08aab348025bc599aeba443c193b4412
import React from 'react';
import PropTypes from 'prop-types';
=======
import React, { Component } from 'react';
<<<<<<< 5ae7d1666744bb195932606894cf22b6dd8ad0af
>>>>>>> wip trying test:unit
=======
import PropTypes from 'prop-types';
>>>>>>> expand tsc to all of test
import classNames from 'classnames';
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

<<<<<<< 5ae7d1666744bb195932606894cf22b6dd8ad0af
class Inputs extends React.Component {
=======
// type Props = {
//  classes: Object,
//  theme?: Object,
// };

class Inputs extends Component {
>>>>>>> expand tsc to all of test
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
<<<<<<< 5ae7d1666744bb195932606894cf22b6dd8ad0af
  classes: PropTypes.object.isRequired,
=======
  classes: PropTypes.object,
>>>>>>> expand tsc to all of test
};

export default withStyles(styles)(Inputs);
