import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Fade from '@mui/material/Fade';
import FormatShapesRoundedIcon from '@mui/icons-material/FormatShapesRounded';
import SvgStorybook from 'docs/src/icons/SvgStorybook';
import ImagesearchRollerRoundedIcon from '@mui/icons-material/ImagesearchRollerRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Frame from 'docs/src/components/action/Frame';
import MUIConnectSignUp from './MUIConnectSignUp';

const Image = styled('img')(({ theme }) => ({
  transition: '0.4s',
  display: 'block',
  height: '100%',
  borderRadius: 6,
  border: '1px solid',
  borderColor: theme.palette.divider,
  filter: `drop-shadow(-2px 4px 6px ${alpha(theme.palette.grey[500], 0.5)})`,
  ...theme.applyDarkStyles({
    filter: `drop-shadow(-2px 4px 6px ${alpha(theme.palette.common.black, 0.2)})`,
    borderColor: theme.palette.primaryDark[600],
  }),
}));

export default function ConnectFeatures() {
  const [index, setIndex] = React.useState(0);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Available in the Beta version"
            title={
              <Typography variant="h2">
                The way developers and designers <GradientText>ship faster</GradientText>
              </Typography>
            }
            description="MUI Connect is perfect for teams of developers and designers building with the Material UI design kit and React library, respectively."
          />
          <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<ImagesearchRollerRoundedIcon color="success" />}
                title="Customize your design tokens"
                description="Visually tweak your color palettes, typography styles, shadows, spacing values, and border-radius through Figma's variables panel. Then, use MUI Connect to generate the theme with these changes!"
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<FormatShapesRoundedIcon color="primary" />}
                title="Redesign your components"
                description="Want to make your primary button full-rounded and with lower-case text? MUI Connect also generates code for custom component styles."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<SvgStorybook />}
                title="Preview your changes on Storybook"
                description="All of the changes you run through the MUI Connect plug-in can also be visualized on a baked-in Storybook preview instance."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                overflow: 'hidden',
                height: { xs: 240, sm: '100%' },
                perspective: '1000px',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  '& img': {
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                  },
                }}
              >
                {index === 0 && (
                  <Image
                    src={`/static/branding/design-kits/connect-plug-in-figma-light.jpg`}
                    alt="Screenshot of Figma displaying the Material UI Design kit"
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/connect-plug-in-figma-dark.jpg)`,
                      })
                    }
                  />
                )}
                {index === 1 && (
                  <Image
                    src={`/static/branding/design-kits/connect-plug-in-figma-light.jpg`}
                    alt="Screenshot of Figma displaying the Material UI Design kit"
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/connect-plug-in-figma-dark.jpg)`,
                      })
                    }
                  />
                )}
                {index === 2 && (
                  <Image
                    src={`/static/branding/design-kits/connect-plug-in-figma-light.jpg`}
                    alt="Screenshot of Figma displaying the Material UI Design kit"
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/connect-plug-in-figma-dark.jpg)`,
                      })
                    }
                  />
                )}
              </Box>
              {/* <Fade timeout={500}></Fade> */}
            </Frame.Demo>
            <Frame.Info data-mui-color-scheme="dark">
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Stay on the loop about the MUI Connect progress!
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Add your email to be notified about the plug-in progress as we go.
              </Typography>
              <MUIConnectSignUp />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
