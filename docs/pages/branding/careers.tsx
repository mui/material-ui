import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import { ThemeProvider as MuiThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import Link from 'docs/src/modules/components/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import { MuiStats } from 'docs/src/components/home/Testimonials';
import GradientText from 'docs/src/components/typography/GradientText';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
import IconImage from 'docs/src/components/icon/IconImage';
import BrandingProvider from 'docs/src/BrandingProvider';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
import ROUTES from 'docs/src/route';

const Role = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: { xs: 'start', sm: 'center' },
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    <div>
      <Typography variant="body1" color="text.primary" fontWeight={600} sx={{ my: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1, maxWidth: 700 }}>
        {description}
      </Typography>
    </div>
    {url && (
      <div style={{ display: 'flex', alignSelf: 'start', paddingTop: '0.5em' }}>
        <Link href={url} variant="body2">
          More about this role <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
        </Link>
      </div>
    )}
  </Box>
);

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
    detail: (
      <React.Fragment>
        No. If a job is visible on our careers page, then you can still apply.
      </React.Fragment>
    ),
  },
  {
    summary: 'Does MUI do whiteboarding during interviews?',
    detail: (
      <React.Fragment>
        No. We ask applicants to complete challenges that are close to their future day-to-day
        contributions.
      </React.Fragment>
    ),
  },
  {
    summary: 'Does MUI offer contract job opportunities?',
    detail: (
      <React.Fragment>
        Yes. People outside of France will be hired as full-time contractors. (Benefits may vary.)
      </React.Fragment>
    ),
  },
];

const openRolesData = {
  engineering: [
    {
      title: 'Full-stack Engineer',
      description:
        'You will initiate the development of a bold new product vertical. We are looking for an experienced and ambitious full-stack engineer that is ready to work in an entrepreneurial environment. You are a manager of one, you are curious, enjoy taking risks, and learning.',
      url: '/company/full-stack-engineer/',
    },
    {
      title: 'React Engineer',
      description:
        'You will support the advanced components team, build new ambitious complex features, work on strategic problems, and help grow the adoption of the free open-source tier (freemium/open-core business model).',
      url: '/company/react-engineer/',
    },
  ],
  product: [
    {
      title: 'Technical Product Manager',
      description:
        'You will define and maintain the product roadmap for the advanced components, identify opportunities, define specs, and work with engineers to execute on the features. Experience as an engineer is essential for this role, as you will also contribute to development work in the beginning.',
      url: '/company/technical-product-manager/',
    },
    {
      title: 'Product Manager',
      description:
        'You will initiate the exploration of a bold new product vertical. We are looking for an experienced and ambitious product manager who is ready to work in an entrepreneurial environment. You are a manager of one, you are curious, enjoy taking risks, and learning.',
      url: '/company/product-manager/',
    },
    {
      title: 'Developer Advocate',
      description:
        'You will educate users on the latest features, craft high-quality examples and demos, engage with the community, write documentation, advocate for creating faster and more appealing UIs, and help to promote/market the advanced components.',
      url: '/company/developer-advocate/',
    },
  ],
};

