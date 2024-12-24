import * as React from 'react';
import { Switch } from '@mui/base/Switch';
import { Select, SelectOption, Slider } from './components';

function Heading(props: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-3 text-base font-bold uppercase text-gray-400">{props.children}</h2>
  );
}

function Section(props: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[40px] grid-cols-3 grid-rows-[40px] items-center gap-x-16 border-t-[1px] border-solid border-gray-700 py-1.5">
      {props.children}
    </div>
  );
}

function Label(props: { children: React.ReactNode }) {
  return <h3 className="col-span-2 font-medium leading-none text-gray-300">{props.children}</h3>;
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
    <main className="flex h-screen w-full items-center justify-center">
      <div className="rounded-lg bg-[rgb(14,20,27)] p-6">
        <Heading>Night Mode</Heading>
        <Section>
          <Label>Schedule Night Mode</Label>
          <Switch
            slotProps={{
              root: {
                className:
                  'switch col-span-1 relative inline-block w-[40px] h-[24px] cursor-pointer justify-self-end',
              },
              input: {
                'aria-label': 'Schedule Night Mode',
                className: 'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-[1] m-0',
              },
              track: {
                className:
                  'bg-gray-400 rounded-2xl block w-full h-full absolute border-[3px] border-solid border-[rgb(14,20,27)]',
              },
              thumb: {
                className:
                  'block w-[20px] h-[20px] top-[2.5px] left-[-2px] rounded-2xl bg-white relative',
              },
            }}
            defaultChecked
          />
        </Section>
        <Section>
          <Label>Auto-Enable Between</Label>
          <div className="col-span-1 grid grid-cols-[1fr_auto_1fr] items-center">
            <Select defaultValue="9PM">
              {HOURS.map((hour) => (
                <SelectOption key={`from-${hour}`} value={hour}>
                  {hour}
                </SelectOption>
              ))}
            </Select>
            <span className="text-medium mx-2 text-sm text-gray-300">and</span>
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
          <div className="col-span-1 self-stretch">
            <Slider
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
          </div>
        </Section>
      </div>
    </main>
  );
}
