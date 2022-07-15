import * as React from 'react';
import { styled, Theme, SxProps } from '@mui/material/styles';
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
        sx={[
          (theme) => ({
            maxWidth: { sm: 400 },
            ...(!theme.vars
              ? {
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[700]
                      : theme.palette.success[50],
                }
              : {
                  bgcolor: 'success.50',
                  [theme.getColorSchemeSelector('dark')]: {
                    bgcolor: 'primaryDark.700',
                  },
                }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        iconMapping={{
          success: (
            <CheckCircleRoundedIcon
              fontSize="small"
              sx={(theme: Theme) => ({
                ...(!theme.vars
                  ? {
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.success[600]
                          : theme.palette.success[700],
                    }
                  : {
                      color: 'success.700',
                      [theme.getColorSchemeSelector('dark')]: {
                        color: 'success.600',
                      },
                    }),
              })}
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
          sx={(theme) => ({
            ...(!theme.vars
              ? {
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[900]
                      : theme.palette.grey[100],
                }
              : {
                  bgcolor: 'grey.100',
                  [theme.getColorSchemeSelector('dark')]: {
                    bgcolor: 'primaryDark.900',
                  },
                }),
            px: 1,
            py: 0.5,
            typography: 'body2',
            flexGrow: 1,
            minWidth: 200,
            '&:focus': {
              outline: '2px solid',
              ...(!theme.vars
                ? {
                    outlineColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary[400]
                        : theme.palette.primary[200],
                  }
                : {
                    outlineColor: 'primary.200',
                    [theme.getColorSchemeSelector('dark')]: {
                      outlineColor: 'primary.400',
                    },
                  }),
              outlineOffset: '2px',
            },
          })}
        />
        <Button
          disabled={form.status === 'loading'}
          type="submit"
          sx={(theme) => ({
            ...(!theme.vars
              ? {
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[600]
                      : theme.palette.grey[300],
                  '&:hover': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[700]
                        : theme.palette.grey[400],
                  },
                }
              : {
                  bgcolor: 'grey.300',
                  '&:hover': {
                    bgcolor: 'grey.400',
                  },
                  [theme.getColorSchemeSelector('dark')]: {
                    bgcolor: 'primaryDark.600',
                    '&:hover': {
                      bgcolor: 'primaryDark.700',
                    },
                  },
                }),
            py: 1,
            px: 2,
            color: 'text.primary',
            borderRadius: '0px',
          })}
        >
          Subscribe
        </Button>
      </Box>
      {form.status === 'failure' && (
        <FormHelperText
          sx={(theme) => ({
            ...(!theme.vars
              ? { color: theme.palette.mode === 'dark' ? 'warning.500' : 'warning.800' }
              : {
                  color: 'warning.800',
                  [theme.getColorSchemeSelector('dark')]: {
                    color: 'warning.500',
                  },
                }),
          })}
        >
          Oops! something went wrong, please try again later.
        </FormHelperText>
      )}
    </Form>
  );
}
