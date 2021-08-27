import * as React from 'react';
import { useRouter } from 'next/router';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseRounded from '@material-ui/icons/CloseRounded';
import MarkEmailReadTwoTone from '@material-ui/icons/MarkEmailReadTwoTone';

export default function NewsletterToast() {
  const router = useRouter();
  const { newsletter } = router.query;
  const [hidden, setHidden] = React.useState(newsletter !== 'subscribed');
  React.useEffect(() => {
    if (newsletter === 'subscribed') {
      router.replace(router.pathname);
    }
  }, [newsletter, router]);
  React.useEffect(() => {
    const time = setTimeout(() => {
      if (!hidden) {
        setHidden(true);
      }
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [hidden]);
  return (
    <Slide in={!hidden} timeout={400} direction="down">
      <Box
        sx={{
          position: 'fixed',
          zIndex: 1300,
          top: 80,
          left: 0,
          width: '100%',
        }}
      >
        <Card
          variant="outlined"
          role="alert"
          sx={{
            p: 1,
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)',
            opacity: hidden ? 0 : 1,
            transition: '0.5s',
            display: 'flex',
            alignItems: 'center',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0px 4px 20px rgba(0, 0, 0, 0.6)'
                : '0px 4px 20px rgba(61, 71, 82, 0.25)',
          }}
        >
          <MarkEmailReadTwoTone color="success" sx={{ mx: 0.5 }} />
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
              sx={{ ml: 1, mr: 2 }}
            >
              You have subscribed to MUI newsletter.
            </Typography>
          </div>
          <IconButton aria-hidden size="small" onClick={() => setHidden(true)}>
            <CloseRounded fontSize="small" />
          </IconButton>
        </Card>
      </Box>
    </Slide>
  );
}
