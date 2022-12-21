import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function InputSubscription() {
  const [form, setForm] = React.useState<{
    email: string;
    status: 'initial' | 'loading' | 'failure' | 'sent';
  }>({
    email: '',
    status: 'initial',
  });

  const handleSubmit = () => {
    setForm((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setForm({ email: '', status: 'sent' });
      }, 1500);
    } catch (error) {
      setForm((current) => ({ ...current, status: 'failure' }));
    }
  };

  return (
    <FormControl>
      <FormLabel
        sx={(theme) => ({
          '--FormLabel-color': theme.vars.palette.primary[400],
        })}
      >
        MUI Newsletter
      </FormLabel>
      <Input
        sx={{ pt: 0.5, pb: 0.5 }}
        placeholder="mail@mui.com"
        type="email"
        value={form.email}
        onChange={(event) =>
          setForm({ email: event.target.value, status: 'initial' })
        }
        error={form.status === 'failure'}
        endDecorator={
          <Button
            variant="solid"
            color="primary"
            sx={{ ml: 1, height: '45px' }}
            disabled={form.email.length === 0 || form.status === 'failure'}
            loading={form.status === 'loading'}
            onClick={handleSubmit}
          >
            Subscribe
          </Button>
        }
      />
      {form.status === 'failure' && (
        <FormHelperText sx={(theme) => ({ color: theme.vars.palette.danger[400] })}>
          Oops! something went wrong, please try again later.
        </FormHelperText>
      )}
      {form.status === 'sent' && (
        <FormHelperText sx={(theme) => ({ color: theme.vars.palette.primary[400] })}>
          You are all set!
        </FormHelperText>
      )}
    </FormControl>
  );
}
