import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function InputSubscription() {
  const [form, setForm] = React.useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    console.log('a');
    event.preventDefault();
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
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary[400],
          })}
        >
          MUI Newsletter
        </FormLabel>
        <Input
          sx={{ '--Input-decorator-childHeight': '45px' }}
          placeholder="mail@mui.com"
          type="email"
          required
          value={form.email}
          onChange={(event) =>
            setForm({ email: event.target.value, status: 'initial' })
          }
          error={form.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={form.status === 'loading'}
              type="submit"
            >
              Subscribe
            </Button>
          }
        />
        {form.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}

        {form.status === 'sent' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            You are all set!
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
