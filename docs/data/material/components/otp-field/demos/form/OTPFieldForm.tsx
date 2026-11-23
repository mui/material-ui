import * as React from 'react';
import Button from '@mui/material/Button';
import OTPField from '@mui/material/OTPField';
import Stack from '@mui/material/Stack';

const messages = {
  idle: 'Use the sample PIN 0012.',
  accepted: 'PIN accepted.',
  rejected: 'Incorrect PIN. Try 0012 again.',
};

export default function OTPFieldForm() {
  // @focus-start @padding 1
  const [result, setResult] = React.useState<keyof typeof messages>('idle');
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pin = new FormData(event.currentTarget).get('pin');
    if (pin === '0012') {
      setResult('accepted');
    } else {
      setResult('rejected');
      inputRef.current?.focus();
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      sx={{ alignItems: 'flex-start' }}
    >
      <OTPField
        label="Verification PIN"
        name="pin"
        inputRef={inputRef}
        length={4}
        required
        error={result === 'rejected'}
        helperText={<span role="status">{messages[result]}</span>}
        onValueChange={() => setResult('idle')}
      />
      <Button type="submit" variant="contained">
        Verify PIN
      </Button>
    </Stack>
  );
  // @focus-end
}
