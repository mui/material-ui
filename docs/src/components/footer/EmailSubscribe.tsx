import * as React from 'react';
import { Theme, styled } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const Form = styled('form')({});

function searchParams(params: any) {
  return Object.keys(params)
    .filter((key) => params[key] != null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default function EmailSubscribe({ sx }: { sx?: SxProps<Theme> }) {
  const [form, setForm] = React.useState<{
    email: string;
    status: 'initial' | 'loading' | 'failure' | 'sent';
  }>({
    email: '',
    status: 'initial',
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm((current) => ({ ...current, status: 'loading' }));
    try {
      await fetch(
        'https://f0433e60.sibforms.com/serve/MUIEAMMuohK-i-XUkJaUj3Lq3zr3rVeAPmgssEBsyiTktpqrImORJiFMQ1PLfZ1W1PGb-FzKhlfuPWlLNfx90j5R2qC7C219ec8AVcBsxlIRDG5znwaXr6gzAyth6W93bLiK4otXL_iBLFV43QqHrKZKORXA0LGq6seXbasTiAHh5EtqWFGK2zw8mlwYssGnIT_7ZZXiWC_iqubZ',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          mode: 'no-cors',
          body: searchParams({
            EMAIL: form.email,
            email_address_check: '',
            locale: 'en',
          }),
        },
      );
      setForm((current) => ({ ...current, status: 'sent' }));
    } catch (error) {
      setForm((current) => ({ ...current, status: 'failure' }));
    }
  };
  if (form.status === 'sent') {
    return (
      <Alert
        severity="success"
        sx={{
          maxWidth: { sm: 400 },
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primaryDark[700]
              : theme.palette.success[50],
          ...sx,
        }}
        iconMapping={{
          success: (
            <CheckCircleRoundedIcon
              fontSize="small"
              sx={{
                color: (theme: Theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.success[600]
                    : theme.palette.success[700],
              }}
            />
          ),
        }}
      >
        <AlertTitle sx={{ typography: 'body2', fontWeight: 600 }}>
          Thanks! Check your email.
        </AlertTitle>
        You should get a <strong>confirmation email</strong> soon. Open it up and confirm your email
        address so that we can keep you up to date.
      </Alert>
    );
  }
  return (
    <Form onSubmit={handleSubmit} sx={sx}>
      <FormLabel
        htmlFor="email-subscribe"
        sx={{ typography: 'caption', mb: 0.5, color: 'text.secondary' }}
      >
        Email
      </FormLabel>
      <Box
        sx={{
          display: 'flex',
          borderRadius: 1,
          overflow: 'hidden',
          width: { xs: '100%', sm: 'auto' },
          maxWidth: 360,
        }}
      >
        <InputBase
          id="email-subscribe"
          name="email"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={(event) => setForm({ email: event.target.value, status: 'initial' })}
          inputProps={{ required: true }}
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
          disabled={form.status === 'loading'}
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
      </Box>
      {form.status === 'failure' && (
        <FormHelperText
          sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'warning.500' : 'warning.800') }}
        >
          Oops! something went wrong, please try again later.
        </FormHelperText>
      )}
    </Form>
  );
}
