import * as React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import { Switch as SwitchUnstyled } from '@mui/base/Switch';
import { useSwitch, UseSwitchParameters } from '@mui/base/useSwitch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import Section from 'docs/src/layouts/Section';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import FlashCode from 'docs/src/components/animation/FlashCode';
import Frame from 'docs/src/components/action/Frame';

const code = `
import clsx from 'clsx';
import { styled } from '@mui/system';
import { SwitchUnstyled } from '@mui/base/Switch';
import { useSwitch } from '@mui/base/useSwitch';

const StyledSwitchRoot = styled('span')(\`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
  cursor: pointer;
  border-radius: 16px;
  background: #A0AAB4;

  &.Mui-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Mui-checked {
    background: #007FFF;
    & .MuiSwitch-thumb {
      left: 20px;
    }
  }

  &.Mui-focusVisible {
    outline: 2px solid #007FFF;
    outline-offset: 2px;
  }
\`);

const StyledSwitchInput = styled('input')\`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
\`;

const StyledSwitchThumb = styled('span')\`
  display: block;
  width: 16px;
  height: 16px;
  top: 4px;
  left: 4px;
  border-radius: 16px;
  background-color: #FFF;
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.Mui-checked {
    left: 20px;
  }
\`;

function SwitchFromHook(props) {
  const {
    getInputProps,
    checked,
    disabled,
    focusVisible,
  } = useSwitch(props);

  const stateClasses = {
    'Mui-checked': checked,
    'Mui-disabled': disabled,
    'Mui-focusVisible': focusVisible,
  };

  return (
    <StyledSwitchRoot className={clsx(stateClasses)}>
      <StyledSwitchThumb className={clsx(stateClasses)} />
      <StyledSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </StyledSwitchRoot>
  );
}

function App() {
  return (
    <SwitchUnstyled
      slots={{
        root: StyledSwitchRoot,
        input: StyledSwitchInput,
        thumb: StyledSwitchThumb,
      }}
      slotProps={{
        input: { 'aria-label': 'Demo switch' },
      }}
    />
    <SwitchFromHook />
  )
}
`;

const startLine = [6, 89, 64];
const endLine = [31, 93, 84];
const scrollTo = [0, 89, 62];

const StyledSwitchRoot = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
  cursor: pointer;
  border-radius: 16px;
  background: #b0b8c4;
  transition: all ease 120ms;

  :where([data-mui-color-scheme='dark']) & {
    background: #6b7a90;

    &:hover {
      background: #434d5b;
    }
  }

  &:hover {
    background: #9da8b7;
  }

  &.Mui-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Mui-checked {
    background: #007fff;

    &:hover {
      background: #0072e5;
    }

    & .MuiSwitch-thumb {
      left: 20px;
    }
  }

  &.Mui-focusVisible {
    outline: 4px solid rgb(0 127 255 / 0.4);
  }
`;

const StyledSwitchInput = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const StyledSwitchThumb = styled('span')`
  display: block;
  width: 16px;
  height: 16px;
  top: 4px;
  left: 4px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &.Mui-checked {
    left: 20px;
  }
`;

function SwitchFromHook(props: UseSwitchParameters) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    'Mui-checked': checked,
    'Mui-disabled': disabled,
    'Mui-focusVisible': focusVisible,
  };

  return (
    <StyledSwitchRoot className={clsx(stateClasses)}>
      <StyledSwitchThumb className={clsx(stateClasses)} />
      <StyledSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </StyledSwitchRoot>
  );
}

export default function BaseUICustomization() {
  const [index, setIndex] = React.useState(0);
  const infoRef = React.useRef<HTMLDivElement | null>(null);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  React.useEffect(() => {
    // 18px line-height
    // 16px margin-top
    // 1px border-width
    infoRef.current!.scroll({ top: scrollTo[index] * 18 + 16 - 1, behavior: 'smooth' });
  }, [index]);
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Customization"
            title={
              <Typography variant="h2">
                <GradientText>Endless possibilities </GradientText>
                <br /> with a lightweight API
              </Typography>
            }
            description="With Base UI, you have the freedom to decide how much you want to customize a component's structure and style."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<SvgTwinkle />}
                title="Applying custom CSS rules"
                description="Your CSS, your rules. With Base UI there are no styles to override, so you can start with a clean slate."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<SvgTwinkle />}
                title="Overriding subcomponent slots"
                description="Default DOM structure doesn't suit your needs? Replace any node with the element you prefer using the `slots` prop."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<SvgTwinkle />}
                title="Creating custom components using hooks"
                description="Base UI includes low-level hooks for adding functionality to your own fully custom-built components."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={(theme) => ({
                overflow: 'auto',
                flexGrow: 1,
                height: '140px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundSize: '100%, 72px',
                background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                ...theme.applyDarkStyles({
                  backgroundSize: '72px, 100%',
                  background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                }),
              })}
            >
              <SwitchUnstyled
                slots={{
                  root: StyledSwitchRoot,
                  input: StyledSwitchInput,
                  thumb: StyledSwitchThumb,
                }}
                slotProps={{
                  input: { 'aria-label': 'Demo switch' },
                }}
              />
              <SwitchFromHook defaultChecked />
            </Frame.Demo>
            <Frame.Info
              ref={infoRef}
              sx={{
                maxHeight: 450,
                overflow: 'auto',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
                <FlashCode startLine={startLine[index]} endLine={endLine[index]} />
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
