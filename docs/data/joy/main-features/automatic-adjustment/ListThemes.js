import * as React from 'react';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { BrandingProvider } from '@mui/docs/branding';

export default function ListThemes() {
  const [preset, setPreset] = React.useState('');
  const rootPresets = {
    dense: {
      '--ListItem-minHeight': '27px',
      '--ListItemDecorator-size': '28px',
      '--ListItem-radius': '5px',
      '--List-gap': '5px',
      '--List-padding': '10px',
      '--ListItem-paddingLeft': '5px',
      '--ListItem-paddingRight': '5px',
      '--ListItem-paddingY': '0px',
      '--List-nestedInsetStart': '28px',
      fontSize: '14px',
    },
    cozy: {
      '--List-radius': '20px',
      '--ListItem-minHeight': '44px',
      '--List-padding': '8px',
      '--List-gap': '8px',
      '--List-nestedInsetStart': 'var(--ListItemDecorator-size)',
    },
  };
  const nestedPresets = {
    dense: {
      '--List-nestedInsetStart': '0px',
    },
  };
  return (
    <Box
      sx={{
        m: -1.5,
        mt: 0.5,
        flexGrow: 1,
        maxWidth: 'calc(100% + 24px)',
        borderRadius: '8px',
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'xs',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
        <Box sx={{ m: 'auto' }}>
          <List variant="outlined" sx={{ ...rootPresets[preset] }}>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <ToggleOffRoundedIcon />
                </ListItemDecorator>
                Menu item 1
              </ListItemButton>
            </ListItem>
            <ListItem nested>
              <ListItemButton id="category-1">
                <ListItemDecorator>
                  <ArticleRoundedIcon />
                </ListItemDecorator>
                Menu item 2
              </ListItemButton>
              <List
                aria-labelledby="category-1"
                sx={preset ? nestedPresets[preset] : {}}
              >
                <ListItem>
                  <ListItemButton>Menu item 2.1</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Menu item 2.2</ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            mx: 'auto',
            pt: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormLabel htmlFor="list-theme">Change the preset:</FormLabel>
          <Select
            size="sm"
            slotProps={{
              button: {
                id: 'list-theme',
              },
            }}
            value={preset}
            onChange={(event, newValue) => setPreset(newValue)}
            sx={{ minWidth: 160 }}
          >
            <Option value="">Default</Option>
            <Option value="dense">Dense</Option>
            <Option value="cozy">Cozy</Option>
          </Select>
        </Box>
      </Box>
      {
        <BrandingProvider mode="dark">
          <HighlightedCode
            code={`// The code is shorten to show only the markup and the sx value.
<List${
              preset
                ? `
  sx={{  ${JSON.stringify(rootPresets[preset], null, 4)
    .replace('{', '')
    .replace('}', '')
    .trim()}
  }}
`
                : ''
            }>
  <ListItem nested>
    <ListItemButton>...</ListItemButton>
    <List${
      nestedPresets[preset]
        ? `
      sx={{      ${JSON.stringify(nestedPresets[preset], null, 8)
        .replace('{', '')
        .replace('}', '')
        .trim()}
      }}
    `
        : ''
    }>
      <ListItem nested>
        <ListItemButton>...</ListItemButton>
        <List>
          <ListItem>...</ListItem>
          <ListItem>...</ListItem>
        </List>
      </ListItem>
      <ListItem>...</ListItem>
      <ListItem>...</ListItem>
    </List>
  </ListItem>
  <ListItem>...</ListItem>
</List>
`}
            copyButtonHidden
            language="jsx"
            sx={{ display: { xs: 'none', md: 'block' }, borderRadius: '7px' }}
          />
        </BrandingProvider>
      }
    </Box>
  );
}
