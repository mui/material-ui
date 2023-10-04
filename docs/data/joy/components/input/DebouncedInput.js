import * as React from 'react';
import PropTypes from 'prop-types';
import Input from '@mui/joy/Input';

function DebounceInput(props) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = React.useRef();

  const handleChange = (event) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
}

DebounceInput.propTypes = {
  debounceTimeout: PropTypes.number.isRequired,
  handleDebounce: PropTypes.func.isRequired,
};

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
