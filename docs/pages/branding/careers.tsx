import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Link from 'docs/src/modules/components/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import { MuiStats } from 'docs/src/components/home/Testimonials';
import GradientText from 'docs/src/components/typography/GradientText';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
import IconImage from 'docs/src/components/icon/IconImage';
import BrandingProvider from 'docs/src/BrandingProvider';

const Widget = ({
  title,
  children,
  url,
  linkText,
}: {
  title: string;
  children: React.ReactNode;
  url: string;
  linkText?: string;
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: '100%',
        p: 2,
      }}
    >
      <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {children}
      <Link href={url} variant="body2">
        {linkText || 'Learn more'} <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
      </Link>
    </Paper>
  );
};

const Question = ({
  question,
  children,
  defaultShowAnswer = false,
}: {
  question: string;
  children: React.ReactNode;
  defaultShowAnswer?: boolean;
}) => {
  const [showAnswer, setShowAnswer] = React.useState(defaultShowAnswer);
  return (
    <Paper variant="outlined" sx={{ height: '100%', p: 2 }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="div" variant="body2" fontWeight="bold">
          {question}
        </Typography>
        <span
          role="button"
          onClick={() => setShowAnswer(!showAnswer)}
          onKeyDown={() => setShowAnswer(!showAnswer)}
          tabIndex={0}
        >
          {showAnswer ? (
            <KeyboardArrowUpRounded color="primary" fontSize="small" sx={{ mt: '1px' }} />
          ) : (
            <KeyboardArrowDownRounded color="primary" fontSize="small" sx={{ mt: '1px' }} />
          )}
        </span>
      </div>
      {showAnswer && children}
    </Paper>
  );
};

const Role = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <Typography variant="body2" color="text.primary" fontWeight={600} sx={{ my: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1, maxWidth: 450 }}>
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
            Build the <GradientText>next generation</GradientText> of tools for UI development.
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
          <Grid container alignItems="center" spacing={4}>
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
            <Grid item xs={6} md={3}>
              <Widget
                title="Handbook"
                url={'https://www.notion.so/mui-org/Handbook-f086d47e10794d5e839aef9dc67f324b'}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  See how we run the company and the way we work.
                </Typography>
              </Widget>
            </Grid>
            <Grid item xs={6} md={3}>
              <Widget title="Blog" url={'https://medium.com/material-ui'}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Check behind the scenes and news from the company.
                </Typography>
              </Widget>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Open roles */}
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <div style={{ display: 'flex', alignSelf: 'start', paddingTop: '0.5em' }}>
            <Typography fontWeight="bold">All areas</Typography>
            <ArrowDropDown color="primary" fontSize="small" sx={{ ml: '1em' }} />
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
        <Role
          title="Full-stack Engineer"
          description="You will initiate the development of a bold new product vertical. We are looking for an experienced and ambitious full-stack engineer that is ready to work in an entrepreneurial environment. You are a manager of one, you are curious, enjoy taking risks, and learning."
          url="https://material-ui.com/company/full-stack-engineer/"
        />
        <Divider
          sx={{
            my: { xs: 1, sm: 2 },
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
          }}
        />
        <Role
          title="React Engineer"
          description="You will support the advanced components team, build new ambitious complex features, work on strategic problems, and help grow the adoption of the free open-source tier (freemium/open-core business model)."
          url="https://material-ui.com/company/react-engineer/"
        />
        <Divider
          sx={{
            my: { xs: 1, sm: 2 },
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
          Product
        </Typography>
        <Role
          title="Technical Product Manager"
          description="You will define and maintain the product roadmap for the advanced components, identify opportunities, define specs, and work with engineers to execute on the features. Experience as an engineer is essential for this role, as you will also contribute to development work in the beginning."
          url="https://material-ui.com/company/technical-product-manager/"
        />
        <Divider
          sx={{
            my: { xs: 1, sm: 2 },
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
          }}
        />
        <Role
          title="Product Manager"
          description="You will initiate the exploration of a bold new product vertical. We are looking for an experienced and ambitious product manager who is ready to work in an entrepreneurial environment. You are a manager of one, you are curious, enjoy taking risks, and learning."
          url="https://material-ui.com/company/product-manager/"
        />
        <Divider
          sx={{
            my: { xs: 1, sm: 2 },
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
          }}
        />
        <Role
          title="Developer Advocate"
          description="You will educate users on the latest features, craft high-quality examples and demos, engage with the community, write documentation, advocate for creating faster and more appealing UIs, and help to promote/market the advanced components."
          url="https://material-ui.com/company/developer-advocate/"
        />
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
              <div style={{ display: 'flex', alignSelf: 'start', paddingTop: '0.5em' }}>
                <Typography color="text.secondary" fontWeight="bold">
                  All areas
                </Typography>
                <ArrowDropDown color="primary" fontSize="small" sx={{ ml: '1em' }} />
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
            <Role
              title="Product Designer"
              description="Design is critical to the success of our mission. We will be looking for skills that complement our lead designer. It could be a graphic designer or a UX expert for instance, depending on our exact needs."
            />
            <Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: 'primaryDark.600' }} />
            <Typography
              component="h3"
              variant="h5"
              color="primary"
              fontWeight="extraBold"
              sx={{ mb: 2 }}
            >
              Operations
            </Typography>
            <Role
              title="Head of talent"
              description="Recruit an exceptional team and lay the foundations for a modern corporation. We will be looking for a self-starter who acts as a strategic designer, builder, and champion for our engineering-centric and customer-oriented culture. They will serve as part of the company’s leadership team, collaborating to continuously evolve our high-performance, high-engagement crew."
            />
            <Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: 'primaryDark.600' }} />
            <Typography
              component="h3"
              variant="h5"
              color="primary"
              fontWeight="extraBold"
              sx={{ mb: 2 }}
            >
              Customer Success
            </Typography>
            <Role
              title="Support Engineer"
              description="Ensure that our users wildly succeed on their journey with Material-UI. You’ll directly work with users, customers, and potential customers to unblock them from using the products, triage and resolve issues, and use this direct feedback to drive direct improvements in Material-UI."
            />
          </Container>
        </Box>
      </MuiThemeProvider>
      {/* Frequently asked questions */}
      <Box>
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Typography variant="h2" sx={{ my: 1 }}>
            Frequently Asked Questions
          </Typography>
          <Grid container alignItems="start" spacing={3} sx={{ my: 1 }}>
            <Grid item xs={12} md={6}>
              <Question question="Are there application deadlines?" defaultShowAnswer>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No. If a job is visible on our careers page, then you can still apply.
                </Typography>
              </Question>
            </Grid>
            <Grid item xs={12} md={6}>
              <Question question="Does MUI do whiteboarding during interviews?">
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No. We ask applicants to complete challenges that are close to their future
                  day-to-day contributions.
                </Typography>
              </Question>
            </Grid>
            <Grid item xs={12} md={6}>
              <Question question="Does MUI offer contract job opportunities?">
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Yes. People outside of France will be hired as full-time contractors. (Benefits
                  may vary.)
                </Typography>
              </Question>
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget
                title="Got any questions unanswered or need more help?"
                url={'mailto:contact@material-ui.com'}
                linkText="Contact us"
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  We&apos;re to help you with any other question you have about our hiring process.
                </Typography>
              </Widget>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default function Careers() {
  return (
    <BrandingProvider>
      <Head
        title="Careers - MUI"
        description="MUI (formerly Material-UI) started back in 2014 to unify React and Material Design. Today, MUI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <AppHeader />
      <main>
        <CareersContent />
      </main>
      <AppFooter />
    </BrandingProvider>
  );
}
