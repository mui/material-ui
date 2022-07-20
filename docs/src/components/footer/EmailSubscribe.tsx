import * as React from 'react';
import { Theme, styled, alpha } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CONFIG from 'docs/src/config';

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
      await fetch(CONFIG.NEWSLETTER_SUBSCRIBE_URL, {
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
      });
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
        <AlertTitle sx={{ typography: 'body2', fontWeight: 700 }}>
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
        sx={{ typography: 'caption', mb: 0.5, color: 'text.secondary', fontWeight: 500 }}
      >
        Enter your email:
      </FormLabel>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          width: { xs: '100%', sm: 'auto' },
          maxWidth: 320,
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
            minWidth: 220,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#fff',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 1px 2px 0 rgba(0 0 0 / 1)'
                : '0 1px 2px 0 rgba(0 0 0 / 0.1)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.grey[300],
            px: 1,
            py: 0.5,
            typography: 'body2',

            '&:hover': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.grey[500],
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 1px 2px 0 rgba(0 0 0 / 1)'
                  : '0 1px 2px 0 rgba(0 0 0 / 0.15)',
            },

            '&:focus': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
            },
          }}
        />
        <Button
          disabled={form.status === 'loading'}
          type="submit"
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : alpha(theme.palette.primary[100], 0.5),
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[100]
                : theme.palette.primary[600],
            py: 1,
            px: 1.5,
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[600]
                  : alpha(theme.palette.primary[100], 1),
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
