import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Done from '@mui/icons-material/Done';

export default function ExampleChoiceChipCheckbox() {
  const [value, setValue] = React.useState([]);
  return (
    <Sheet variant="outlined" sx={{ width: 360, p: 2, borderRadius: 'sm' }}>
      <Typography id="rank" level="body-sm" sx={{ fontWeight: 'lg', mb: 1.5 }}>
        Choose amenities
      </Typography>
      <div role="group" aria-labelledby="rank">
        <List
          orientation="horizontal"
          wrap
          sx={{
            '--List-gap': '8px',
            '--ListItem-radius': '20px',
            '--ListItem-minHeight': '32px',
            '--ListItem-gap': '4px',
          }}
        >
          {['Elevator', 'Washer/Dryer', 'Fireplace', 'Dogs ok', 'Cats ok'].map(
            (item, index) => (
              <ListItem key={item}>
                {value.includes(item) && (
                  <Done
                    fontSize="md"
                    color="primary"
                    sx={{ ml: -0.5, zIndex: 2, pointerEvents: 'none' }}
                  />
                )}

                <Checkbox
                  size="sm"
                  disabled={index === 0}
                  disableIcon
                  overlay
                  label={item}
                  checked={value.includes(item)}
                  variant={value.includes(item) ? 'soft' : 'outlined'}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setValue((val) => [...val, item]);
                    } else {
                      setValue((val) => val.filter((text) => text !== item));
                    }
                  }}
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: checked
                        ? {
                            border: '1px solid',
                            borderColor: 'primary.500',
                          }
                        : {},
                    }),
                  }}
                />
              </ListItem>
            ),
          )}
        </List>
      </div>
    </Sheet>
  );
}
