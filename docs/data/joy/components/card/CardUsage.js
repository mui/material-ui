import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import { CardActions, CardContent } from '@mui/joy';

export default function CardUsage() {
  return (
    <JoyUsageDemo
      componentName="Card"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'plain',
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
        <Card
          {...props}
          sx={{
            m: 1,
            mb: 4,
          }}
        >
          <AspectRatio ratio="16/9" sx={{ width: 160 }}>
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent>
            <Typography fontWeight="lg" textColor="inherit">
              Yosemite
            </Typography>
            <Typography level="body2">April 24 to May 02, 2021</Typography>
            <CardActions>
              <Button size="sm">Explore</Button>
            </CardActions>
          </CardContent>
        </Card>
      )}
    />
  );
}
