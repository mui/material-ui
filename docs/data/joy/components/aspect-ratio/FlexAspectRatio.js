import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';

export default function FlexAspectRatio() {
  const [flex, setFlex] = React.useState(false);
  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <FormControl orientation="horizontal">
        <FormLabel>Flex</FormLabel>
        <Switch checked={flex} onChange={(event) => setFlex(event.target.checked)} />
      </FormControl>
      <Card
        orientation="horizontal"
        variant="outlined"
        sx={{ boxShadow: 'none', resize: 'horizontal', overflow: 'auto' }}
      >
        <AspectRatio ratio="21/9" flex={flex} sx={{ flexBasis: 200 }}>
          <Typography level="h1" component="div">
            21 / 9
          </Typography>
        </AspectRatio>
        <CardContent>
          <Typography level="body-xs">20 APR 2023</Typography>
          <Typography level="title-lg" component="div">
            Widget Title
          </Typography>
          <Typography level="body-lg">
            Lorem ipsum is placeholder text commonly used in the graphic.
          </Typography>
          <CardActions buttonFlex="none">
            <Button variant="outlined" color="neutral" size="sm">
              See details
            </Button>
            <Button variant="solid" color="neutral" size="sm">
              Learn more
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Stack>
  );
}
