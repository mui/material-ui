import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {
  CssBaseline,
  Sheet,
  Box,
  Alert,
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Checkbox,
  Chip,
  ChipDelete,
  CircularProgress,
  Divider,
  IconButton,
  Input,
  LinearProgress,
  Link,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListSubheader,
  Option,
  Radio,
  Select,
  Slider,
  Switch,
  Tab,
  TabList,
  Tabs,
  Textarea,
  Typography,
} from '@mui/joy';

const VARIANTS = ['plain', 'outlined', 'soft', 'solid'];

export default function JoyColorInversion() {
  const renderComponents = (elm) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {React.Children.toArray(VARIANTS.map((variant) => React.cloneElement(elm, { variant })))}
    </Box>
  );
  const elements = (
    <React.Fragment>
      {renderComponents(<Alert>This is an alert.</Alert>)}
      {renderComponents(
        <AspectRatio sx={{ minWidth: 120 }}>
          <div>Image</div>
        </AspectRatio>,
      )}
      {renderComponents(<Avatar>MA</Avatar>)}
      {renderComponents(
        <Badge badgeContent={1000}>
          <IconButton>😀</IconButton>
        </Badge>,
      )}
      {renderComponents(<Button>Button</Button>)}
      <Card sx={{ minWidth: 256 }}>
        <AspectRatio>
          <div>Image</div>
        </AspectRatio>
        <CardContent>Content</CardContent>
        <Divider />
        <CardOverflow variant="soft">
          <Box sx={{ display: 'flex', py: 1.5, textAlign: 'right' }}>
            <Button>Next</Button>
          </Box>
        </CardOverflow>
      </Card>
      {renderComponents(<Checkbox label="Label" />)}
      {renderComponents(<Chip endDecorator={<ChipDelete />}>Chip</Chip>)}
      {renderComponents(
        <CircularProgress determinate value={25}>
          25%
        </CircularProgress>,
      )}
      {renderComponents(<Input placeholder="Placeholder" />)}
      {renderComponents(
        <LinearProgress determinate value={25} sx={{ width: '100%', flex: 'none' }} />,
      )}
      {renderComponents(<Link href="/">Link</Link>)}
      <List variant="outlined">
        <ListItem>Item 1</ListItem>
        <ListDivider />
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
      {renderComponents(<ListItem>Item</ListItem>)}
      {renderComponents(<ListItemButton>Item</ListItemButton>)}
      {renderComponents(<ListSubheader>Subheader</ListSubheader>)}
      {renderComponents(
        <Select placeholder="Choose one">
          <Option value={0}>Option</Option>
        </Select>,
      )}
      {renderComponents(<Radio label="Label" />)}
      {renderComponents(<Slider defaultValue={50} />)}
      {renderComponents(<Switch />)}
      <Tabs defaultValue={0}>
        <TabList variant="plain">
          <Tab variant="soft">Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
      </Tabs>
      <Tabs defaultValue={0}>
        <TabList variant="outlined">
          <Tab variant="soft">Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
      </Tabs>
      <Tabs defaultValue={0}>
        <TabList variant="soft">
          <Tab variant="solid">Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
      </Tabs>
      {renderComponents(<Textarea placeholder="Placeholder" />)}
      {renderComponents(<Typography>Text</Typography>)}
    </React.Fragment>
  );
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Sheet
        variant="soft"
        color="primary"
        invertedColors
        sx={{
          p: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
        }}
      >
        {elements}
      </Sheet>
      <Sheet
        variant="solid"
        color="primary"
        invertedColors
        sx={{
          p: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
        }}
      >
        {elements}
      </Sheet>
    </CssVarsProvider>
  );
}
