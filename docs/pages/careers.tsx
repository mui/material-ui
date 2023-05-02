import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import Link from 'docs/src/modules/components/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import MuiStatistics from 'docs/src/components/home/MuiStatistics';
import GradientText from 'docs/src/components/typography/GradientText';
import IconImage from 'docs/src/components/icon/IconImage';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
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
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <span>
          <Typography
            component="span"
            variant="body1"
            color="text.primary"
            fontWeight={700}
            sx={{ display: 'block', mb: 0.5 }}
          >
            {props.title}
          </Typography>
          <Typography
            component="span"
            color="text.secondary"
            sx={{ display: 'block', mb: 1, maxWidth: 700 }}
          >
            {props.description}
          </Typography>
        </span>
        <Button
          component="a"
          // @ts-expect-error
          variant="link"
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
      <Typography variant="body1" color="text.primary" fontWeight={700} sx={{ my: 1 }}>
        {props.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1, maxWidth: 700 }}>
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
    boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
  },
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2),
  },
  '&:before': {
    display: 'none',
  },
  '&:after': {
    display: 'none',
  },
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
    detail: 'No. If a job is visible on our careers page, then you can still apply.',
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
      {
        title: 'React Tech Lead - Core',
        description:
          'You will lead the development of MUI Core, positioning the library as the industry standard for design teams while doubling its adoption.',
        url: '/careers/react-tech-lead-core/',
      },
      {
        title: 'React Engineer - Core',
        description:
          'You will strengthen the core components team by collaborating with the community to land contributions.',
        url: '/careers/react-engineer-core/',
      },
      {
        title: 'React Tech Lead - xGrid',
        description:
          'You will lead the development of the MUI X Data Grid, positioning the component as the next industry standard.',
        url: '/careers/react-tech-lead-x-grid/',
      },
      {
        title: 'React Engineer - xGrid',
        description:
          'You will strengthen the Data Grid team, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
        url: '/careers/react-engineer-x-grid/',
      },
      {
        title: 'Product Engineer - Store',
        description:
          'You will lead the technical, product, and operational development of the store.',
        url: '/careers/product-engineer/',
      },
      {
        title: 'Accessibility Engineer',
        description:
          'You will become our go-to expert for accessibility, to ensure all products meet or exceed WCAG 2.1 level AA guidelines.',
        url: '/careers/accessibility-engineer/',
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
    title: 'Marketing',
    roles: [
      {
        title: 'Product Marketing Manager',
        description: 'You will own the marketing efforts at MUI.',
        url: '/careers/product-marketing-manager/',
      },
    ],
  },
  {
    title: 'Operations',
    roles: [
      {
        title: 'Head of Operations',
        description:
          "You will take ownership of designing, implementing, and overseeing most of the business operations to support MUI's growth.",
        url: '/careers/head-of-operations/',
      },
    ],
  },
];

