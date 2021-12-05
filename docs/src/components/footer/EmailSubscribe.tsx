import * as React from 'react';
import { Theme, styled } from '@mui/material/styles';
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
import useEmailSubscribe from 'docs/src/modules/utils/useEmailSubscribe';

const Form = styled('form')({});

export default function EmailSubscribe({ sx }: { sx?: SxProps<Theme> }) {
  const { form, setForm, onSubmit } = useEmailSubscribe(CONFIG.NEWSLETTER_SUBSCRIBE_URL);
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
    <Form onSubmit={onSubmit} sx={sx}>
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
