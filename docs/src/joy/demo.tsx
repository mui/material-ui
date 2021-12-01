import * as React from 'react';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { Box } from '@mui/system';
import { JoyTheme, styled } from '@mui/joy/styles';
import { Button, Typography, FormLabel, Select, Tabs } from 'docs/src/joy/components';
import { KeyboardArrowDownRounded } from 'docs/src/joy/icons';
import {
  nodeMap,
  useDemoController,
  registerNode,
  DemoContext,
  DemoProps,
} from 'docs/src/joy/DemoController';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const FakeTabs = React.forwardRef<
  HTMLDivElement,
  DemoProps & Omit<JSX.IntrinsicElements['div'], 'ref'>
>(({ children, onMouseOver, onClick, onMouseLeave, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      {...{ onMouseOver, onMouseLeave, onClick }}
      sx={{ px: { xs: 0, sm: 2 }, py: 2, position: 'relative' }}
    >
      <Tabs {...props}>{children}</Tabs>
    </Box>
  );
});

const Tabs1 = registerNode(FakeTabs, {
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

const ColorButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'value',
})<{ selected?: boolean; value: string }>(({ theme, value, selected }) => [
  {
    border: 'none',
    width: 24,
    height: 24,
    borderRadius: '50%',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: value,
    '&:focus-visible': theme.focus.default,
    '&:before': {
      display: 'block',
      content: '""',
      borderRadius: '50%',
      width: '100%',
      height: '100%',
      border: '2px solid',
      borderColor: value,
      position: 'absolute',
      opacity: selected ? 0.6 : 0,
      top: 0,
      left: 0,
      transform: selected ? 'scale(1.5)' : 'scale(0.8)',
      transition: 'transform 0.3s',
    },
  },
]);

export default function JoyDemo() {
  const variantOptions = ['text', 'outlined', 'light', 'contained'];
  const colorOptions = ['primary', 'neutral', 'danger', 'info', 'success', 'warning'] as const;
  const sizeOptions = ['small', 'default', 'large'];
  const roundnessOptions = ['default', 'xs', 'sm', 'md', 'lg', 'xl'];
  const elevationOptions = ['none', 'sm', 'md', 'lg'];

  const [open, setOpen] = React.useState(false);

  const { nodeData, hoveredId, selectedId, hoverNode, selectNode, leaveNode, updateNode } =
    useDemoController({
      Tabs1: {
        variant: 'outlined',
        color: 'neutral',
        roundness: 'default',
        elevation: undefined,
      },
    });

  const getDisplayedProps = (id: string) => {
    return (
      nodeMap.get(id)?.supportedProps.map((prop) => {
        const result = nodeData[id]?.[prop] || nodeMap.get(id)?.defaultProps[prop];
        // @ts-ignore 'none' is exceptional
        return result && result !== 'default' && result !== 'none'
          ? { key: prop, value: result }
          : null;
      }) as Array<{ key: string; value: string }>
    )
      .filter((val) => !!val)
      .map(({ key, value }) => `${key}="${value}"`)
      .join(' ');
  };

  const renderSelect = (field: keyof DemoProps, options: Array<string>) =>
    nodeMap.get(selectedId)?.supportedProps?.includes(field) ? (
      <React.Fragment>
        <FormLabel htmlFor={field}>{capitalize(field)}</FormLabel>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Select
            id={field}
            value={nodeData[selectedId]?.[field] || 'none'}
            onChange={(event) => {
              if (field === 'variant') {
                setOpen(event.target.value === 'contained');
              }
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
            mx: { xs: -2, sm: 0 },
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
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseOver={() => {
            hoverNode(null);
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 160, sm: 200 },
            }}
          >
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
          </Box>
          <Box
            sx={[
              {
                bottom: 16,
                left: 16,
                right: 16,
                opacity: open ? 1 : 0,
                visibility: open ? 'visible' : 'hidden',
                transition: '0.4s',
                py: 1,
                px: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
              },
              (theme) => ({
                // @ts-ignore
                borderRadius: theme.vars.borderRadius.xs,
                boxShadow: theme.vars.elevation.md,
                ...theme.variants.contained.success,
                ...theme.variants.containedOverrides.success,
              }),
            ]}
          >
            <Typography color="context" level="body2">
              🎨 Contextual override is a new feature that let children adapt to the parent that has
              high contrast background.
            </Typography>
            <Button
              size="small"
              color="context"
              variant="light"
              sx={{ flexShrink: 0 }}
              onClick={() => {
                updateNode('Tab1', {
                  color: 'context',
                });
                updateNode('Tab2', {
                  color: 'context',
                });
                updateNode('Tab3', {
                  color: 'context',
                });
              }}
            >
              Enable
            </Button>
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
          <FormLabel htmlFor="color">Color</FormLabel>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              columnGap: 3,
              rowGap: 2,
              pt: 1,
              pb: 3,
              px: 1,
            }}
          >
            {colorOptions.map((color) => (
              <ColorButton
                aria-label={`color ${color}`}
                key={color}
                selected={color === nodeData[selectedId]?.color}
                value={`var(--joy-palette-${color}-500)`}
                onClick={() => {
                  updateNode(selectedId, {
                    color,
                  });
                }}
              />
            ))}
          </Box>
          {renderSelect('size', sizeOptions)}
          {renderSelect('roundness', roundnessOptions)}
          {renderSelect('elevation', elevationOptions)}
        </Box>
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            gridRowStart: 2,
            minHeight: 130,
            fontSize: { xs: '0.75rem', md: '0.825rem' },
            bgcolor: 'primary.900',

            '& pre': {
              margin: 0,
            },
          }}
        >
          <HighlightedCode
            component="div"
            language="jsx"
            code={`
<Tabs ${getDisplayedProps('Tabs1')}>
  <Tab ${getDisplayedProps('Tab1')}>
    Popular
  </Tab>
  <Tab ${getDisplayedProps('Tab2')}>
    New
  </Tab>
  <Tab ${getDisplayedProps('Tab3')}>
    All
  </Tab>
</Tabs>`}
          />
        </Box>
      </Box>
    </DemoContext.Provider>
  );
}
