import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
import OurValues from 'docs/src/components/about/OurValues';
import { Link } from '@mui/docs/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import IconImage from 'docs/src/components/icon/IconImage';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Head from 'docs/src/modules/components/Head';
import ROUTES from 'docs/src/route';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';

interface RoleProps {
  description: string;
  title: string;
  url?: string;
}

function Role(props: RoleProps) {
  if (props.url) {
    return (
      <Box
        sx={{
          py: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: 'start',
          gap: 2,
        }}
      >
        <div>
          <Typography variant="body1" color="text.primary" fontWeight="medium" gutterBottom>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 550 }}>
            {props.description}
          </Typography>
        </div>
        <Button
          component="a"
          variant="outlined"
          color="secondary"
          size="small"
          href={props.url}
          endIcon={<KeyboardArrowRightRounded />}
        >
          More about this role
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="body1" color="text.primary" fontWeight="medium" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 650 }}>
        {props.description}
      </Typography>
    </div>
  );
}

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: theme.transitions.create('box-shadow'),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    borderColor: theme.palette.primary[300],
    boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
  },
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2),
  },
  '&::before': {
    display: 'none',
  },
  '&::after': {
    display: 'none',
  },
  ...theme.applyDarkStyles({
    '&:hover': {
      borderColor: alpha(theme.palette.primary[600], 0.6),
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)',
    },
  }),
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(-2),
  minHeight: 'auto',
  '&.Mui-expanded': {
    minHeight: 'auto',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    paddingRight: theme.spacing(2),
    '&.Mui-expanded': {
      margin: 0,
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetail)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: 0,
}));

const faqData = [
  {
    summary: 'Are there application deadlines?',
    detail: 'No. You can still apply if a position is visible on our careers page.',
  },
  {
    summary: 'Does MUI do whiteboarding during interviews?',
    detail:
      'No. We ask applicants to complete challenges that are close to their future day-to-day contributions.',
  },
  {
    summary: 'Does MUI offer contract job opportunities?',
    detail:
      'Yes. People outside of France can be hired as full-time contractors. (Benefits may vary.)',
  },
];

const openRolesData = [
  {
    title: 'Engineering',
    roles: [
      // {
      //   title: 'React Engineer — xCharts',
      //   description:
      //     'You will help form the xCharts team, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
      //   url: '/careers/react-engineer-x-charts/',
      // },
      // {
      //   title: 'React Engineer — X',
      //   description:
      //     'You will strengthen the MUI X product, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
      //   url: '/careers/react-engineer-x/',
      // },
    ],
  },
  {
    title: 'Design',
    roles: [
      {
        title: 'Design Engineer — xGrid',
        description:
          'You will design and implement a great user and developer experience for the MUI X Data Grid.',
        url: '/careers/design-engineer-x-grid/',
      },
    ],
  },
  {
    title: 'Developer Experience',
    roles: [
      {
        title: 'Developer Advocate / Content Engineer',
        description:
          'You will strategize and implement educational initiatives from end to end to help developers build better UIs, faster.',
        url: '/careers/developer-advocate/',
      },
    ],
  },
  {
    title: 'Support',
    roles: [
      {
        title: 'Customer Support Agent',
        description:
          'You will help MUI provide timely and efficient support to our customers and continue to streamline our customer operations across the board.',
        url: '/careers/support-agent/',
      },
    ],
  },
];

const nextRolesData = [
  {
    title: 'Engineering',
    roles: [
      {
        title: 'Accessibility Engineer',
        description:
          'You will become our go-to expert for accessibility, to ensure all products meet or exceed WCAG 2.1 level AA guidelines.',
        url: '/careers/accessibility-engineer/',
      },
      {
        title: 'Full-stack Engineer — Toolpad',
        description:
          'You will join the MUI Toolpad team, to explore the role of MUI in the low code space and help bring the early prototype to a usable product.',
        url: '/careers/fullstack-engineer/',
      },
      {
        title: 'React Engineer — X',
        description:
          'You will strengthen the MUI X product, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
        url: '/careers/react-engineer-x/',
      },
      {
        title: 'React Engineer — xCharts',
        description:
          'You will help form the xCharts team, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
        url: '/careers/react-engineer-x-charts/',
      },
      {
        title: 'React Tech Lead — Core',
        description:
          'You will lead the development of MUI Core, positioning the library as the industry standard for design teams while doubling its adoption.',
        url: '/careers/react-tech-lead-core/',
      },
      {
        title: 'React Engineer — Core',
        description:
          'You will strengthen the core components team by collaborating with the community to land contributions.',
        url: '/careers/react-engineer-core/',
      },
      {
        title: 'React Community Engineer — X',
        description:
          'You will provide guidance to the community and solve their struggle, working primarily in the advanced components team.',
        url: '/careers/react-community-engineer/',
      },
    ],
  },
  {
    title: 'Design',
    roles: [
      {
        title: 'Design Engineer',
        description: 'You will focus on design to implement great product experiences.',
        url: '/careers/design-engineer/',
      },
    ],
  },
  {
    title: 'People',
    roles: [
      {
        title: 'Technical Recruiter',
        description: 'You will hire the next engineers, among other roles, joining the team.',
        url: '/careers/technical-recruiter/',
      },
    ],
  },
  {
    title: 'Sales',
    roles: [
      {
        title: 'Account Executive',
        description:
          'You will build client relationships and manage the sales process from start to finish.',
      },
    ],
  },
  {
    title: 'Marketing',
    roles: [
      {
        title: 'Product Marketing Manager',
        description: 'You will own the marketing efforts at MUI.',
        url: '/careers/product-marketing-manager/',
      },
    ],
  },
] as typeof openRolesData;

