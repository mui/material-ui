import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import CompareIcon from '@mui/icons-material/Compare';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';

export default function BaseUIEnd() {
  return (
    <Section
      data-mui-color-scheme="dark"
      sx={{
        color: 'text.secondary',
        background: 'linear-gradient(180deg, #14191F 46.35%, rgba(0, 58, 117, 0.8) 100%), #14191F',
      }}
    >
      <Grid container spacing={{ xs: 6, sm: 10 }} alignItems="center">
        <Grid xs={12} sm={6}>
          <SectionHeadline
            inverted
            overline="Community"
            title={
              <Typography variant="h2">
                Get and give help by joining
                <br /> our contributors community
              </Typography>
            }
            description={
              <React.Fragment>
                MUI Core components were crafted by many hands, all over the world. Join the
                community to help us expand it even further!
              </React.Fragment>
            }
          />
          <Button
            href={ROUTES.baseDocs}
            component={Link}
            noLinkStyle
            size="large"
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
            sx={{ mt: 2 }}
          >
            Get started
          </Button>
        </Grid>
        <Grid xs={12} sm={6}>
          <List sx={{ '& > li': { alignItems: 'flex-start' } }}>
            <ListItem sx={{ p: 0, mb: 4 }}>
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  mr: 2.5,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'primary.200',
                  bgcolor: 'primary.50',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: 'primary.400',
                    bgcolor: 'primary.900',
                    boxShadow:
                      '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                  }),
                })}
              >
                <CompareIcon color="primary" />
              </Box>
              <div>
                <Typography sx={{ color: 'text.primary', mb: 0.75 }} fontWeight="500">
                  Base UI vs. Material UI
                </Typography>
                <Typography>
                  Base UI features many of the same components as Material UI, but without the
                  Material Design implementation.
                </Typography>
              </div>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  mr: 2.5,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'primary.200',
                  bgcolor: 'primary.50',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: 'primary.400',
                    bgcolor: 'primary.900',
                    boxShadow:
                      '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                  }),
                })}
              >
                <StyleRoundedIcon color="primary" />
              </Box>
              <div>
                <Typography sx={{ color: 'text.primary', mb: 0.75 }} fontWeight="500">
                  Does it comes with styles?
                </Typography>
                <Typography>
                  Base UI is not packaged with any default theme or built-in style engine. This
                  makes it a great choice if you need complete control over how your app&apos;s CSS
                  is implemented.
                </Typography>
              </div>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Section>
  );
}
