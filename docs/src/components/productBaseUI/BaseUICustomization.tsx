import * as React from 'react';
import { styled } from '@mui/system';
import clsx from 'clsx';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import useSwitch, { UseSwitchParameters } from '@mui/base/useSwitch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import Section from 'docs/src/layouts/Section';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import FlashCode from 'docs/src/components/animation/FlashCode';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const code = `
import clsx from 'clsx';
import { styled } from '@mui/system';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import useSwitch from '@mui/base/useSwitch';

const StyledSwitchRoot = styled('span')(\`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
  cursor: pointer;
  border-radius: 16px;
  background: var(--muidocs-palette-grey-400);

  &.Mui-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Mui-checked {
    background: var(--muidocs-palette-primary-main);
    & .MuiSwitch-thumb {
      left: 20px;
    }
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
  background-color: #fff;
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.Mui-focusVisible {
    background-color: var(--muidocs-palette-grey-500);
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

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
    />
    <SwitchFromHook />
  )
}
`;

const startLine = [6, 89, 64];
const endLine = [26, 93, 84];
const scrollTo = [0, 1400, 1140];

const StyledSwitchRoot = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
  cursor: pointer;
  border-radius: 16px;
  background: var(--muidocs-palette-grey-400);

  &.Mui-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Mui-checked {
    background: var(--muidocs-palette-primary-main);
    & .MuiSwitch-thumb {
      left: 20px;
    }
  }
  `);

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
  transition-duration: 120ms;

  &.Mui-focusVisible {
    background-color: var(--muidocs-palette-grey-500);
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

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
    if (infoRef.current) {
      infoRef.current.scroll({ top: scrollTo[index], behavior: 'smooth' });
    }
  }, [index]);
  return (
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Customization"
              title={
                <Typography variant="h2">
                  <GradientText>Freedom to decide</GradientText> how to customize
                </Typography>
              }
              description="With MUI Base, you have the freedom to decide how much you want to customize a component's structure and style."
            />
          </Box>
          <Group sx={{ mt: 4 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<SvgTwinkle />}
                title="Applying custom CSS rules"
                description="With MUI Base, you have the freedom to decide how much you want to customize a component's structure and style."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<SvgTwinkle />}
                title="Overriding subcomponent slots"
                description='Override the default subcomponents ("slots") using the components and/or component prop to make changes to a component&apos;s rendered HTML structure.'
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<SvgTwinkle />}
                title="Creating custom components using hooks"
                description="Make changes to a component's rendered HTML structure."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={(theme) => ({
                bgcolor: 'background.paper',
                overflow: 'auto',
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `${(theme.vars || theme).palette.gradients.lightGrayRadio}, ${
                  (theme.vars || theme).palette.patterns.triangle
                }`,
                ...theme.applyDarkStyles({
                  backgroundImage: `${(theme.vars || theme).palette.gradients.stylizedRadio}, ${
                    (theme.vars || theme).palette.patterns.triangle
                  }`,
                }),
              })}
            >
              <SwitchUnstyled
                slots={{
                  root: StyledSwitchRoot,
                  input: StyledSwitchInput,
                  thumb: StyledSwitchThumb,
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
              <Box sx={{ position: 'relative', '&& pre': { bgcolor: 'transparent' } }}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <HighlightedCode
                    copyButtonHidden
                    component={MarkdownElement}
                    code={code}
                    language="jsx"
                  />
                </Box>
                <FlashCode startLine={startLine[index]} endLine={endLine[index]} sx={{ mx: -1 }} />
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
