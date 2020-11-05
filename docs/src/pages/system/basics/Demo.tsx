import * as React from 'react';
import Box, { SxProps } from '@material-ui/core/Box';

type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

interface CardHeaderProps {
  color?: Color;
  sx?: SxProps;
  src?: string;
  alt?: string;
}

const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const imgSize = [60, 90, 90, 120, 150];
  return (
    <Box
      className="CardHeader"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifContent: 'center',
        bgcolor: `${props.color}.main`,
        width: ['100%', '100%', '200px', '300px', '400px'],
        height: ['100px', '200px', '100%', '100%', '100%'],
      }}
    >
      <Box
        {...props}
        component="img"
        sx={{
          border: 2,
          borderColor: 'white',
          display: 'block',
          position: 'relative',
          height: imgSize,
          width: imgSize,
          margin: 'auto',
          borderRadius: '50%',
          ...props.sx,
        }}
      />
    </Box>
  );
};

interface CardContentProps {
  color?: Color;
  header?: string;
  description?: string;
  sx?: SxProps;
}

const CardContent: React.FC<CardContentProps> = (props) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'inline-block',
        px: 1,
        py: 2,
        ...props.sx,
      }}
    >
      <Box
        className="CardContent-header"
        sx={{
          fontSize: [12, 14, 16, 18, 20],
          fontWeight: [400, 400, 400, 500, 600],
          color: `${props.color}.main`,
          my: [1, 1, 2, 2, 2],
        }}
      >
        {props.header}
      </Box>
      <Box
        sx={{
          fontSize: [10, 12, 14, 16, 18],
          fontWeight: [400, 400, 400, 500, 600],
          color: 'grey',
        }}
      >
        {props.description}
      </Box>
    </Box>
  );
};

interface CardProps {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  header?: string;
  description: string;
  sx?: SxProps;
  profileImage?: string;
}

const Card: React.FC<CardProps> = (props) => {
  const {
    color = 'primary',
    profileImage,
    header,
    description,
    sx,
    ...rest
  } = props;
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: ['column', 'column', 'row', 'row', 'row'],
        width: [100, 200, 300, 400, 500],
        border: 1,
        borderColor: 'lightgrey',
        borderRadius: '5px',
        boxShadow: 3,
        minHeight: [150, 100, 200, 300, 300],
        ':hover': {
          '& .CardHeader': {
            bgcolor: `${props.color}.dark`,
          },
          '& .CardContent-header': {
            color: `${props.color}.dark`,
          },
          boxShadow: 6,
        },
        ...sx,
      }}
    >
      <CardHeader color={color} src={profileImage} alt={header} />
      <CardContent color={color} header={header} description={description} />
    </Box>
  );
};

export default function Demo() {
  return (
    <Card
      color="success"
      profileImage="/static/images/cards/contemplative-reptile.jpg"
      header="Contemplative Reptile"
      description="This reptile is thinking about the future of our planet..."
    />
  );
}
