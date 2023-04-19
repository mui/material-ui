import * as React from 'react';
import { styled } from '@mui/system';
import { unstable_useId } from '@mui/material/utils';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import InputUnstyled from '@mui/base/InputUnstyled';
import MenuUnstyled, { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import SliderUnstyled from '@mui/base/SliderUnstyled';
import Box from '@mui/material/Box';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const DEMOS = ['Button', 'Menu', 'Input', 'Tabs', 'Slider'] as const;

const CODES: Record<(typeof DEMOS)[number], string> = {
  Button: `
<ButtonUnstyled>Button</ButtonUnstyled>
<ButtonUnstyled disabled>Button</ButtonUnstyled>
`,
  Menu: `
<ButtonUnstyled>Button</ButtonUnstyled>
<MenuUnstyled>
  <MenuItemUnstyled>Profile</MenuItemUnstyled>
  <MenuItemUnstyled>Language settings</MenuItemUnstyled>
  <MenuItemUnstyled>Log out</MenuItemUnstyled>
</MenuUnstyled>
`,
  Input: `
<InputUnstyled />`,
  Tabs: `
<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled>
    <TabUnstyled>One</TabUnstyled>
    <TabUnstyled>Two</TabUnstyled>
    <TabUnstyled>Three</TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled value={0}>First page</TabPanelUnstyled>
  <TabPanelUnstyled value={1}>Second page</TabPanelUnstyled>
  <TabPanelUnstyled value={2}>Third page</TabPanelUnstyled>
</TabsUnstyled>`,
  Slider: `
<SliderUnstyled defaultValue={10} />
<SliderUnstyled defaultValue={10} disabled />`,
};

const StyledButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: var(--muidocs-palette-primary-500);
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &.Mui-active {
    background-color: var(--muidocs-palette-primary-600);
  }

  &.Mui-focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.Mui-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledMenuButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 12px 16px;
  line-height: 1.5;
  background: var(--muidocs-palette-background-paper);
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-300);
  color: var(--muidocs-palette-text-primary);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  outline-color: transparent;
  &.Mui-focusVisible {
    outline: 3px solid;
    outline-color: var(--muidocs-palette-grey-300);
  }
`;
const StyledPopper = styled(PopperUnstyled)``;
const StyledListbox = styled('ul')`
  margin: 4px 0;
  padding: 4px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-300);
  background: var(--muidocs-palette-background-paper);
  box-shadow: var(--muidocs-shadows-2);
`;
const StyledMenuItem = styled('li')`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  min-height: 24px;
  border-radius: 4px;
  gap: 4px;
  &:hover,
  &.Mui-focusVisible {
    cursor: default;
    outline: none;
    background: var(--muidocs-palette-grey-100);
  }
`;

function MenuDemo({ unstyled }: { unstyled: boolean }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const close = () => {
    setAnchorEl(null);
    buttonRef.current!.focus();
  };

  const createHandleMenuClick = () => {
    return () => {
      close();
    };
  };

  return (
    <div>
      <ButtonUnstyled
        slots={{ root: unstyled ? undefined : StyledMenuButton }}
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        aria-controls={isOpen ? 'simple-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        My account
      </ButtonUnstyled>
      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        slots={{
          root: unstyled ? PopperUnstyled : StyledPopper,
          listbox: unstyled ? undefined : StyledListbox,
        }}
        slotProps={{ listbox: { id: 'simple-menu' } }}
      >
        <MenuItemUnstyled
          slots={{ root: unstyled ? undefined : StyledMenuItem }}
          onClick={createHandleMenuClick()}
        >
          Profile
        </MenuItemUnstyled>
        <MenuItemUnstyled
          slots={{ root: unstyled ? undefined : StyledMenuItem }}
          onClick={createHandleMenuClick()}
        >
          Language settings
        </MenuItemUnstyled>
        <MenuItemUnstyled
          slots={{ root: unstyled ? undefined : StyledMenuItem }}
          onClick={createHandleMenuClick()}
        >
          Log out
        </MenuItemUnstyled>
      </MenuUnstyled>
    </div>
  );
}

const StyledTextInput = styled('div')`
  --TextInput-height: 64px;
  --TextInput-paddingTop: 1.75rem;
  --TextInput-labelLineHeight: 21px;
  --TextInput-labelScale: 0.85;
  width: 256px;
  padding: 0px 0.75rem;
  display: inline-block;
  position: relative;
  height: var(--TextInput-height);
  background: var(--muidocs-palette-background-paper);
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-300);
  border-radius: var(--muidocs-shape-borderRadius);
  outline-color: transparent;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  &:focus-within {
    border-color: var(--muidocs-palette-primary-400);
    outline: 3px solid;
    outline-color: var(--muidocs-palette-primary-100);
  }
  & label {
    line-height: var(--TextInput-labelLineHeight);
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    left: calc(0.75rem - 1px);
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    border: 1px solid transparent;
    transform-origin: 0 0;
    transform: translateY(-50%);
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
`;
const StyledInput = styled('input')`
  border: none;
  padding: var(--TextInput-paddingTop) 0 0.25rem;
  height: 100%;
  font-size: 1rem;
  background: unset;
  &:focus {
    outline: none;
  }
  &:not(:focus)::placeholder {
    color: transparent;
  }
  &:not(:placeholder-shown) ~ label,
  &:focus ~ label {
    font-weight: 500;
    color: var(--muidocs-palette-primary-main);
    transform: scale(var(--TextInput-labelScale))
      translateY(calc(-100% / var(--TextInput-labelScale)));
  }
`;
const CustomInput = React.forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(
  function CustomInput(props, ref) {
    const id = unstable_useId(props.id);
    return (
      <React.Fragment>
        <StyledInput ref={ref} {...props} id={id} />
        <label htmlFor={id}>Floating label</label>
      </React.Fragment>
    );
  },
);

const StyledTabsList = styled('div')`
  min-width: 300px;
  background-color: var(--muidocs-palette-primary-main);
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: var(--muidocs-shadows-2);
`;
const StyledTabPanel = styled('div')`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
const StyledTab = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:focus {
    color: #fff;
    outline: 3px solid var(--muidocs-palette-primary-200);
  }

  &.Mui-selected {
    background-color: #fff;
    color: var(--muidocs-palette-primary-main);
  }
`;
const StyledSlider = styled('span')`
  color: var(--muidocs-palette-primary-main);
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 1;
  }

  &.Mui-disabled {
    pointer-events: none;
    cursor: default;
    color: var(--muidocs-palette-primary-600);
    opacity: 0.5;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.4;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -6px;
    margin-top: -6px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: #fff;

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem rgba(var(--muidocs-palette-primary-lightChannel) / 0.4);
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem rgba(var(--muidocs-palette-primary-lightChannel) / 0.4);
    }
  }
