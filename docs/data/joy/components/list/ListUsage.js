import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import JoyUsageDemo, {
  prependLinesSpace,
} from 'docs/src/modules/components/JoyUsageDemo';

export default function ListUsage() {
  return (
    <JoyUsageDemo
      componentName="ListItemButton"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          options: ['plain', 'outlined', 'soft', 'solid'],
          defaultValue: 'plain',
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'selected',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'children',
          defaultValue: `<ListItemDecorator><Home /></ListItemDecorator>
  <ListItemContent>Home</ListItemContent>
  <KeyboardArrowRight />`,
        },
      ]}
      getCodeBlock={(code) => `<List>
  <ListItem>
${prependLinesSpace(code, 3)}
  </ListItem>
</List>`}
      renderDemo={(props) => (
        <List sx={{ width: 240, my: 5 }}>
          <ListItem>
            <ListItemButton {...props}>
              <ListItemDecorator>
                <HomeRoundedIcon />
              </ListItemDecorator>
              <ListItemContent>Home</ListItemContent>
              <KeyboardArrowRight />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton {...props}>
              <ListItemDecorator>
                <ShoppingCartRoundedIcon />
              </ListItemDecorator>
              <ListItemContent>Orders</ListItemContent>
              <KeyboardArrowRight />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    />
  );
}
