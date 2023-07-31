import * as React from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import TabUnselectedRoundedIcon from '@mui/icons-material/TabUnselectedRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import ROUTES from 'docs/src/route';

// switcher icons

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
    color: theme.palette.grey[500],
    border: '1px solid',
    borderColor: theme.palette.primaryDark[700],
    '&:hover': {
      backgroundColor: theme.palette.primaryDark[700],
    },
  },
  '&.MuiButton-outlined': {
    color: '#fff',
    backgroundColor: 'var(--palette-primary-dark)',
    borderColor: 'var(--palette-primary)',
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
            <More href={ROUTES.baseComponents} />
          </Group>
        </Grid>
        <Grid xs={12} md={6}>
          <Frame
            sx={[
              {
                height: '100%',
                '--palette-primary': 'var(--muidocs-palette-primary-main)',
                '--palette-primary-light': 'var(--muidocs-palette-primary-300)',
                '--palette-primary-hover': 'var(--muidocs-palette-primary-600)',
                '--palette-primary-dark': 'var(--muidocs-palette-primary-800)',
                '--focus-ring': 'rgba(102, 178, 255, 0.3)',
                '--shadow': '0px 2px 2px rgba(205, 210, 215, 0.5)',
                ...(styling === 'tailwindcss' && {
                  '--palette-primary': '#4F46E5',
                  '--palette-primary-light': '#7B74EC',
                  '--palette-primary-hover': '#463EC6',
                  '--palette-primary-dark': '#3730A3',
                  '--focus-ring': 'rgba(165, 180, 252, 0.6)',
                  '--shadow': '0px 2px 2px rgba(205, 210, 215, 0.5)',
                }),
                ...(styling === 'css' && {
                  '--palette-primary': '#9333EA',
                  '--palette-primary-light': '#AC62EF',
                  '--palette-hover': '#7F17DE',
                  '--palette-primary-dark': '#581C87',
                  '--focus-ring': 'rgba(216, 180, 254, 0.6)',
                  '--shadow': '0px 2px 2px rgba(205, 210, 215, 0.5)',
                }),
              },
              (theme) =>
                theme.applyDarkStyles({
                  '--focus-ring': 'rgba(102, 178, 255, 0.3)',
                  '--shadow': '0px 2px 2px rgba(0, 0, 0, 0.5)',
                  ...(styling === 'tailwindcss' && {
                    '--palette-primary': '#5B69F6',
                    '--palette-primary-hover': '#3446F4',
                    '--focus-ring': 'rgba(123, 120, 207, 0.6)',
                    '--shadow': '0px 2px 2px rgba(0, 0, 0, 0.5)',
                  }),
                  ...(styling === 'css' && {
                    '--palette-primary': '#B56FFB',
                    '--palette-primary-hover': '#A651FB',
                    '--focus-ring': 'rgba(166, 94, 222, 0.6)',
                    '--shadow': '0px 2px 2px rgba(0, 0, 0, 0.5)',
                  }),
                }),
            ]}
          >
            <Frame.Demo className="mui-default-theme" sx={{ flexGrow: 1 }}>
              {demo === 'Tabs' && <BaseTabsDemo styling={styling} />}
              {demo === 'Button' && <BaseButtonDemo styling={styling} />}
              {demo === 'Menu' && <BaseMenuDemo styling={styling} />}
              {demo === 'Input' && <BaseInputDemo styling={styling} />}
              {demo === 'Slider' && <BaseSliderDemo styling={styling} />}
            </Frame.Demo>
            <Frame.Info
              sx={{
                height: 360,
                position: 'relative',
                overflow: 'hidden',
                p: 0,
                pt: 5,
              }}
            >
              <Box
                sx={{
                  overflow: 'auto',
                  pt: 2,
                  pb: 1,
                  px: 2,
                  height: '100%',
                }}
              >
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
