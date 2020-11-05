import * as React from 'react';
import Box from '@material-ui/core/Box';

const CardHeader = (props) => {
  const imgSize = [60, 90, 90, 120, 150];
  return <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifContent: 'center',
      bgcolor: `${props.color}.main`,
      color: `${props.color}.contrastText`,
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
}

const CardContent = (props) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'inline-block',
        px:1,
        py: 2,
        ...props.sx,
      }}
    >
      <Box 
        sx={{
          fontSize: [12, 14, 16, 18, 20],
          fontWeight: [400, 400, 400, 500, 600],
          color: `${props.color}.main`,
          my: [1, 1, 2, 2, 2],
        }}
      >
        {props.header}
      </Box>
      <Box sx={{ fontSize: [10, 12, 14, 16, 18], fontWeight: [400, 400, 400, 500, 600], color: 'grey' }}>
        {props.description}
      </Box>
    </Box>
  );
}

const Card = (props) => {
  return (<Box 
    {...props} 
    sx={{
      display: 'flex',
      flexDirection: ['column', 'column', 'row', 'row', 'row'],
      width: [100, 200, 300, 400, 500],
      border: 1,
      borderColor: 'lightgrey',
      borderRadius: '5px',
      minHeight: [150, 100, 200, 300, 300],
      ...props.sx, 
    }}
  >
    <CardHeader color={props.color || 'primary'} src={props.profileImage} alt={props.header} />
    <CardContent color={props.color || 'primary'} header={props.header} description={props.description} />
  </Box>
  )
}

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
