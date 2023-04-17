import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Section from 'docs/src/layouts/Section';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';

import ArrowForward from '@mui/icons-material/ArrowForward';

export default function BaseUITestimonial() {
  return (
    <Section bg="gradient">
      <Grid container spacing={{ xs: 6, sm: 10 }} alignItems="center">
        <Grid xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '12px',
              pt: 3,
              pl: 3,
              background: 'linear-gradient(260.43deg, #3399FF 0%, #0059B3 93.75%)',
            }}
          >
            <Typography variant="h4" mb={2.5} sx={{ color: '#fff' }}>
              Nhost&apos;s dashboard
            </Typography>
            <Box
              component="img"
              src="/static/branding/base-ui/nhost.jpg"
              sx={{
                width: '100%',
                borderTopLeftRadius: '12px',
                borderBottomRightRadius: '11px',
                display: 'block',
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            Nhost&apos;s new dashboard, powered by Base UI &nbsp;&nbsp;
            <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
              /
            </Typography>
            &nbsp;&nbsp;
            <Link href={ROUTES.baseDocs}>
              View blog post <ArrowForward fontSize="small" />
            </Link>
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography>
            “After considering various options, we decided to migrate our custom components to MUI,
            and that&apos;s when we discovered Base UI. As a set of headless components, it offered
            exactly what we needed to implement our design system while maintaining full
            customizability. The focus on accessibility was also a big plus, as it ensured that our
            dashboard was usable by everyone. Low-level component hooks were just the icing on the
            cake.”
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar src="https://media.licdn.com/dms/image/C4D03AQHm6cbz2UDXpw/profile-displayphoto-shrink_800_800/0/1642674447256?e=2147483647&v=beta&t=L8g2vW_8mG8AvB3lwui0CT8969_Cx9QQ0iJXIS47i0o" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">
                <b>Szilárd Dóró</b>
              </Typography>
              <Typography variant="body2">Senior Software Engineer</Typography>
            </Box>
            <img src="https://docs.nhost.io/img/logo.svg" alt="" width="80" />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
