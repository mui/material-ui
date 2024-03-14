import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';

export default function NestedVariables() {
  return (
    <CssVarsProvider>
      <List
        sx={(theme) => ({
          ...theme.variants.outlined.neutral,
          bgcolor: 'background.level3',
          '--List-radius': '16px',
          '--List-padding': '8px',
          '--List-gap': '4px',
          '& > li [role="button"]': {
            bgcolor: 'background.surface',
          },
        })}
      >
        <ListItem>
          <ListItemButton>Item 1</ListItemButton>
        </ListItem>
        <ListItem nested>
          <ListItem>
            <ListItemButton>Item 2</ListItemButton>
          </ListItem>
          <List
            sx={{
              '& > li [role="button"]': {
                bgcolor: 'background.level2',
              },
            }}
          >
            <ListItem>
              <ListItemButton>Item 2.1</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>Item 2.2</ListItemButton>
            </ListItem>
            <ListItem nested>
              <ListItemButton>Item 2.3</ListItemButton>
              <List
                sx={{
                  '& > li [role="button"]': {
                    bgcolor: 'background.level1',
                  },
                }}
              >
                <ListItem>
                  <ListItemButton>Item 2.3.1</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Item 2.3.2</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Item 2.3.3</ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <ListItemButton>Item 3</ListItemButton>
        </ListItem>
      </List>
    </CssVarsProvider>
  );
}
