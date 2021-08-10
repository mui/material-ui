import * as React from 'react';
import { styled, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const Form = styled('form')(({ theme }) => ({
  display: 'inline-flex',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

function searchParams(params: any) {
  return Object.keys(params)
    .filter((key) => params[key] != null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default function EmailSubscribe({ sx }: { sx?: SxProps<Theme> }) {
  const [form, setForm] = React.useState<'sent' | 'loading' | 'pristine'>('pristine');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm('loading');
    const target = event.target as {
      elements?: { email?: { value: string } };
    };
    await fetch(
      'https://f0433e60.sibforms.com/serve/MUIEAMMuohK-i-XUkJaUj3Lq3zr3rVeAPmgssEBsyiTktpqrImORJiFMQ1PLfZ1W1PGb-FzKhlfuPWlLNfx90j5R2qC7C219ec8AVcBsxlIRDG5znwaXr6gzAyth6W93bLiK4otXL_iBLFV43QqHrKZKORXA0LGq6seXbasTiAHh5EtqWFGK2zw8mlwYssGnIT_7ZZXiWC_iqubZ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
        body: searchParams({
          EMAIL: target.elements?.email?.value,
          email_address_check: '',
          locale: 'en',
        }),
      },
    );
    setForm('sent');
  };
  if (form === 'sent') {
    return (
      <Alert severity="success" sx={{ maxWidth: { sm: 400 }, ...sx }} icon={false}>
        <AlertTitle sx={{ typography: 'body2', fontWeight: 500 }}>
          Thanks! Check your email.
        </AlertTitle>
        You should get a <strong>confirmation email</strong> soon. Open it up and confirm your email
        address so that we can keep you up to date.
      </Alert>
    );
  }
  return (
    <Form
      onSubmit={handleSubmit}
      sx={{
        width: { xs: '100%', sm: 'auto' },
        maxWidth: 360,
        ...sx,
      }}
    >
      <InputBase
        placeholder="Enter your email"
        name="email"
        type="email"
        inputProps={{
          required: true,
          'aria-label': 'Enter your email',
        }}
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primaryDark[900]
              : theme.palette.grey[100],
          px: 1,
          py: 0.5,
          typography: 'body2',
          flexGrow: 1,
          minWidth: 200,
        }}
      />
      <Button
        disabled={form === 'loading'}
        type="submit"
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primaryDark[600]
              : theme.palette.grey[300],
          py: 1,
          px: 2,
          color: 'text.primary',
          borderRadius: '0px',
          '&:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[400],
          },
        }}
      >
        Subscribe
      </Button>
    </Form>
  );
}