const companyInfo = [
  {
    title: 'About us',
    description: 'Meet the team and a little bit of our history.',
    routeUrl: ROUTES.about,
  },
  {
    title: 'Handbook',
    description: 'Learn everything about how MUI as a company is run.',
    routeUrl: ROUTES.handbook,
  },
  {
    title: 'Blog',
    description: 'Check behind-the-scenes and news about the company.',
    routeUrl: ROUTES.blog,
  },
];

function renderFAQItem(index: number, defaultExpanded?: boolean) {
  const faq = faqData[index];
  return (
    <Accordion variant="outlined" defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 20, color: 'primary.main' }} />}
      >
        <Typography variant="body2" fontWeight="bold" component="h3">
          {faq.summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          component="div"
          variant="body2"
          color="text.secondary"
          sx={{ '& ul': { pl: 2 } }}
        >
          {faq.detail}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

function RemoteAwardCard() {
  return (
    <Paper
      component={Link}
      href="/blog/remote-award-win-2024/"
      noLinkStyle
      variant="outlined"
      sx={{ p: 2 }}
    >
      <Box
        sx={{
          mb: 2,
          maxWidth: { xs: 315, sm: 325 },
          maxHeight: 315,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '6px',
          overflow: 'clip',
        }}
      >
        <Box
          component="img"
          src="/static/branding/careers/remote-award-light.png"
          alt="MUI is the winner of the Remote Excellence Awards in the Small and Mighty for SMEs category."
          height="1200px"
          width="1200px"
          sx={(theme) => ({
            width: '100%',
            height: '100%',
            ...theme.applyDarkStyles({
              content: `url(/static/branding/careers/remote-award-dark.png)`,
            }),
          })}
        />
      </Box>
      <div>
        <Typography component="h2" variant="body2" fontWeight="semiBold">
          Remote Excellence Awards
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Winners in the first-ever Remote Excellence Awards, in the Small & Mighty category! 🎉
        </Typography>
        <Typography variant="body2" fontWeight="bold" color="primary">
          Learn more <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
        </Typography>
      </div>
    </Paper>
  );
}

export default function Careers() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Careers - MUI"
        description="Interested in joining MUI? Learn about the roles we're hiring for."
        card="/static/social-previews/careers-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <Section cozy bg="gradient">
          <SectionHeadline
            alwaysCenter
            overline="Join us"
            title={
              <Typography variant="h2" component="h1">
                Build <GradientText>the next generation</GradientText>
                <br /> of tools for UI development
              </Typography>
            }
            description="Together, we are enabling developers & designers to bring stunning UIs to life with unrivalled speed and ease."
          />
        </Section>
        <Divider />
        <OurValues />
        <Divider />
        {/* Perks & benefits */}
        <Section bg="gradient" cozy>
          <Grid container spacing={5} alignItems="center">
            <Grid md={6}>
              <SectionHeadline
                overline="Working at MUI"
                title={
                  <Typography variant="h2" id="perks-and-benefits">
                    Perks & benefits
                  </Typography>
                }
                description="To help you go above and beyond with us, we provide:"
              />
              <Box sx={{ maxWidth: 500 }}>
                {[
                  ['100% remote work', 'Our entire company is globally distributed.'],
                  [
                    'Retreats',
                    'We meet up every 8 months for a week of working & having fun together!',
                  ],
                  [
                    'Equipment',
                    'We provide the hardware of your choice (initial grant of $2,500 USD).',
                  ],
                  ['Time off', 'We provide 33 days of paid time off globally.'],
                ].map((textArray) => (
                  <Box
                    key={textArray[0]}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, py: 0.5 }}
                  >
                    <IconImage name="pricing/yes" />
                    <div>
                      <Typography variant="body2" color="text.primary" fontWeight="semiBold">
                        {textArray[0]}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {textArray[1]}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{
                p: { xs: 2, sm: 0 },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <RemoteAwardCard />
              <Stack spacing={2} useFlexGap>
                {companyInfo.map(({ title, description, routeUrl }) => (
                  <Paper
                    key={title}
                    component={Link}
                    href={routeUrl}
                    noLinkStyle
                    variant="outlined"
                    sx={{
                      p: 2,
                      width: '100%',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {description}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary"
                      sx={{ mt: 'auto' }}
                    >
                      Learn more{' '}
                      <KeyboardArrowRightRounded
                        fontSize="small"
                        sx={{ verticalAlign: 'middle' }}
                      />
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Section>
        <Divider />
        {/* Open roles */}
        <Section cozy>
          <SectionHeadline
            title={
              <Typography variant="h2" id="open-roles" gutterBottom>
                Open roles
                <Badge
                  badgeContent={openRolesData.reduce((acc, item) => acc + item.roles.length, 0)}
                  color="success"
                  showZero
                  sx={{ ml: 3, '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                />
              </Typography>
            }
            description="The company was incorporated in mid-2019 and has been bootstrapped so far. We're growing fast—2× YoY—and have kept a steady pace of increasing the team: in 2020, we were 6; 15 in 2021, 25 in 2022, and 32 in 2023. We plan to grow the team to 60 people in 2024 in the following areas:"
          />
          <Divider sx={{ borderStyle: 'dashed', my: { xs: 2, sm: 6 } }} />
          <Stack spacing={2} divider={<Divider />}>
            {openRolesData.map((category) => {
              const roles = category.roles;
              return (
                <React.Fragment key={category.title}>
                  <Typography component="h3" variant="h5" fontWeight="semiBold">
                    {category.title}
                  </Typography>
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <Role
                        key={role.title}
                        title={role.title}
                        description={role.description}
                        url={role.url}
                      />
                    ))
                  ) : (
                    <Typography color="text.secondary">No open roles.</Typography>
                  )}
                </React.Fragment>
              );
            })}
          </Stack>
        </Section>
        <Divider />
        {/* Next roles */}
        {nextRolesData.length > 0 && (
          <Box data-mui-color-scheme="dark" sx={{ bgcolor: 'common.black' }}>
            <Section bg="transparent" cozy>
              <SectionHeadline
                alwaysCenter
                title={
                  <Typography variant="h2" id="next-roles" gutterBottom>
                    Next roles
                  </Typography>
                }
                description={
                  <React.Fragment>
                    If none of the roles below fit with what you are looking for, apply to{' '}
                    <Link href="https://jobs.ashbyhq.com/MUI/4715d81f-d00f-42d4-a0d0-221f40f73e19/application?utm_source=ZNRrPGBkqO">
                      the Dream job role
                    </Link>
                    !
                  </React.Fragment>
                }
              />
              <Divider sx={{ borderStyle: 'dashed', my: { xs: 2, sm: 6 } }} />
              <Stack spacing={2} divider={<Divider />}>
                {nextRolesData.map((category) => {
                  const roles = category.roles;
                  return (
                    <React.Fragment key={category.title}>
                      <Typography component="h3" variant="h5" fontWeight="extraBold">
                        {category.title}
                      </Typography>
                      {roles.length > 0 ? (
                        roles.map((role) => (
                          <Role
                            key={role.title}
                            title={role.title}
                            description={role.description}
                            url={role.url}
                          />
                        ))
                      ) : (
                        <Typography color="text.secondary">No plans yet.</Typography>
                      )}
                    </React.Fragment>
                  );
                })}
              </Stack>
            </Section>
          </Box>
        )}
        <Divider />
        {/* Frequently asked questions */}
        <Section bg="transparent" cozy>
          <Typography variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
            Frequently asked questions
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              {renderFAQItem(0, true)}
              {renderFAQItem(1)}
            </Grid>
            <Grid xs={12} md={6}>
              {renderFAQItem(2)}
              <Paper
                variant="outlined"
                sx={(theme) => ({
                  p: 2,
                  borderStyle: 'dashed',
                  borderColor: 'divider',
                  bgcolor: 'white',
                  ...theme.applyDarkStyles({
                    bgcolor: 'primaryDark.800',
                  }),
                })}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" color="text.primary" fontWeight="bold">
                    Got any questions unanswered or need more help?
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ my: 1, textAlign: 'left' }}
                >
                  We&apos;re here to help you with any other question you have about our hiring
                  process.
                </Typography>
                <Link href="mailto:job@mui.com" variant="body2">
                  Contact us <KeyboardArrowRightRounded fontSize="small" />
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Section>
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
