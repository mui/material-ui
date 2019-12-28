import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

function getLabelText(value) {
  return `${value} Heart${value !== 1 ? 's' : ''}`;
}

const customSatisfacitonIcons = {
  1: <SentimentVeryDissatisfiedIcon />,
  2: <SentimentDissatisfiedIcon />,
  3: <SentimentSatisfiedIcon />,
  4: <SentimentSatisfiedAltIcon />,
  5: <SentimentVerySatisfiedIcon />,
};

function SentimentIconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customSatisfacitonIcons[value]}</span>;
}

SentimentIconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const VariableSizeRating = withStyles(theme => ({
  label: {
    margin: theme.spacing(0.75),
    alignSelf: 'flex-end',
  },
}))(Rating);

function VariableSizeIconContainer(props) {
  const { value, ...other } = props;
  return (
    <span {...other}>
      <FavoriteIcon style={{ fontSize: (value * value) / 2 }} />
    </span>
  );
}

VariableSizeIconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CustomizedRatings() {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Custom empty icon</Typography>
        <Rating
          name="customized-empty"
          value={2}
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Custom icon and color</Typography>
        <StyledRating
          name="customized-color"
          value={2}
          getLabelText={getLabelText}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
        />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">10 stars</Typography>
        <Rating name="customized-10" value={2} max={10} />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Custom icon set</Typography>
        <Rating
          name="custom-satisfaction-icon-set"
          value={2}
          max={Object.keys(customSatisfacitonIcons).length}
          IconContainerComponent={SentimentIconContainer}
        />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Custom icon sizes</Typography>
        <VariableSizeRating
          name="variable-size-rating"
          value={4}
          max={5}
          IconContainerComponent={VariableSizeIconContainer}
        />
      </Box>
    </div>
  );
}
