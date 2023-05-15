import * as React from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';

// switcher icons
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import TabUnselectedRoundedIcon from '@mui/icons-material/TabUnselectedRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';

import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import BaseButtonDemo from './components/BaseButtonDemo';
import BaseMenuDemo from './components/BaseMenuDemo';
import BaseInputDemo from './components/BaseInputDemo';
import BaseTabsDemo from './components/BaseTabsDemo';
import BaseSliderDemo from './components/BaseSliderDemo';

const StyledButton = materialStyled(Button)(({ theme }) => ({
  borderRadius: 40,
  padding: theme.spacing('2px', 1),
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 18 / 12,
  '&.MuiButton-text': {
    color: theme.palette.grey[400],
  },
  '&.MuiButton-outlined': {
    color: '#fff',
    backgroundColor: theme.palette.primary[700],
    borderColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    },
  },
}));

const DEMOS = ['Tabs', 'Button', 'Input', 'Menu', 'Slider'] as const;

const CODES: Record<
  (typeof DEMOS)[number],
  string | ((styling: 'system' | 'tailwindcss' | 'css') => string)
> = {
  Button: BaseButtonDemo.getCode,
  Menu: BaseMenuDemo.getCode,
  Input: BaseInputDemo.getCode,
  Tabs: BaseTabsDemo.getCode,
  Slider: BaseSliderDemo.getCode,
};

export default function BaseUIComponents() {
  const [styling, setStyling] = React.useState<'system' | 'tailwindcss' | 'css'>('system');
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <TabUnselectedRoundedIcon fontSize="small" />,
    [DEMOS[1]]: <SmartButtonRoundedIcon fontSize="small" />,
    [DEMOS[2]]: <InputRoundedIcon fontSize="small" />,
    [DEMOS[3]]: <MenuOpenRoundedIcon fontSize="small" />,
    [DEMOS[4]]: <LinearScaleRoundedIcon fontSize="small" />,
  };
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500} sx={{ mb: 4 }}>
            <SectionHeadline
              overline="Unstyled components"
              title={
                <Typography variant="h2">
                  Choose your own
                  <br /> <GradientText>CSS adventure</GradientText>
                </Typography>
              }
              description="Base UI’s skeletal components give you a sturdy foundation to apply custom styles with ease. With no defaults to override, you’re free to start from scratch using vanilla CSS, Tailwind CSS, MUI System, or any other framework you prefer."
            />
          </Box>
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More />
          </Group>
        </Grid>
        <Grid xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo className="mui-default-theme" sx={{ flexGrow: 1 }}>
              {demo === 'Tabs' && <BaseTabsDemo styling={styling} />}
              {demo === 'Button' && <BaseButtonDemo styling={styling} />}
              {demo === 'Menu' && <BaseMenuDemo styling={styling} />}
              {demo === 'Input' && <BaseInputDemo styling={styling} />}
              {demo === 'Slider' && <BaseSliderDemo styling={styling} />}
            </Frame.Demo>
            <Frame.Info
              sx={{
                height: 256,
                position: 'relative',
                overflow: 'hidden',
                pt: 5,
              }}
            >
              <Box sx={{ height: 'calc(100% + 40px)', overflow: 'auto', m: -2, p: 2, pt: 3 }}>
                <HighlightedCode
                  copyButtonHidden
                  component={MarkdownElement}
                  code={(() => {
                    const result = CODES[demo];
                    if (typeof result === 'function') {
                      return result(styling);
                    }
                    return result;
                  })()}
                  language="jsx"
                />
              </Box>
              <Box
                sx={(theme) => ({
                  pb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 12,
                  left: 16,
                  right: 0,
                  zIndex: 10,
                  background: `linear-gradient(to bottom, ${
                    (theme.vars || theme).palette.common.black
                  } 30%, transparent)`,
                })}
              >
                <StyledButton
                  size="small"
                  variant={styling === 'system' ? 'outlined' : 'text'}
                  onClick={() => {
                    setStyling('system');
                  }}
                >
                  MUI System
                </StyledButton>
                <StyledButton
                  size="small"
                  variant={styling === 'tailwindcss' ? 'outlined' : 'text'}
                  onClick={() => {
                    setStyling('tailwindcss');
                  }}
                  sx={{ ml: 1 }}
                >
                  Tailwind CSS
                </StyledButton>
                <StyledButton
                  size="small"
                  variant={styling === 'css' ? 'outlined' : 'text'}
                  onClick={() => {
                    setStyling('css');
                  }}
                  sx={{ ml: 1 }}
                >
                  Plain CSS
                </StyledButton>
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
