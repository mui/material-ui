import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import {
  CssVarsProvider,
  extendTheme,
  Theme,
  styled,
  ColorPaletteProp,
  VariantProp,
} from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Radio from '@mui/joy/Radio';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import RadioGroup from '@mui/joy/RadioGroup';
import { TabsUnstyled, TabsListUnstyled, TabUnstyled } from '@mui/base';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const StyledTabs = styled('div')({
  position: 'relative',
  zIndex: 1,
});
const StyledTabList = styled('div')({
  display: 'flex',
});
const StyledTab = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  minHeight: 40,
  border: 'none',
  borderBottom: '2px solid transparent',
  background: 'transparent',
  outline: 'none',
  '&.Mui-selected': {
    borderBottomColor: theme.vars.palette.primary[500],
    color: theme.vars.palette.primary.plainColor,
  },
  '&.Mui-focusVisible': theme.focus.default,
}));

const rootTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-neutral-50)',
        },
      },
    },
  },
});

export default function VariantStudio() {
  const [selectedVariant, setVariant] = React.useState<VariantProp>('outlined');
  const [selectedColor, setColor] = React.useState<ColorPaletteProp>('primary');
  const props = { variant: selectedVariant, color: selectedColor };
  const components = [
    { name: 'Avatar', element: <Avatar {...props}>AB</Avatar> },
    {
      name: 'Badge',
      element: (
        <Badge badgeContent="99+" {...props}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'background.level3' }} />
        </Badge>
      ),
    },
    {
      name: 'Button',
      element: (
        <Button {...props} endIcon={<KeyboardArrowRight />}>
          Button
        </Button>
      ),
    },
    {
      name: 'Card',
      element: (
        <Card {...props}>
          <Typography level="inherit" fontSize="md" fontWeight="md">
            Yosemite National Park
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5 }}>
            California
          </Typography>
        </Card>
      ),
    },
    {
      name: 'Checkbox',
      element: (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Checkbox {...props} checked={false} label="unchecked" />
          <Checkbox {...props} checked label="checked" />
        </Box>
      ),
    },
    {
      name: 'Chip',
      element: (
        <Chip {...props} onClick={() => {}} startDecorator={<FavoriteBorder />}>
          Light
        </Chip>
      ),
    },
    {
      name: 'IconButton',
      element: (
        <IconButton {...props}>
          <FavoriteBorder />
        </IconButton>
      ),
    },
    {
      name: 'Input',
      element: <Input placeholder="Placeholder" {...props} />,
    },
    {
      name: 'Link',
      element: <Link {...props}>Link</Link>,
    },
    {
      name: 'List',
      element: (
        <List {...props} sx={{ mx: 2, '--List-padding': '8px', '--List-gap': '4px' }}>
          <ListItem {...props}>Item 1</ListItem>
          <ListItem {...props}>Item 2</ListItem>
        </List>
      ),
    },
    {
      name: 'ListItemButton',
      element: (
        <List sx={{ mx: 2 }}>
          <ListItemButton {...props}>Button</ListItemButton>
        </List>
      ),
    },
    {
      name: 'Radio',
      element: (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Radio {...props} checked={false} label="unchecked" />
          <Radio {...props} checked label="checked" />
        </Box>
      ),
    },
    {
      name: 'Switch',
      element: <Switch {...props} />,
    },
    {
      name: 'Typography',
      element: <Typography {...props}>Text</Typography>,
    },
  ];
  return (
    <CssVarsProvider theme={rootTheme}>
      <GlobalStyles
        styles={(theme: Theme) => ({
          body: {
            backgroundColor: theme.vars.palette.background.body,
            margin: 0,
          },
          '*': {
            boxSizing: 'border-box',
          },
        })}
      />
      <Container>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box sx={{ flexGrow: 1 }}>
            <Sheet
              sx={(theme) => ({
                pt: 3,
                position: 'sticky',
                top: 0,
                zIndex: 1,
                boxShadow: `0 0 0 calc(50vmax - 1px) ${theme.vars.palette.background.surface}`,
                clipPath: 'inset(0px -50vmax)',
              })}
            >
              <Typography level="h1" fontSize="lg" mb={2}>
                ⚡️ Variant Studio
              </Typography>
              <TabsUnstyled
                component={StyledTabs}
                value={selectedVariant}
                onChange={(event, value) => setVariant(value as VariantProp)}
              >
                <TabsListUnstyled component={StyledTabList}>
                  <TabUnstyled component={StyledTab} value="plain">
                    Plain
                  </TabUnstyled>
                  <TabUnstyled component={StyledTab} value="outlined">
                    Outlined
                  </TabUnstyled>
                  <TabUnstyled component={StyledTab} value="soft">
                    Soft
                  </TabUnstyled>
                  <TabUnstyled component={StyledTab} value="solid">
                    Solid
                  </TabUnstyled>
                </TabsListUnstyled>
              </TabsUnstyled>
              <Box
                sx={(theme) => ({
                  mt: '-1px',
                  height: '1px',
                  bgcolor: 'divider',
                  boxShadow: `0 0 0 calc(50vmax - 1px) ${theme.vars.palette.divider}`,
                  clipPath: 'inset(0px -50vmax)',
                })}
              />
            </Sheet>
            <RadioGroup
              row
              size="sm"
              value={selectedColor}
              onChange={(event) => setColor(event.target.value as ColorPaletteProp)}
              sx={{ p: 2, '--RadioGroup-gap': '1rem' }}
            >
              <Radio label="Primary" value="primary" />
              <Radio label="Neutral" value="neutral" />
              <Radio label="Danger" value="danger" />
              <Radio label="Info" value="info" />
              <Radio label="Success" value="success" />
              <Radio label="Warning" value="warning" />
            </RadioGroup>
            <Sheet
              sx={{
                my: 3,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gridAutoRows: 'minmax(120px, auto)',
                borderWidth: '1px 0px 0px 1px',
                borderStyle: 'solid',
                borderColor: 'divider',
                '& > div': {
                  borderWidth: '0 1px 1px 0',
                  borderStyle: 'solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  pt: 4,
                  pb: 1,
                },
              }}
            >
              {components.map((item) => (
                <div key={item.name}>
                  <Chip
                    variant="soft"
                    color="neutral"
                    size="sm"
                    sx={{
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                      borderRadius: 0,
                      fontSize: 'xs2',
                    }}
                  >
                    {item.name}
                  </Chip>
                  {item.element}
                </div>
              ))}
            </Sheet>
          </Box>
          <Box sx={{ zIndex: 1, flexBasis: '343px', p: 1, minHeight: '100vh' }}>
            <Sheet variant="outlined" sx={{ borderRadius: 'sm', boxShadow: 'sm', height: '100%' }}>
              test
            </Sheet>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, py: 5, justifyContent: 'center' }}>
          <Typography>This screen is too small to render the studio.</Typography>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