`;

export default function BaseUIComponents() {
  const [unstyled, setUnstyled] = React.useState(false);
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <TableChartRounded fontSize="small" />,
    [DEMOS[1]]: <DateRangeRounded fontSize="small" />,
    [DEMOS[2]]: <AccountTreeRounded fontSize="small" />,
    [DEMOS[3]]: <ShowChartRounded fontSize="small" />,
    [DEMOS[4]]: <BarChartRounded fontSize="small" />,
  };
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
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
          <Group desktopColumns={2} sx={{ mt: 4 }}>
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
              {demo === 'Button' && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    height: '100%',
                    py: 2,
                  }}
                >
                  <ButtonUnstyled slots={{ root: unstyled ? undefined : StyledButton }}>
                    Button
                  </ButtonUnstyled>
                  <ButtonUnstyled disabled slots={{ root: unstyled ? undefined : StyledButton }}>
                    Disabled
                  </ButtonUnstyled>
                </Box>
              )}
              {demo === 'Menu' && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    height: '100%',
                    pt: 2,
                    pb: 10,
                  }}
                >
                  <MenuDemo unstyled={unstyled} />
                </Box>
              )}
              {demo === 'Input' && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    height: '100%',
                    py: 2,
                  }}
                >
                  <InputUnstyled
                    placeholder="Placeholder"
                    slots={{
                      root: unstyled ? undefined : StyledTextInput,
                      input: unstyled ? undefined : CustomInput,
                    }}
                  />
                </Box>
              )}
              {demo === 'Tabs' && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    height: '100%',
                    py: 2,
                  }}
                >
                  <TabsUnstyled selectionFollowsFocus defaultValue={0}>
                    <TabsListUnstyled slots={{ root: unstyled ? undefined : StyledTabsList }}>
                      <TabUnstyled slots={{ root: unstyled ? undefined : StyledTab }}>
                        One
                      </TabUnstyled>
                      <TabUnstyled slots={{ root: unstyled ? undefined : StyledTab }}>
                        Two
                      </TabUnstyled>
                      <TabUnstyled slots={{ root: unstyled ? undefined : StyledTab }}>
                        Three
                      </TabUnstyled>
                    </TabsListUnstyled>
                    <TabPanelUnstyled
                      slots={{ root: unstyled ? undefined : StyledTabPanel }}
                      value={0}
                    >
                      First page
                    </TabPanelUnstyled>
                    <TabPanelUnstyled
                      slots={{ root: unstyled ? undefined : StyledTabPanel }}
                      value={1}
                    >
                      Second page
                    </TabPanelUnstyled>
                    <TabPanelUnstyled
                      slots={{ root: unstyled ? undefined : StyledTabPanel }}
                      value={2}
                    >
                      Third page
                    </TabPanelUnstyled>
                  </TabsUnstyled>
                </Box>
              )}
              {demo === 'Slider' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    height: '100%',
                    py: 2,
                    px: 5,
                  }}
                >
                  <SliderUnstyled
                    slots={{ root: unstyled ? undefined : StyledSlider }}
                    defaultValue={10}
                  />
                  <SliderUnstyled
                    slots={{ root: unstyled ? undefined : StyledSlider }}
                    defaultValue={10}
                    disabled
                  />
                </Box>
              )}
            </Frame.Demo>
            <Frame.Info
              sx={{
                minHeight: 200,
                position: 'relative',
                overflow: 'hidden',
                pt: 5,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 'calc(100% - 2rem)',
                  top: 0,
                  left: '1rem',
                  display: 'flex',
                  gap: 2,
                  py: 1.25,
                  borderBottom: '1px solid',
                  borderColor: 'grey.700',
                }}
              >
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  Turn unstyled version on
                </Typography>
                <Switch
                  sx={{ ml: 'auto' }}
                  value={unstyled}
                  onChange={(event) => setUnstyled(event.target.checked)}
                />
              </Box>
              <Box sx={{ height: 'calc(100% + 40px)', overflow: 'auto', m: -2, p: 2, pt: 3 }}>
                <HighlightedCode
                  copyButtonHidden
                  component={MarkdownElement}
                  code={CODES[demo]}
                  language="jsx"
                />
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
