import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ''}>
      <span {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  rating1: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function HoverRating() {
  const value = 2;
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Side</Typography>
        <div className={classes.rating1}>
          <Rating
            name="hover-side"
            value={value}
            precision={0.5}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
        </div>
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Tooltip</Typography>
        <Rating
          name="hover-tooltip"
          value={value}
          precision={0.5}
          IconContainerComponent={IconContainer}
        />
      </Box>
    </div>
  );
}
