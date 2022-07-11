import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function StickyList() {
  return (
    <Sheet
      sx={{
        bgcolor: 'transparent',
        width: 320,
        maxHeight: 300,
        overflow: 'auto',
      }}
    >
      <List sx={{ '--List-padding': '8px' }}>
        {[...Array(5)].map((_, categoryIndex) => (
          <ListItem nested key={categoryIndex}>
            <ListItem component="div" sticky>
              <Typography
                id={`sticky-list-demo-${categoryIndex}`}
                level="body3"
                textTransform="uppercase"
                fontWeight="lg"
              >
                Category {categoryIndex + 1}
              </Typography>
            </ListItem>
            <List aria-labelledby={`sticky-list-demo-${categoryIndex}`}>
              {[...Array(10)].map((__, index) => (
                <ListItem key={index}>
                  <ListItemButton>Subitem {index + 1}</ListItemButton>
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </Sheet>
  );
}
