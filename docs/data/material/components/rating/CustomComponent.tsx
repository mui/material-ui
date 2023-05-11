import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
  '& .MuiRating-icon': {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}));

const customIcons: {
  [index: string]: {
    img: string;
    alt: string;
  };
} = {
  1: {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    alt: 'Breakfast',
  },
  2: {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    alt: 'Burger',
  },
  3: {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    alt: 'Camera',
  },
  4: {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    alt: 'Coffee',
  },
  5: {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    alt: 'Hats',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, isFilled, ...other } = props;
  return (
    <span {...other}>
      <img
        src={customIcons[value].img}
        style={{ objectFit: 'cover', filter: isFilled ? 'none' : 'grayscale(1)' }}
        width={40}
        height={40}
        alt={customIcons[value].alt}
      />
    </span>
  );
}

export default function CustomComponent() {
  return (
    <StyledRating
      name="custom-component"
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].alt}
    />
  );
}
