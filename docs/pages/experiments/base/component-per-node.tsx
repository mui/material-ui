import * as React from 'react';
import Link from 'next/link';
import { Textbox } from '@mui/base/Textbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';

const StyledRoot = styled('div')`
  color: rgb(148 163 184);
  display: flex;
  align-items: center;
  width: 18rem;
  text-align: left;
  padding: 0.75rem 1rem;
  background-color: white;
  border: 1px solid rgba(66, 153, 225, 0.1);
  border-radius: 0.375rem;
  box-shadow: 0 1px 1px rgba(66, 153, 225, 0.1);
  outline: none;
  font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  &:focus-within {
    border-color: #2684ff;
    box-shadow: 0 0 0 0.125rem rgb(38 132 255 / 25%);
  }
`;

const StyledInput = styled('input')`
  flex-grow: 1;
  font-family: inherit;
  border: none;
  outline: none;
  padding-left: 1rem;

  &::placeholder {
    color: #a0aec0;
  }
`;

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

      <h1 className="text-slate-800 text-lg">MUI System</h1>
      <Textbox render={(props) => <StyledRoot {...props} />}>
        <AccountCircleIcon />
        <Textbox.Input render={(props) => <StyledInput {...props} />} />
      </Textbox>

      <h1 className="text-slate-800 text-lg">Plain CSS</h1>
      <p>
        Taken from <Link href="/experiments/base/components-gallery">Components Gallery</Link>
      </p>
      <Textbox className="GalleryTextbox">
        <Textbox.Input placeholder="Write something here" />
      </Textbox>
    </div>
  );
}
