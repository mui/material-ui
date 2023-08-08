import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import Section from 'docs/src/layouts/Section';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { ColorPaletteProp, VariantProp } from '@mui/joy/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 40,
  padding: theme.spacing('2px', 1),
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 18 / 12,
  '&.MuiButton-text': {
    color: theme.palette.grey[500],
    border: '1px solid',
    borderColor: theme.palette.primaryDark[700],
    '&:hover': {
      backgroundColor: theme.palette.primaryDark[700],
    },
  },
  '&.MuiButton-outlined': {
    color: '#fff',
    backgroundColor: theme.palette.primary[800],
    borderColor: theme.palette.primary[700],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    },
  },
}));

function GlobalVariantDemo() {
  const [variant, setVariant] = React.useState<VariantProp>('outlined');
  const [color, setColor] = React.useState<ColorPaletteProp>('neutral');
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo
        sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Select
          variant={variant}
          color={color}
          placeholder="Choose an option"
          defaultListboxOpen
          sx={{ minWidth: 160, mb: '100px' }}
        >
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
          <Option value="4">Option 4</Option>
        </Select>
      </Frame.Demo>
      <Frame.Info
        sx={{
          maxHeight: 450,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: '',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            {(['soft', 'solid', 'outlined', 'plain'] as const).map((v) => (
              <StyledButton>{v}</StyledButton>
            ))}
          </Box>
        </Box>
        <HighlightedCode
          copyButtonHidden
          component={MarkdownElement}
          code={`<Select
  placeholder="Select an option"
  color="neutral"
  variant="outlined"
>
  <Option value="option1">Option 1</Option>
  …
</Select>`}
          language="jsx"
        />
      </Frame.Info>
    </Frame>
  );
}

export default function JoyUIFeatures() {
  const [index, setIndex] = React.useState(0);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Features"
              title={
                <Typography variant="h2">
                  Powerful <GradientText>features to customize</GradientText> every piece
                </Typography>
              }
              description="Joy UI is built to ensure you ship great products to your users with an amazing developer experience."
            />
          </Box>
          <Group sx={{ mt: 4 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<SvgTwinkle />}
                title="Global variants"
                description="Pull their styles from a single source, helping you to ensure a consistent look and feel across both pre-built Joy UI components and any custom components you build."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<SvgTwinkle />}
                title="Color inversion"
                description="With color inversion set on the parent component, its children with implicit color will invert they styles to have a matching design."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<SvgTwinkle />}
                title="Automatic adjustment"
                description="All Joy UI components work together to ensure consistency and save your time with micro CSS tweaks."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          {index === 0 && <GlobalVariantDemo />}
        </Grid>
      </Grid>
    </Section>
  );
}
