import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import t1 from 'docs/src/modules/branding/t1';

function searchParams(params: any) {
  return Object.keys(params)
    .filter((key) => params[key] != null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default function BrandingNewsletter() {
  const [form, setForm] = React.useState<'sent' | 'loading' | 'pristine'>('pristine');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm('loading');
    await fetch(
      'https://b54a4ca9.sibforms.com/serve/MUIEAL7ShMN_-JvWBUmF3ohJZXpuOAkBuriTevTM1gLkQWWuioHzjvYRLMT9K4KRGVU0rE02oJ_mcG1PVwaBe2O4UVlcxeyDT4BA8uGnG26Vl5ieAOf8eu1AM1fRXbiZb657oDuw2d5cy9hUpT2ekpgeBRJRHD2odSqJ7mAN1SF6cDWZo3SecU1lCIpGwurDex7GXUsbRS86Q387',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
        body: searchParams({
          // @ts-ignore YOLO
          EMAIL: event.target[0].value,
          email_address_check: '',
          locale: 'en',
        }),
      },
    );
    setForm('sent');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography component="h3" sx={{ maxWidth: { lg: 140 } }}>
        {t1('Subscribe to our Newsletter')}
      </Typography>
      {form === 'sent' ? (
        <Alert severity="success">
          <AlertTitle>Thanks! Check your email.</AlertTitle>
          You should get a <strong>confirmation email</strong> soon. Open it up and confirm your
          email address so that we can keep you up to date.
        </Alert>
      ) : (
        <Box
          sx={{
            display: 'flex',
            backgroundColor: (theme) => theme.palette.greyF3,
            borderRadius: 1,
            maxWidth: 300,
            '& input': {
              paddingLeft: 2,
              paddingRight: 1,
              height: 40,
              boxSizing: 'border-box',
            },
            '& button': {
              flexShrink: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          }}
        >
          <InputBase
            fullWidth
            placeholder={t1('Enter your email')}
            name="email"
            type="email"
            inputProps={{
              required: true,
              'aria-label': t1('Enter your email'),
            }}
          />
          <Button
            disabled={form === 'loading'}
            variant="contained"
            color="inherit"
            size="small"
            type="submit"
          >
            {t1('Subscribe')}
          </Button>
        </Box>
      )}
    </form>
  );
}
