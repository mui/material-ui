/**
 * Created by zabieru on 6/23/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ToggleButton from 'material-ui/ToggleButton';
import {Option} from 'material-ui/ToggleButton'
import Icon from 'material-ui/Icon'

const styleSheet = createStyleSheet('NormalToggleButton', {
  root: {
    width: '100%',
  },
});

function ToggleIcon(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <ToggleButton toggleIcons={true} >
        <Option
          icon={<Icon className="material-icons">mood</Icon>}
          value="1"
        />
        <Option
          icon={<Icon className="material-icons">mood_bad</Icon>}
          value="1"
        />
        <Option
          icon={<Icon className="material-icons">whatshot</Icon>}
          value="3"
        />
      </ToggleButton>
    </div>
  );
}

ToggleIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ToggleIcon);
