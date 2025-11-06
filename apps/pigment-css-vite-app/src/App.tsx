import * as React from 'react';
import { styled, generateAtomics } from '@pigment-css/react';
import type { Breakpoint } from '@mui/system';
import { Button, bounceAnim } from 'local-ui-lib';
import Slider from './Slider/ZeroSlider';
import { Box } from './Box';

const ShowCaseDiv = styled('div')({
  [`.${Button}`]: {
    color: '#f94564',
    animation: `${bounceAnim} 1s ease infinite`,
  },
});

const atomics = generateAtomics(({ theme }) => ({
  conditions: Object.entries(theme.breakpoints.values).reduce(
    (acc, [key, value]) => {
      if (key === 'xs') {
        return acc;
      }
      acc[key as Breakpoint] = theme.breakpoints.up(value);
      return acc;
    },
    {} as Record<Breakpoint, string>,
  ),
  defaultCondition: 'sm',
  properties: {
    display: ['none', 'flex', 'block', 'grid', 'inline-flex', 'inline-block'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    justifyContent: ['center', 'space-between'],
    alignItems: ['center'],
  },
}));

const HalfWidth = styled.div<{ isRed?: boolean }>(({ theme }) => ({
  marginLeft: 20,
  width: '50%',
  maxHeight: 100,
  padding: 20,
  border: '1px solid #ccc',
  color: ({ isRed }) => {
    if (isRed) {
      return (theme.vars || theme).palette.primary.main;
    }
    return (theme.vars || theme).palette.secondary.main;
  },
}));

type AppProps = {
  isRed?: boolean;
};

export function App({ isRed }: AppProps) {
  const [count, setCount] = React.useState(0);
  const [value, setValue] = React.useState(50);
  const [isColorPrimary, setIsColorPrimary] = React.useState(true);
  const [size, setSize] = React.useState('medium');
  const [showMarks, setShowMarks] = React.useState(true);
  const [isTrackInverted, setIsTrackInverted] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [isHorizontal, setIsHorizontal] = React.useState(true);

  return (
    <div>
      <ShowCaseDiv>
        <Button>This button&apos;s text color has been overridden.</Button>
      </ShowCaseDiv>
      <Button isRed={count % 2 === 1} onClick={() => setCount(count + 1)}>
        Click Count {count}
      </Button>
      <div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isColorPrimary}
              onChange={() => setIsColorPrimary(!isColorPrimary)}
            />
            Toggle Color: {isColorPrimary ? 'Primary' : 'Secondary'}
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isTrackInverted}
              onChange={() => setIsTrackInverted(!isTrackInverted)}
            />
            Track type: {isTrackInverted ? 'Inverted' : 'Normal'}
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isHorizontal}
              onChange={() => setIsHorizontal(!isHorizontal)}
            />
            Orientation: {isHorizontal ? 'Horizontal' : 'Vertical'}
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={disabled} onChange={() => setDisabled(!disabled)} />
            Disabled: {disabled ? 'Yes' : 'No'}
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showMarks} onChange={() => setShowMarks(!showMarks)} />
            Show marks: {showMarks ? 'Yes' : 'No'}
          </label>
        </div>
        <div>
          <label>
            Change Size:
            <select value={size} onChange={(ev) => setSize(ev.target.value)}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
            </select>
          </label>
        </div>
      </div>
      <div>
        <HalfWidth
          isRed={count % 2 === 0}
          sx={({ theme }) => ({
            color: (theme.vars || theme).palette.primary.main,
            fontSize: isRed ? 'h1.fontSize' : 'h2.fontSize',
            ':hover': {
              backgroundColor: ['primary.dark', 'secondary.main'],
              color: {
                sm: 'primary.dark',
                md: 'secondary.main',
              },
            },
          })}
        >
          <Slider
            aria-label="Small steps"
            defaultValue={50}
            step={2}
            marks={showMarks}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            orientation={isHorizontal ? 'horizontal' : 'vertical'}
            size={size as 'small' | 'medium'}
            color={isColorPrimary ? 'primary' : 'secondary'}
            track={isTrackInverted ? 'inverted' : 'normal'}
            disabled={disabled}
            value={value}
            onChange={(ev, val) => setValue(val as number)}
          />
        </HalfWidth>
      </div>
      <div>
        <h1>Atomics Demo</h1>
        <div
          {...atomics({
            display: 'flex',
            flexDirection: {
              lg: 'row',
              md: 'column',
              sm: 'column',
            },
            justifyContent: 'space-between',
          })}
        >
          <span>Hello1</span>
          <span>Hello2</span>
        </div>
      </div>
      <Box as="div">Hello</Box>
    </div>
  );
}
