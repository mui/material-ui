import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

function random(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export default function InfiniteScrolling() {
  const [options, setOptions] = React.useState(() =>
    Array.from(new Array(10)).map(() => random(10)),
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const handleOnScrollToBottom = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptions((previousOptions) => [
        ...previousOptions,
        ...Array.from(new Array(10)).map(() => random(10)),
      ]);
    }, 2000);
  };

  return (
    <Autocomplete
      id="infinite-scrolling-demo"
      options={options}
      getOptionLabel={(option) => option}
      sx={{ width: 300 }}
      loading={isLoading}
      onScrollToBottom={handleOnScrollToBottom}
    />
  );
}
