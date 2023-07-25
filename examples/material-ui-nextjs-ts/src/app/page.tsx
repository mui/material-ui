import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Link from '@/components/Link';

export default function HomePage() {
  return (
    <Box
      sx={{ display: 'flex', minWidth: '100vw', minHeight: '100vh', backgroundColor: '#fafafa' }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 500,
            fontSize: 'clamp(1.5rem, 6vw + 0.5rem, 2.5rem)',
            ml: '0.25rem',
            mt: 2,
            py: 2,
          }}
        >
          Next.js + Material UI
        </Typography>
        <Alert severity="info" icon={false} sx={{ mb: 3 }}>
          <AlertTitle sx={{ fontWeight: 500 }}>👋 Welcome</AlertTitle>
          This is a Next.js 13 app using the App Router and Material UI <br />
          Get started by editing <code className="font-mono font-bold">app/page.tsx</code>
        </Alert>
        <Grid container spacing={3}>
          <Grid sm={6}>
            <CardActionArea href="https://mui.com/material-ui/getting-started/">
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Material UI Docs
                  </Typography>
                  <Typography variant="body2">
                    Learn how to customize Material UI and explore the API docs
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid sm={6}>
            <CardActionArea href="https://nextjs.org/docs/app/building-your-application/">
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Next.js Docs
                  </Typography>
                  <Typography variant="body2">
                    Learn how to build your application using Next.js features
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid sm={6}>
            <CardActionArea href="https://mui.com/material-ui/getting-started/templates/">
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Templates
                  </Typography>
                  <Typography variant="body2">
                    Cards are surfaces that display content and actions on a single topic.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid sm={6}>
            <CardActionArea href="https://mui.com/material-ui/getting-started/templates/">
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Community
                  </Typography>
                  <Typography variant="body2">
                    Cards are surfaces that display content and actions on a single topic.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3, mt: 'auto' }}>
          <Link href="/links">Useful links</Link>

          <span>
            Created with 💙 by <Link href="https://mui.com">MUI</Link>.
          </span>
        </Box>
      </Container>
    </Box>
  );
}
