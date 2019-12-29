import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
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

function getLabelText(value: number) {
  return `${value} Heart${value !== 1 ? 's' : ''}`;
}

const customSatisfactionIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function getCustomLabelText(value: number) {
  const { label } = customSatisfactionIcons[value];
  return `${label}`;
}

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  const { icon } = customSatisfactionIcons[value];
  return <span {...other}>{icon}</span>;
}

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
          getLabelText={getCustomLabelText}
          IconContainerComponent={IconContainer}
          max={Object.keys(customSatisfactionIcons).length}
          name="custom-satisfaction-icon-set"
          value={2}
        />
      </Box>
    </div>
  );
}
