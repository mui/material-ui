import * as React from 'react';
import Input, { InputProps } from '@mui/joy/Input';

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

function DebounceInput(props: InputProps & DebounceProps) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = React.useRef<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
}

export default function DebouncedInput() {
  const handleDebounce = () => {
    alert('This function is called after 1 second of typing');
  };
  return (
    <DebounceInput
      placeholder="Type in here…"
      debounceTimeout={1000}
      handleDebounce={handleDebounce}
    />
  );
}
