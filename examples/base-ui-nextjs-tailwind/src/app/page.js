import * as React from 'react';
import { Switch } from '@mui/base/Switch';
import { Select, SelectOption, Slider } from './components';

function Heading(props) {
  return <h2 className="font-bold text-gray-400 uppercase text-xs mb-2">{props.children}</h2>;
}

function Section(props) {
  return <div className="flex justify-between items-center pt-3">{props.children}</div>;
}

function Label(props) {
  return <h3 className="leading-none text-sm text-gray-300">{props.children}</h3>;
}

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

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full h-screen bg-white dark:bg-gray-950">
      <div className="bg-black shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-gray-700/50 rounded-xl p-8 w-[500px] divide-y divide-gray-800/80 flex flex-col gap-3">
        <Heading>Night Mode</Heading>
        <Section>
          <Label>Schedule Night Mode</Label>
          <Switch
            slotProps={{
              root: {
                className:
                  'switch group relative inline-block w-[38px] h-[24px] cursor-pointer justify-self-end transition',
              },
              input: {
                'aria-label': 'Schedule Night Mode',
                className: 'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-[1] m-0',
              },
              track: {
                className:
                  'bg-gray-400 rounded-2xl block w-full h-full absolute group-[.Mui-focusVisible]:ring-4',
              },
              thumb: {
                className:
                  'block w-5 h-5 top-[2px] left-[2px] rounded-2xl bg-white relative outline-none shadow-none',
              },
            }}
            defaultChecked
          />
        </Section>
        <Section>
          <Label>Auto-Enable Between</Label>
          <div className="flex items-center gap-2">
            <Select defaultValue="9PM">
              {HOURS.map((hour) => (
                <SelectOption key={`from-${hour}`} value={hour}>
                  {hour}
                </SelectOption>
              ))}
            </Select>
            <span className="text-gray-300 text-sm text-medium">and</span>
            <Select defaultValue="6AM">
              {HOURS.map((hour) => (
                <SelectOption key={`to-${hour}`} value={hour}>
                  {hour}
                </SelectOption>
              ))}
            </Select>
          </div>
        </Section>
        <Section>
          <Label>Night Mode Tint</Label>
          <Slider
            className="max-w-[200px]"
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
        </Section>
      </div>
    </main>
  );
}
