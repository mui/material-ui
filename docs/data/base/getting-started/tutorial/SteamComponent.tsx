import * as React from 'react';
import { styled, alpha } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import SelectUnstyled, {
  selectUnstyledClasses,
  SelectUnstyledProps,
  SelectUnstyledRootSlotProps,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SliderUnstyled, { sliderUnstyledClasses } from '@mui/base/SliderUnstyled';

const HOURS = [
  '12AM',
  '1AM',
  '2AM',
  '3AM',
  '4AM',
  '5AM',
  '6AM',
  '7AM',
  '8AM',
  '9AM',
  '10AM',
  '11AM',
  '12PM',
  '1PM',
  '2PM',
  '3PM',
  '4PM',
  '5PM',
  '6PM',
  '7PM',
  '8PM',
  '9PM',
  '10PM',
  '11PM',
];

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
  999: 'rgb(14, 20, 27)',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const Container = styled('div')`
  background: ${blue[999]};
  padding: 24px;
  border-radius: 8px;
  margin-top: 16px;
`;

const Heading = styled('h2')`
  font-family: system-ui, IBM Plex Sans, sans-serif;
  font-weight: 700;
  color: ${grey[400]};
  text-transform: uppercase;
  font-size: 16px;
  margin: 12px 0 8px;
`;

const Row = styled('div')`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 40px;
  grid-template-areas: 'label control';
  column-gap: 64px;
  align-items: center;
  min-height: 40px;
  padding: 6px 0;
  border-top: 1px solid ${grey[700]};
`;

const Label = styled('div')`
  font-family: system-ui, IBM Plex Sans, sans-serif;
  font-weight: 500;
  color: ${grey[300]};
  grid-area: label;
`;

const SwitchRoot = styled('span')(
  ({ theme }) => `
  grid-area: control;
  justify-self: end;
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    border-radius: 16px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    border: 3px solid ${blue[999]};
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 20px;
    height: 20px;
    top: 2.5px;
    left: -2px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 20px;
      top: 2.5px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[400]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectUnstyledRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <ArrowDropDownOutlinedIcon />
    </button>
  );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: system-ui, IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 72px;
  padding: 8px 12px;
  border-radius: 2px;
  text-align: left;
  line-height: 1.5;
  background: ${grey[900]};
  border: 0;
  color: ${grey[300]};
  font-weight: 500;
  position: relative;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${grey[400]};
    color: ${grey[900]}
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 4px;
  }
  `,
);

const StyledListbox = styled('ul')`
  font-family: system-ui, IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 0;
  margin: 0 0 12px;
  border-radius: 2px;
  overflow: auto;
  outline: 0;
  background: ${blue[999]};
  border: 1px solid ${grey[700]};
  color: ${grey[300]};
  box-shadow: 0 1px 2px ${grey[500]};
  max-height: 240px;
`;

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 1px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${grey[700]};
    color: ${grey[50]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectUnstyledProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
});

const SelectContainer = styled('div')`
  grid-area: control;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  > span {
    color: ${grey[300]};
    font-size: 14px;
    font-weight: 500;
    margin: 0 8px;
  }
`;

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${blue[500]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  top: -1px;

  &:hover {
    opacity: 1;
  }

  &.${sliderUnstyledClasses.disabled} { 
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
    opacity: 0.5;
  }

  & .${sliderUnstyledClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background-color: ${grey[700]};
    opacity: 0.4;
  }

  & .${sliderUnstyledClasses.track} {
    display: block;
    position: absolute;
    height: 6px;
    border-radius: 999px;
    background-color: currentColor;
  }

  & .${sliderUnstyledClasses.thumb} {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: -8px;
    margin-top: -7.5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: #fff;

    :hover,
    &.${sliderUnstyledClasses.focusVisible} {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? blue[400] : blue[300],
        0.15,
      )};
    }

    &.${sliderUnstyledClasses.active} {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[300],
        0.3,
      )};
    }
  }

  & .${sliderUnstyledClasses.mark} {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    top: 50%;
    opacity: 0;
  }

  & .${sliderUnstyledClasses.markActive} {
    background-color: #fff;
  }

  & .${sliderUnstyledClasses.markLabel} {
    font-family: system-ui, IBM Plex Sans, sans-serif;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    color: ${grey[300]};
    position: absolute;
    top: 20px;
    margin-top: 8px;

    &[data-index="1"] {
      transform: translateX(-100%);
    }
  }
`,
);

const SliderContainer = styled('div')`
  grid-area: control;
  align-self: stretch;
`;

export default function SteamComponent() {
  return (
    <Container>
      <Heading>Night Mode</Heading>
      <Row>
        <Label>Schedule Night Mode</Label>
        <SwitchUnstyled
          slots={{
            root: SwitchRoot,
          }}
          slotProps={{
            input: { 'aria-label': 'Schedule Night Mode' },
          }}
          defaultChecked
        />
      </Row>

      <Row>
        <Label>Auto-Enable Between</Label>
        <SelectContainer>
          <CustomSelect defaultValue="9PM">
            {HOURS.map((hour) => (
              <StyledOption key={`from-${hour}`} value={hour}>
                {hour}
              </StyledOption>
            ))}
          </CustomSelect>
          <span>and</span>
          <CustomSelect defaultValue="6AM">
            {HOURS.map((hour) => (
              <StyledOption key={`to-${hour}`} value={hour}>
                {hour}
              </StyledOption>
            ))}
          </CustomSelect>
        </SelectContainer>
      </Row>

      <Row>
        <Label>Enable Night Mode (until morning)</Label>
        <SwitchUnstyled
          slots={{
            root: SwitchRoot,
          }}
          slotProps={{
            input: { 'aria-label': 'Enable Night Mode (until morning)' },
          }}
          defaultChecked
        />
      </Row>

      <Row>
        <Label>Night Mode Tint</Label>
        <SliderContainer>
          <StyledSlider
            aria-label="Night mode tint"
            defaultValue={37}
            marks={[
              {
                value: 0,
                label: 'Cool',
              },
              {
                value: 100,
                label: 'Warm',
              },
            ]}
          />
        </SliderContainer>
      </Row>
    </Container>
  );
}
