import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Home from '@mui/icons-material/Home';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function VariantsColorsList() {
  return (
    <JoyUsageDemo
      componentName="ListItemButton"
      data={[
        {
          propName: 'variant',
          knob: 'select',
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
          defaultValue: true,
          codeBlockDisplay: true,
        },
      ]}
      renderDemo={(props) => (
        <Sheet variant="outlined" sx={{ my: 5, width: 200, borderRadius: 'sm' }}>
          <List>
            <ListItem>
              <ListItemButton {...props}>
                <ListItemDecorator>
                  <Home />
                </ListItemDecorator>
                <ListItemContent>Home</ListItemContent>
                <KeyboardArrowRight fontSize="md" />
              </ListItemButton>
            </ListItem>
          </List>
        </Sheet>
      )}
    />
  );
}
