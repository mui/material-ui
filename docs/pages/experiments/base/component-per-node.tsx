import * as React from 'react';
import { Textbox } from '@mui/base/Textbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ComponentPerNode() {
  const [value, setValue] = React.useState('Hello World');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="box-border max-w-screen-lg min-h-screen mx-auto p-8 bg-slate-100">
      <h1 className="text-slate-800 text-lg">Tailwind - basic</h1>
      <Textbox
        defaultValue="Hello World"
        className="flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white
                   ring-1 ring-slate-900/10
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 
                   shadow-sm rounded-lg text-slate-400"
      >
        <AccountCircleIcon />
        <Textbox.Input className="grow font-sans border-0 focus-visible:outline-0" />
      </Textbox>

      <h1 className="text-slate-800 text-lg">Tailwind - controlled</h1>
      <Textbox
        value={value}
        onChange={handleChange}
        className="flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white
                   ring-1 ring-slate-900/10
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 
                   shadow-sm rounded-lg text-slate-400"
      >
        <AccountCircleIcon />
        <Textbox.Input className="grow font-sans border-0 focus-visible:outline-0" />
      </Textbox>

      <h1 className="text-slate-800 text-lg">Tailwind - with custom components</h1>
      <Textbox
        render={(props) => <span {...props} />}
        className="flex items-center w-72 text-left space-x-3 px-4 h-24 bg-white
                   ring-1 ring-slate-900/10
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 
                   shadow-sm rounded-lg text-slate-400"
      >
        <AccountCircleIcon />
        <Textbox.Input
          render={({ value: localValue, ...other }) => (
            <textarea {...(other as any)}>{localValue}</textarea>
          )}
          className="grow font-sans border-0 focus-visible:outline-0 resize-none h-20"
        />
      </Textbox>
    </div>
  );
}
