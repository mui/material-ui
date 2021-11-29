import * as React from 'react';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { Box } from '@mui/system';
import { JoyTheme } from '@mui/joy/styles';
import {
  Button,
  List,
  ListItemButton,
  Badge,
  Typography,
  TextField,
  FormLabel,
  Select,
  Tabs,
} from 'docs/src/joy/components';
import {
  Apps,
  Notifications,
  Person,
  Settings,
  KeyboardArrowDownRounded,
} from 'docs/src/joy/icons';
import {
  nodeMap,
  useDemoController,
  registerNode,
  DemoContext,
  DemoProps,
} from 'docs/src/joy/DemoController';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const Button1 = registerNode(Button, {
  id: 'button1',
  displayName: 'Button',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const Button2 = registerNode(Button, {
  id: 'button2',
  displayName: 'Button',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const Button3 = registerNode(Button, {
  id: 'button3',
  displayName: 'Button',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const Button4 = registerNode(Button, {
  id: 'button4',
  displayName: 'Button',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const List1 = registerNode(List, {
  id: 'List1',
  displayName: 'List',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
});

const ListItemButton1 = registerNode(ListItemButton, {
  id: 'ListItemButton1',
  displayName: 'ListItemButton',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
});

const ListItemButton2 = registerNode(ListItemButton, {
  id: 'ListItemButton2',
  displayName: 'ListItemButton',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
});

const ListItemButton3 = registerNode(ListItemButton, {
  id: 'ListItemButton3',
  displayName: 'ListItemButton',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
});

const Badge1 = registerNode(Badge, {
  id: 'Badge1',
  displayName: 'Badge',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
});

const Badge2 = registerNode(Badge, {
  id: 'Badge2',
  displayName: 'Badge',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
});

const Tabs1 = registerNode(Tabs, {
  id: 'Tabs1',
  displayName: 'Tabs',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
});

const Tab1 = registerNode(Button, {
  id: 'Tab1',
  displayName: 'Tab',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const Tab2 = registerNode(Button, {
  id: 'Tab2',
  displayName: 'Tab',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const Tab3 = registerNode(Button, {
  id: 'Tab3',
  displayName: 'Tab',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const Input1 = registerNode(TextField, {
  id: 'Input1',
  displayName: 'Input',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

const SearchButton1 = registerNode(Button, {
  id: 'SearchButton1',
  displayName: 'Button',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
});

export default function JoyDemo() {
  const variantOptions = ['text', 'outlined', 'light', 'contained'];
  const colorOptions = ['primary', 'neutral', 'danger', 'info', 'success', 'warning'];
  const sizeOptions = ['small', 'default', 'large'];
  const roundnessOptions = ['default', 'xs', 'sm', 'md', 'lg', 'xl'];
  const elevationOptions = ['none', 'sm', 'md', 'lg'];
  const { nodeData, hoveredId, selectedId, hoverNode, selectNode, leaveNode, updateNode } =
    useDemoController({
      button1: {
        variant: 'contained',
        color: 'primary',
        size: 'small',
        roundness: 'default',
        elevation: undefined,
      },
    });

  const renderSelect = (field: keyof DemoProps, options: Array<string>) =>
    nodeMap.get(selectedId)?.supportedProps?.includes(field) ? (
      <React.Fragment>
        <FormLabel htmlFor={field}>{capitalize(field)}</FormLabel>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Select
            id={field}
            value={nodeData[selectedId]?.[field] || 'none'}
            onChange={(event) => {
              updateNode(selectedId, {
                [field]: event.target.value,
              });
            }}
          >
            {!options.includes('none') &&
              field !== 'variant' &&
              field !== 'color' &&
              field !== 'size' && (
                <option value="none" disabled>
                  none
                </option>
              )}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <KeyboardArrowDownRounded sx={{ position: 'absolute', top: 8, right: 8 }} />
        </Box>
      </React.Fragment>
    ) : null;
  return (
    <DemoContext.Provider
      value={{
        nodeData,
        hoveredId,
        selectedId,
        hoverNode,
        selectNode,
        leaveNode,
      }}
    >
      <Box
        sx={[
          {
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr min-content' },
            borderRadius: 1,
            overflow: 'hidden',
          },
          // @ts-ignore
          (theme: JoyTheme) => ({
            ...theme.variants.outlined.neutral,
          }),
        ]}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 360,
          }}
          onMouseOver={() => {
            hoverNode(null);
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  my: 1.5,
                  alignItems: 'center',
                }}
              >
                <Button1 square>
                  <Apps fontSize="lg" />
                </Button1>
                <Button2 square variant="text" color="neutral" size="small" roundness="default">
                  <Person fontSize="lg" />
                </Button2>
                <Button3 square variant="text" color="neutral" size="small" roundness="default">
                  <Notifications fontSize="lg" />
                </Button3>
                <Button4 square variant="text" color="neutral" size="small" roundness="default">
                  <Settings fontSize="lg" />
                </Button4>
              </Box>
              <List1 variant="outlined" color="neutral" sx={{ flexGrow: 1 }}>
                <li>
                  <ListItemButton1 variant="light" color="info">
                    Products{' '}
                    <Badge1 variant="contained" color="success">
                      12
                    </Badge1>
                  </ListItemButton1>
                </li>
                <li>
                  <ListItemButton2 variant="text" color="neutral">
                    Orders{' '}
                    <Badge2 variant="light" color="neutral">
                      7
                    </Badge2>
                  </ListItemButton2>
                </li>
                <li>
                  <ListItemButton3 variant="text" color="neutral">
                    Customers
                  </ListItemButton3>
                </li>
              </List1>
            </Box>
            <Tabs1 variant="outlined" color="neutral">
              <Tab1 color="primary" size="default" variant="light">
                Popular
              </Tab1>
              <Tab2 color="neutral" size="default" variant="text">
                New
              </Tab2>
              <Tab3 color="neutral" size="default" variant="text">
                All
              </Tab3>
            </Tabs1>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Input1
                placeholder="Type name or sku"
                variant="outlined"
                color="neutral"
                size="default"
              />
              <SearchButton1 variant="contained" color="primary" size="default">
                Search
              </SearchButton1>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            gridRow: 'span 2',
            p: 2,
            borderWidth: { xs: '1px 0 0 0', sm: '0 0 0 1px' },
            borderStyle: 'solid',
            borderColor: 'neutral.outlinedBorder',
            bgcolor: 'background.level1',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 240,
          }}
        >
          <Typography level="h5" sx={{ mb: 2 }}>
            Playground
          </Typography>
          {renderSelect('variant', variantOptions)}
          {renderSelect('color', colorOptions)}
          {renderSelect('size', sizeOptions)}
          {renderSelect('roundness', roundnessOptions)}
          {renderSelect('elevation', elevationOptions)}
        </Box>
        <Box
          sx={{
            py: 2,
            px: 3,
            borderTop: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            gridRowStart: 2,
            minHeight: 130,
            fontSize: '0.75rem',
            bgcolor: 'primary.900',

            '& pre': {
              margin: 0,
            },
          }}
        >
          <HighlightedCode
            code={`
<${nodeMap.get(selectedId)?.displayName}
  ${nodeMap
    .get(selectedId)
    ?.supportedProps.filter((prop) => {
      const result = nodeData[selectedId][prop];
      // @ts-ignore 'none' is exceptional
      return result && result !== 'default' && result !== 'none';
    })
    .map((prop) => `${prop}="${nodeData[selectedId][prop]}"`)
    .join('\n  ')}
/>`}
            component="div"
            language="jsx"
          />
        </Box>
      </Box>
    </DemoContext.Provider>
  );
}