const nextRolesData = [
  {
    title: 'Engineering',
    roles: [
      {
        title: 'Full-stack Engineer - Toolpad',
        description:
          'You will join the MUI Toolpad team, to explore the role of MUI in the low code space and help bring the early prototype to a usable product.',
        url: '/careers/fullstack-engineer/',
      },
      {
        title: 'React Support Engineer - X',
        description:
          "You will provide support, remove blockers and unwrap potential features from reported issues for the advanced components team. You will directly impact developers' satisfaction and success.",
        url: '/careers/react-support-engineer/',
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
    title: 'Support',
    roles: [
      {
        title: 'Support Agent - Store',
        description:
          "You will provide support for the customers of MUI Store. You will directly impact customers' satisfaction and success.",
      },
    ],
  },
] as typeof openRolesData;

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

function CareersContent() {
  return (
    <React.Fragment>
      {/* Hero */}
      <Container>
        <Box
          sx={{
            height: '40vh',
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 600,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="primary.600" fontWeight="bold">
            Careers
          </Typography>
          <Typography component="h1" variant="h2" sx={{ my: 1 }}>
            Build the <GradientText>next generation</GradientText> of tools for UI development
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{
              maxWidth: { md: 500 },
              minHeight: 48, // a hack to reduce CLS (layout shift)
            }}
          >
            Our mission is to enable developers at every level of ability to build great UIs,
            faster.
          </Typography>
        </Box>
      </Container>
      {/* Our ultimate goal */}
      <Box
        sx={(theme) => ({
          bgcolor: 'grey.50',
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
          }),
        })}
      >
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ my: 1 }}>
                Our ultimate goal
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1, maxWidth: 450 }}>
                We aim high trying to design the most effective and efficient tool for building UIs,
                for developers and designers. MUI started back in 2014, to unify React and Material
                Design. Since then, we&apos;ve become a community of over 2M developers from every
                corner of the world.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                We plan on doing all that cultivating our values:
              </Typography>
              {[
                'Customer obsessed. We put our customers front & center.',
                'Transparency. Most of our work is public.',
                'Freedom. We work from anywhere in the world.',
                'Autonomy. We want to create a safe, high-trust team.',
                "Excellence. We're aiming high, and we know it.",
              ].map((text) => (
                <Box key={text} sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                  <IconImage name="yes" />
                  <Typography variant="body2" color="text.primary" fontWeight={700} sx={{ ml: 1 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <MuiStatistics />
          </Grid>
        </Container>
      </Box>
      {/* Perks & benefits */}
      <div>
        <Container sx={{ py: 4 }}>
          <Grid container alignItems="center" spacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12} md={6} sx={{ pr: { sm: 0, md: 4 } }}>
              <Typography variant="h2" sx={{ my: 1 }} id="perks-amp-benefits">
                {'Perks & benefits'}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                To help you go above and beyond with us, we provide:
              </Typography>
              {[
                ['Remote work:', 'Our entire company is distributed.'],
                [
                  'Retreats:',
                  'We meet up every eight months for a week of working and having fun together!',
                ],
                [
                  'Equipment:',
                  'MUI will provide the hardware of your choice (initial grant of $2,500 USD).',
                ],
                ['Time off:', 'We provide five weeks of paid time off.'],
              ].map((textArray) => (
                <Box key={textArray[0]} sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                  <IconImage name="yes" />
                  <Typography variant="body2" color="text.primary" sx={{ ml: 1 }}>
                    <span style={{ fontWeight: 700 }}>{`${textArray[0]}  `}</span>
                    {textArray[1]}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={6} container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Paper
                  component={Link}
                  href={ROUTES.handbook}
                  noLinkStyle
                  variant="outlined"
                  sx={{ p: 2 }}
                >
                  <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                    Handbook
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    See how we run the company and the way we work.
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      color: 'primary.600',
                      ...theme.applyDarkStyles({
                        color: 'primary.400',
                      }),
                    })}
                    variant="body2"
                    fontWeight="bold"
                  >
                    Learn more{' '}
                    <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Paper
                  component={Link}
                  href={ROUTES.blog}
                  noLinkStyle
                  variant="outlined"
                  sx={{ p: 2 }}
                >
                  <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                    Blog
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Check behind the scenes and news from the company.
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      color: 'primary.600',
                      ...theme.applyDarkStyles({
                        color: 'primary.400',
                      }),
                    })}
                    variant="body2"
                    fontWeight="bold"
                  >
                    Learn more{' '}
                    <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* Open roles */}
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <div>
          <Typography variant="h2" sx={{ my: 1 }} id="open-roles">
            {`Open roles (${openRolesData.reduce((acc, item) => acc + item.roles.length, 0)})`}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 500 }}>
            The company is bootstrapped (so far). It was incorporated in mid-2019 and is growing
            fast (x2-3 YoY). We doubled the team in 2020 (6), accelerated in 2021 (15), kept a
            similar pace in 2022 (25), and we plan to triple it in 2023 (75). We&apos;re looking for
            help to grow in the following areas:
          </Typography>
        </div>
        <Divider
          sx={(theme) => ({
            my: { xs: 2, sm: 4 },
            borderColor: 'grey.100',
            ...theme.applyDarkStyles({
              borderColor: 'primaryDark.600',
            }),
          })}
        />
        <Stack
          spacing={2}
          divider={
            <Divider
              sx={(theme) => ({
                my: { xs: 1, sm: 2 },
                borderColor: 'grey.100',
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.600',
                }),
              })}
            />
          }
        >
          {openRolesData.map((category) => {
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
                  <Typography color="text.secondary">No open roles.</Typography>
                )}
              </React.Fragment>
            );
          })}
        </Stack>
      </Container>
      {/* Next roles */}
      {nextRolesData.length > 0 ? (
        <Box data-mui-color-scheme="dark" sx={{ bgcolor: 'primaryDark.700' }}>
          <Container sx={{ py: { xs: 4, md: 8 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant="h2" sx={{ my: 1 }} id="next-roles">
                  Next roles
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 450 }}>
                  We hire in batches, we collect applications a few months before we actively aim to
                  fill the roles. If none of these roles fit with what you are looking for, you can
                  apply to the{' '}
                  <Link href="https://jobs.ashbyhq.com/MUI/4715d81f-d00f-42d4-a0d0-221f40f73e19/application?utm_source=ZNRrPGBkqO">
                    Dream job
                  </Link>{' '}
                  role.
                </Typography>
              </div>
            </Box>
            <Divider sx={{ my: { xs: 2, sm: 4 }, borderColor: 'primaryDark.600' }} />
            <Stack
              spacing={2}
              divider={<Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: 'primaryDark.600' }} />}
            >
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
          </Container>
        </Box>
      ) : null}
      {/* Frequently asked questions */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Typography variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
          Frequently asked questions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {renderFAQItem(0, true)}
            {renderFAQItem(1)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderFAQItem(2)}
            <Paper
              variant="outlined"
              sx={(theme) => ({
                p: 2,
                borderStyle: 'dashed',
                borderColor: 'grey.300',
                bgcolor: 'white',
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.400',
                  bgcolor: 'primaryDark.800',
                }),
              })}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  Got any questions unanswered or need more help?
                </Typography>
              </Box>
              <Typography variant="body2" color="text.primary" sx={{ my: 1, textAlign: 'left' }}>
                We&apos;re to help you with any other question you have about our hiring process.
              </Typography>
              <Link href="mailto:job@mui.com" variant="body2">
                Contact us <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Careers() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Careers - MUI"
        description="Interested in joining MUI? Learn about the roles we're hiring for."
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <CareersContent />
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
