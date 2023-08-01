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
            <img
              src="/static/branding/base-ui/nhost.jpg"
              srcSet="/static/branding/base-ui/nhost.jpg 1x, /static/branding/base-ui/nhost-2x.jpg 2x "
              alt="Screenshot displaying part of the Nhost dashboard that used Base UI to be built."
              loading="lazy"
              width="570px"
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
            “Joy UI played a pivotal role in shaping the success of big-AGI. It turns heads with its
            stunning looks and makes other devs envious with its responsiveness, lightweight
            footprint, comprehensive documentation, and polished API. Using Joy UI is a delight, and
            the optimal React frontend choice.”
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar
              alt=""
              src="https://media.licdn.com/dms/image/C4D03AQHm6cbz2UDXpw/profile-displayphoto-shrink_800_800/0/1642674447256?e=2147483647&v=beta&t=L8g2vW_8mG8AvB3lwui0CT8969_Cx9QQ0iJXIS47i0o"
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                Enrico Ros
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Director of Product Management
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
