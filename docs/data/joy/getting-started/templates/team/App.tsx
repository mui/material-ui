import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Autocomplete from '@mui/joy/Autocomplete';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Slider from '@mui/joy/Slider';
import Sheet from '@mui/joy/Sheet';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';

// Icons import
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

// custom
import Layout from './components/Layout';
import Header from './components/Header';
import Navigation from './components/Navigation';

export default function TeamExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        justifyContent="space-around"
        spacing={1}
        sx={(theme) => ({
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        })}
      >
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Files
        </Button>
      </Stack>
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="title-lg" textColor="text.secondary">
              People
            </Typography>

            <Button startDecorator={<PersonRoundedIcon />} size="sm">
              Add new
            </Button>
          </Box>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="title-md">Filters</Typography>
            <Button size="sm" variant="plain">
              Clear
            </Button>
          </Box>
          <AccordionGroup
            sx={{
              [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
                {
                  px: 2,
                },
              [`& .${accordionSummaryClasses.button}`]: {
                px: 2,
              },
            }}
          >
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography level="title-sm">Keywords</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ my: 2 }}>
                  <Autocomplete
                    size="sm"
                    placeholder="Position, skills, etc…"
                    options={[
                      {
                        category: 'Position',
                        title: 'Frontend engineer',
                      },
                      {
                        category: 'Position',
                        title: 'Backend engineer',
                      },
                      {
                        category: 'Position',
                        title: 'Product manager',
                      },
                      {
                        category: 'Skill',
                        title: 'JavaScript',
                      },
                      {
                        category: 'Skill',
                        title: 'TypeScript',
                      },
                      {
                        category: 'Skill',
                        title: 'Project management',
                      },
                    ]}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.title}
                  />
                  <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                    <Chip
                      variant="soft"
                      size="sm"
                      endDecorator={<ChipDelete variant="soft" />}
                    >
                      UI designer
                    </Chip>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography level="title-sm">Location</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ my: 2 }}>
                  <Autocomplete
                    size="sm"
                    placeholder="Country, city, etc…"
                    options={[
                      // some of Thailand provinces
                      'Bangkok',
                      'Amnat Charoen',
                      'Ang Thong',
                      'Bueng Kan',
                      'Buriram',
                      'Chachoengsao',
                      'Chai Nat',
                      'Chaiyaphum',
                      'Chanthaburi',
                      'Chiang Mai',
                      'Chiang Rai',
                      'Chonburi',
                    ]}
                  />
                  <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                    <Slider
                      size="sm"
                      variant="solid"
                      valueLabelFormat={(value) => `${value} km`}
                      defaultValue={6}
                      step={1}
                      min={0}
                      max={20}
                      valueLabelDisplay="on"
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography level="title-sm">Education</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ my: 2 }}>
                  <RadioGroup name="education" defaultValue="any">
                    <Radio label="Any" value="any" size="sm" />
                    <Radio label="High School" value="high-school" size="sm" />
                    <Radio label="College" value="college" size="sm" />
                    <Radio label="Post-graduate" value="post-graduate" size="sm" />
                  </RadioGroup>
                </Box>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </Layout.SidePane>
        <Layout.Main>
          <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <Sheet
                key={index}
                component="li"
                variant="outlined"
                sx={{
                  borderRadius: 'sm',
                  p: 2,
                  listStyle: 'none',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    variant="outlined"
                    src="https://i.pravatar.cc/40?img=7"
                    srcSet="https://i.pravatar.cc/80?img=7 2x"
                    sx={{ borderRadius: '50%' }}
                  />
                  <div>
                    <Typography level="title-md">Andrew Smith</Typography>
                    <Typography level="body-xs">UI Designer</Typography>
                  </div>
                </Box>
                <Divider component="div" sx={{ my: 2 }} />
                <List sx={{ '--ListItemDecorator-size': '40px', gap: 2 }}>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator
                      sx={{
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          height: '100%',
                          width: '1px',
                          bgcolor: 'divider',
                          left: 'calc(var(--ListItem-paddingLeft) + 12px)',
                          top: '50%',
                        },
                      }}
                    >
                      <Avatar
                        src="https://www.vectorlogo.zone/logos/dribbble/dribbble-icon.svg"
                        sx={{ '--Avatar-size': '24px' }}
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="title-sm">Senior designer</Typography>
                      <Typography level="body-xs">Dribbble</Typography>
                    </ListItemContent>
                    <Typography level="body-xs">2015-now</Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator>
                      <Avatar
                        src="https://www.vectorlogo.zone/logos/pinterest/pinterest-icon.svg"
                        sx={{
                          backgroundColor: 'background.body',
                          '--Avatar-size': '24px',
                        }}
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="title-sm">Designer</Typography>
                      <Typography level="body-xs">Pinterest</Typography>
                    </ListItemContent>
                    <Typography level="body-xs">2012-2015</Typography>
                  </ListItem>
                </List>
                <Button
                  size="sm"
                  variant="plain"
                  endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                  sx={{ px: 1, mt: 1 }}
                >
                  Expand
                </Button>
                <Divider component="div" sx={{ my: 2 }} />
                <Typography level="title-sm">Skills tags:</Typography>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                  <Chip variant="outlined" color="neutral" size="sm">
                    UI design
                  </Chip>
                  <Chip variant="outlined" color="neutral" size="sm">
                    Illustration
                  </Chip>
                </Box>
              </Sheet>
            ))}
          </List>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
