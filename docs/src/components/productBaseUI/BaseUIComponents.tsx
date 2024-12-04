import * as React from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import TabUnselectedRoundedIcon from '@mui/icons-material/TabUnselectedRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import ROUTES from 'docs/src/route';

// Switcher icons
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
    backgroundColor: 'var(--primary-active)',
    borderColor: 'var(--primary-hover)',
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
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Unstyled components"
            title={
              <Typography variant="h2">
                Choose your own
                <br /> <GradientText>CSS adventure</GradientText>
              </Typography>
            }
            description="Base UI's skeletal components give you a sturdy foundation to apply custom styles with ease. With no defaults to override, you're free to start from scratch using vanilla CSS, Tailwind CSS, MUI System, or any other framework you prefer."
          />
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More href={ROUTES.baseComponents} />
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Frame
            sx={[
              {
                height: '100%',
                '--primary': 'var(--muidocs-palette-primary-600)',
                '--primary-hover': 'var(--muidocs-palette-primary-700)',
                '--primary-active': 'var(--muidocs-palette-primary-800)',
                '--focus-ring': 'rgba(0, 114, 229, 0.3)',
                '--slider-ring': 'rgba(0, 114, 229, 0.3)',
                '--shadow': '0px 2px 4px rgba(229, 234, 232, 0.8)',
                '--solid-btn-shadow':
                  '0 -2px 0.5px 0 var(--muidocs-palette-primary-700) inset, 0 2px 0.5px 0 var(--muidocs-palette-primary-400) inset, 0 1px 0.5px 0 var(--muidocs-palette-primary-900)',
                '--outlined-btn-shadow':
                  '0 -2px 0.5px 0 var(--muidocs-palette-grey-100) inset, 0 1px 0.5px 0 var(--muidocs-palette-grey-300)',
                ...(styling === 'tailwindcss' && {
                  '--primary': '#7716D0',
                  '--primary-hover': '#6512B0',
                  '--primary-active': '#500E8B',
                  '--focus-ring': 'rgba(119, 22, 208, 0.3)',
                  '--slider-ring': 'rgba(119, 22, 208, 0.3)',
                  '--shadow': '0px 2px 4px rgba(229, 234, 232, 0.8)',
                  '--solid-btn-shadow':
                    '0 -2px 0.5px 0 #500E8B inset, 0 2px 0.5px 0 #902FE9 inset, 0 1px 0.5px 0 #902FE9',
                }),
                ...(styling === 'css' && {
                  '--primary': '#EA2FAC',
                  '--primary-hover': '#B0127B',
                  '--primary-active': '#8B0E61',
                  '--focus-ring': 'rgba(234, 47, 172, 0.3)',
                  '--slider-ring': 'rgba(234, 47, 172, 0.3)',
                  '--shadow': '0px 2px 4px rgba(229, 234, 232, 0.8)',
                  '--solid-btn-shadow':
                    '0 -2px 0.5px 0 #B0127B inset, 0 2px 0.5px 0 #EE5DBE inset, 0 1px 0.5px 0 #F495D4',
                }),
              },
              (theme) =>
                theme.applyDarkStyles({
                  '--focus-ring': 'rgba(0, 114, 229, 0.6)',
                  '--slider-ring': 'rgba(0, 114, 229, 0.4)',
                  '--shadow': '0px 2px 2px rgba(0, 0, 0, 0.5)',
                  '--outlined-btn-shadow':
                    '0 -2px 0.5px 0 var(--muidocs-palette-grey-900) inset, 0 1px 0.5px 0 var(--muidocs-palette-primaryDark-900)',
                  ...(styling === 'tailwindcss' && {
                    '--focus-ring': 'rgba(119, 22, 208, 0.5)',
                    '--slider-ring': 'rgba(119, 22, 208, 0.5)',
                    '--shadow': '0px 2px 2px rgba(0, 0, 0, 0.5)',
                    '--solid-btn-shadow':
                      '0 -2px 0.5px 0 #500E8B inset, 0 2px 0.5px 0 #902FE9 inset, 0 1px 0.5px 0 rgba(0, 0, 0, 0.5)',
                  }),
                  ...(styling === 'css' && {
                    '--focus-ring': 'rgba(176, 18, 123, 0.8)',
                    '--slider-ring': 'rgba(176, 18, 123, 0.5)',
                    '--shadow': '0px 2px 2px rgba(0, 0, 0, 0.5)',
                    '--solid-btn-shadow':
                      '0 -2px 0.5px 0 #B0127B inset, 0 2px 0.5px 0 #EE5DBE inset, 0 1px 0.5px 0 rgba(0, 0, 0, 0.5)',
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
              data-mui-color-scheme="dark"
              sx={{ p: 0, pt: 5, height: 360, position: 'relative' }}
            >
              <Box sx={{ overflow: 'auto', pt: 2, pb: 1, px: 2, height: '100%' }}>
                <HighlightedCode
                  copyButtonHidden
                  plainStyle
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
                  gap: 1,
                  top: 12,
                  left: 12,
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
                >
                  Tailwind CSS
                </StyledButton>
                <StyledButton
                  size="small"
                  variant={styling === 'css' ? 'outlined' : 'text'}
                  onClick={() => {
                    setStyling('css');
                  }}
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
