import * as React from 'react';
import { Input } from '@mui/base/Input';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ComponentPerNode() {
  const [value, setValue] = React.useState('Hello World');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="box-border max-w-screen-lg min-h-screen mx-auto p-8 bg-slate-100">
      <h1 className="text-slate-800 text-lg">Basic</h1>
      <Input
        defaultValue="Hello World"
        className="flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white
                   ring-1 ring-slate-900/10
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 
                   shadow-sm rounded-lg text-slate-400"
      >
        <AccountCircleIcon />
        <Input.Input className="grow font-sans border-0 focus-visible:outline-0" />
      </Input>

      <h1 className="text-slate-800 text-lg">Controlled</h1>
      <Input
        value={value}
        onChange={handleChange}
        className="flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white
                   ring-1 ring-slate-900/10
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 
                   shadow-sm rounded-lg text-slate-400"
      >
        <AccountCircleIcon />
        <Input.Input className="grow font-sans border-0 focus-visible:outline-0" />
      </Input>

      <h1 className="text-slate-800 text-lg">With custom components</h1>
      <Input
        render={(props) => <span {...props} />}
        className="flex items-center w-72 text-left space-x-3 px-4 h-24 bg-white
                   ring-1 ring-slate-900/10
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 
                   shadow-sm rounded-lg text-slate-400"
      >
        <AccountCircleIcon />
        <Input.Input
          render={({ value: localValue, ...other }) => (
            <textarea {...(other as any)}>{localValue}</textarea>
          )}
          className="grow font-sans border-0 focus-visible:outline-0 resize-none h-20"
        />
      </Input>
    </div>
  );
}
