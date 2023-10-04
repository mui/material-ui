import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// Icons
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SelectAllRoundedIcon from '@mui/icons-material/SelectAllRounded';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';
import TabUnselectedRoundedIcon from '@mui/icons-material/TabUnselectedRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
// Component imports
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import Link from 'docs/src/modules/components/Link';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import More from 'docs/src/components/action/More';
import TabsUsage from 'docs/data/joy/components/tabs/TabsUsage';
import RadioUsage from 'docs/data/joy/components/radio-button/RadioUsage';
import MenuUsage from 'docs/data/joy/components/menu/MenuUsage';
import SliderUsage from 'docs/data/joy/components/slider/SliderUsage';
import SelectUsage from 'docs/data/joy/components/select/SelectUsage';
import ButtonUsage from 'docs/data/joy/components/button/ButtonUsage';
import AlertUsage from 'docs/data/joy/components/alert/AlertUsage';
import Frame from 'docs/src/components/action/Frame';
import ROUTES from 'docs/src/route';

const DEMOS = ['Select', 'Radio', 'Alert', 'Menu', 'Slider', 'Button', 'Tabs'] as const;
const icons = {
  [DEMOS[0]]: <SelectAllRoundedIcon fontSize="small" />,
  [DEMOS[1]]: <RadioButtonCheckedRoundedIcon fontSize="small" />,
  [DEMOS[2]]: <CampaignRoundedIcon fontSize="small" />,
  [DEMOS[3]]: <MenuOpenRoundedIcon fontSize="small" />,
  [DEMOS[4]]: <LinearScaleRoundedIcon fontSize="small" />,
  [DEMOS[5]]: <SmartButtonRoundedIcon fontSize="small" />,
  [DEMOS[6]]: <TabUnselectedRoundedIcon fontSize="small" />,
};

export default function JoyUIComponents() {
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Components"
            title={
              <Typography variant="h2">
                Simple, <GradientText>good looking</GradientText>,<br /> and reliable components
              </Typography>
            }
            description="Foundational pre-built components that look beautiful by default, building on years of experience with Material UI."
          />
          <Group desktopColumns={2} sx={{ mt: 3 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More component={Link} href={ROUTES.joyComponents} noLinkStyle />
          </Group>
        </Grid>
        <Grid xs={12} md={6}>
          <Frame.Demo
            className="mui-default-theme"
            sx={{ flexGrow: 1, borderRadius: 1, overflow: 'auto', height: '100%', display: 'flex' }}
          >
            {
              {
                [DEMOS[0]]: <SelectUsage disableCodeBlock disableTitle />,
                [DEMOS[1]]: <RadioUsage disableCodeBlock disableTitle />,
                [DEMOS[2]]: <AlertUsage disableCodeBlock disableTitle />,
                [DEMOS[3]]: <MenuUsage disableCodeBlock disableTitle />,
                [DEMOS[4]]: <SliderUsage disableCodeBlock disableTitle />,
                [DEMOS[5]]: <ButtonUsage disableCodeBlock disableTitle />,
                [DEMOS[6]]: <TabsUsage disableCodeBlock disableTitle />,
              }[demo]
            }
          </Frame.Demo>
        </Grid>
      </Grid>
    </Section>
  );
}