const futureRolesData = {
  product: [
    {
      title: 'Product Designer',
      description:
        'Design is critical to the success of our mission. We will be looking for skills that complement our lead designer. It could be a graphic designer or a UX expert for instance, depending on our exact needs.',
    },
  ],
  operations: [
    {
      title: 'Head of talent',
      description:
        'Recruit an exceptional team and lay the foundations for a modern corporation. We will be looking for a self-starter who acts as a strategic designer, builder, and champion for our engineering-centric and customer-oriented culture. They will serve as part of the company’s leadership team, collaborating to continuously evolve our high-performance, high-engagement crew.',
    },
  ],
  customerSuccess: [
    {
      title: 'Support Engineer',
      description:
        'Ensure that our users wildly succeed on their journey with MUI. You’ll directly work with users, customers, and potential customers to unblock them from using the products, triage and resolve issues, and use this direct feedback to drive direct improvements in MUI.',
    },
  ],
};

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
            Our mission is to empower anyone to build UIs, faster. We&apos;re reducing the entry
            barrier, making design skills accessible.
          </Typography>
        </Box>
      </Container>
      {/* Our ultimate goal */}
      <Box
        sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50') }}
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
                  <Typography variant="body2" color="text.primary" fontWeight={600} sx={{ ml: 1 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <MuiStats />
          </Grid>
        </Container>
      </Box>
      {/* Perks & benefits */}
      <Box>
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Grid container alignItems="center" spacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ my: 1 }}>
                {'Perks & benefits'}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                To help you go above and beyond with us, we provide:
              </Typography>
              {[
                ['Remote work:', 'Our entire company is distributed.'],
                [
                  'Gatherings:',
                  'We meet up once or twice a year for a short week of meetings, events, and fun!',
                ],
                [
                  'Equipment:',
                  'MUI will let you choose new hardware of your choice (up to $2,500 USD).',
                ],
                ['Time off:', 'We provide five weeks of paid time off.'],
              ].map((textArray) => (
                <Box key={textArray[0]} sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                  <IconImage name="yes" />
                  <Typography variant="body2" color="text.primary" sx={{ ml: 1 }}>
                    <span style={{ fontWeight: 600 }}>{`${textArray[0]}  `}</span>
                    {textArray[1]}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
                  color={(theme) => (theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600')}
                  variant="body2"
                  fontWeight="bold"
                >
                  Learn more{' '}
                  <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
                  color={(theme) => (theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600')}
                  variant="body2"
                  fontWeight="bold"
                >
                  Learn more{' '}
                  <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Open roles */}
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Typography variant="h2" sx={{ my: 1 }}>
              Open roles
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 450 }}>
              The company is bootstrapped (so far). It was incorporated in mid-2019 and yet growing
              fast (x2-3 YoY). We doubled the team in 2020 and are on track to do the same in 2021.
              We&apos;re looking for help keep growing in the following areas:
            </Typography>
          </div>
        </Box>
        <Divider
          sx={{
            my: { xs: 2, sm: 4 },
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
          }}
        />
        <Typography
          component="h3"
          variant="h5"
          color="primary"
          fontWeight="extraBold"
          sx={{ mb: 2 }}
        >
          Engineering
        </Typography>
        {openRolesData.engineering.map((role) => (
          <React.Fragment>
            <Role title={role.title} description={role.description} url={role.url} />
            <Divider
              sx={{
                my: { xs: 1, sm: 2 },
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
              }}
            />
          </React.Fragment>
        ))}
        <Typography
          component="h3"
          variant="h5"
          color="primary"
          fontWeight="extraBold"
          sx={{ mb: 2 }}
        >
          Product
        </Typography>
        {openRolesData.product.map((role, idx, arr) => (
          <React.Fragment>
            <Role title={role.title} description={role.description} url={role.url} />
            {idx < arr.length - 1 && (
              <Divider
                sx={{
                  my: { xs: 1, sm: 2 },
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Container>
      {/* Future roles */}
      <MuiThemeProvider theme={brandingDarkTheme}>
        <Box
          sx={{
            bgcolor: 'primaryDark.700',
          }}
        >
          <Container sx={{ py: { xs: 4, md: 8 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant="h2" sx={{ my: 1 }}>
                  Future roles
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 450 }}>
                  In the future, we will need to fill the following positions. If you don&apos;t
                  want to wait for the positions to be opened, you can jump ahead and submit an open
                  application.
                </Typography>
              </div>
            </Box>
            <Divider sx={{ my: { xs: 2, sm: 4 }, borderColor: 'primaryDark.600' }} />
            <Typography
              component="h3"
              variant="h5"
              color="primary"
              fontWeight="extraBold"
              sx={{ mb: 2 }}
            >
              Engineering
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              No plans yet.
            </Typography>
            <Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: 'primaryDark.600' }} />
            <Typography
              component="h3"
              variant="h5"
              color="primary"
              fontWeight="extraBold"
              sx={{ mb: 2 }}
            >
              Product
            </Typography>
            {futureRolesData.product.map((role) => (
              <React.Fragment>
                <Role title={role.title} description={role.description} />
                <Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: 'primaryDark.600' }} />
              </React.Fragment>
            ))}
            <Typography
              component="h3"
              variant="h5"
              color="primary"
              fontWeight="extraBold"
              sx={{ mb: 2 }}
            >
              Operations
            </Typography>
            {futureRolesData.operations.map((role) => (
              <React.Fragment>
                <Role title={role.title} description={role.description} />
                <Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: 'primaryDark.600' }} />
              </React.Fragment>
            ))}
            <Typography
              component="h3"
              variant="h5"
              color="primary"
              fontWeight="extraBold"
              sx={{ mb: 2 }}
            >
              Customer Success
            </Typography>
            {futureRolesData.customerSuccess.map((role, idx, arr) => (
              <React.Fragment>
                <Role title={role.title} description={role.description} />
                {idx < arr.length - 1 && (
                  <Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: 'primaryDark.600' }} />
                )}
              </React.Fragment>
            ))}
          </Container>
        </Box>
      </MuiThemeProvider>
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
              sx={{
                p: 2,
                borderStyle: 'dashed',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'white'),
              }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  Got any questions unanswered or need more help?
                </Typography>
              </Box>
              <Typography variant="body2" color="text.primary" sx={{ my: 1, textAlign: 'left' }}>
                We&apos;re to help you with any other question you have about our hiring process.
              </Typography>
              <Link href="mailto:contact@mui.com" variant="body2">
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
    <BrandingProvider>
      <Head
        title="Careers - MUI"
        description="MUI (formerly MUI) started back in 2014 to unify React and Material Design. Today, MUI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <AppHeader />
      <main>
        <CareersContent />
      </main>
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
