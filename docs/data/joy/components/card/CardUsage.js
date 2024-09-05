import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { CardActions, CardContent } from '@mui/joy';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function CardUsage() {
  return (
    <JoyUsageDemo
      componentName="Card"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'orientation',
          knob: 'radio',
          defaultValue: 'vertical',
          options: ['vertical', 'horizontal'],
        },
        { propName: 'invertedColors', knob: 'switch' },
      ]}
      renderDemo={(props) => (
        <Card {...props} sx={{ m: 1, mb: 4, maxWidth: 350 }}>
          <AspectRatio ratio="16/9">
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent>
            <Typography level="body-xs">NATIONAL PARK</Typography>
            <Typography
              level="title-lg"
              component="div"
              sx={{ textWrap: 'balance' }}
            >
              Yosemite - Your Next Adventure
            </Typography>
            <Typography>
              {"Yosemite National Park is in California's Sierra Nevada mountains."}
            </Typography>
            <CardActions>
              <Button fullWidth variant="outlined" size="sm">
                Add to list
              </Button>
              <Button fullWidth size="sm">
                Explore
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      )}
    />
  );
}
