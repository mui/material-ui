import * as React from 'react';
import PropTypes from 'prop-types';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

function DebounceInput(props) {
  const { handleDebounce, debounceTimeout, ...other } = props;

  const timerRef = React.useRef(undefined);

  const handleChange = (event) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...other} onChange={handleChange} />;
}

DebounceInput.propTypes = {
  debounceTimeout: PropTypes.number.isRequired,
  handleDebounce: PropTypes.func.isRequired,
};

export default function DebouncedInput() {
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const handleDebounce = (value) => {
    setDebouncedValue(value);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <DebounceInput
        placeholder="Type in here…"
        debounceTimeout={1000}
        handleDebounce={handleDebounce}
      />
      <Typography>Debounced input: {debouncedValue}</Typography>
    </Box>
  );
}
