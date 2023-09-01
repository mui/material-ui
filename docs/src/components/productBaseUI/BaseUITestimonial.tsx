import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Link from 'docs/src/modules/components/Link';
import Section from 'docs/src/layouts/Section';

export default function BaseUITestimonial() {
  return (
    <Section>
      <Grid container spacing={{ xs: 6, sm: 10 }} alignItems="center">
        <Grid xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              pt: 3,
              pl: 3,
              background: 'linear-gradient(260deg, #3399FF 0%, #0059B3 95%)',
              backgroundClip: 'padding-box',
              overflow: 'auto',
              '& img': {
                width: '100%',
                borderTopLeftRadius: '12px',
                display: 'block',
              },
            }}
          >
            <Typography variant="h4" component="h2" mb={2.5} sx={{ color: '#fff' }}>
              Nhost&apos;s dashboard
            </Typography>
            <Box
              component="img"
              srcSet="/static/branding/base-ui/nhost.jpg, /static/branding/base-ui/nhost-2x.jpg 2x "
              alt="Screenshot displaying part of the Nhost dashboard that used Base UI to be built."
              loading="lazy"
              sx={{
                backgroundColor: '#fff',
                width: 510,
                height: 210,
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Nhost&apos;s new dashboard, powered by Base UI &nbsp;&nbsp;
            <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
              /
            </Typography>
            &nbsp;&nbsp;
            <Link href="https://nhost.io/blog/new-database-ui" target="_blank">
              View the blog post <ArrowForward fontSize="small" />
            </Link>
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography>
            “After considering various options, we decided to migrate our custom components to
            Material UI, and that&apos;s when we discovered Base UI. As a set of headless
            components, it offered exactly what we needed to implement our design system while
            maintaining full customizability. The focus on accessibility was also a big plus, as it
            ensured that our dashboard was usable by everyone. Low-level component hooks were just
            the icing on the cake.”
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar
              alt=""
              src="https://media.licdn.com/dms/image/C4D03AQHm6cbz2UDXpw/profile-displayphoto-shrink_800_800/0/1642674447256?e=2147483647&v=beta&t=L8g2vW_8mG8AvB3lwui0CT8969_Cx9QQ0iJXIS47i0o"
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                Szilárd Dóró
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Senior Software Engineer
              </Typography>
            </Box>
            <Box
              component="img"
              src="https://docs.nhost.io/img/logo.svg"
              alt=""
              sx={(theme) => ({
                width: '80px',
                alignSelf: 'center',
                ...theme.applyDarkStyles({
                  content: `url(https://nhost.io/common/logo.svg)`,
                }),
              })}
            />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
