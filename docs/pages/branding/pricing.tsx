import * as React from 'react';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import StartMaterialCard from 'docs/src/modules/branding/StartMaterialCard';
import ComparisonTable from 'docs/src/modules/branding/ComparisonTable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Dropdown from 'docs/src/modules/branding/icons/Dropdown';
import BrandingCard from 'docs/src/modules/branding/BrandingCard';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';

const startMaterialUi = [
  {
    id: 1,
    variant: 'light',
    src: '/static/branding/pricing/essential.svg',
    title: 'Essential',
    content:
      'Get started with the most popular and industry-standard UI libraries to build interfaces with React. Licensed MIT.',
    actualPrice: 0,
    price: 0,
    priceFor: 'Free forever!',
    priceDescription: '',
    buttonTitle: 'Get Started',
    isPriorityButton: false,
    featureTitle: 'Includes',
    features: [
      { id: 1, detail: 'Material-UI lifetime access and  lifetime updates', isLink: false },
      { id: 2, detail: 'Community/StackOverflow', isLink: false },
    ],
  },
  {
    id: 2,
    variant: 'light',
    src: '/static/branding/pricing/pro.svg',
    title: 'Pro',
    content: 'Best for professional developers building enterprise or data-rich applications.',
    actualPrice: 249,
    price: 129,
    priceFor: 'per developer',
    priceDescription: 'Capped after 10 developer/project',
    buttonTitle: 'Learn More',
    featureTitle: 'Everything in Essentials, plus',
    isPriorityButton: false,
    features: [
      {
        id: 1,
        detail: (
          <React.Fragment>
            Material-UI X package (grid and date picker included){' '}
            <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }} /> with 1 year of
            updates
          </React.Fragment>
        ),
        isLink: true,
        href: 'https://material-ui.com',
      },
      { id: 2, detail: 'Perpetual license', isLink: true, href: 'https://material-ui.com' },
    ],
  },
  {
    id: 3,
    variant: 'dark',
    src: '/static/branding/pricing/premium.svg',
    title: 'Premium',
    content: 'Unclock all the most advances features including premium support.',
    actualPrice: 0,
    price: 599,
    priceFor: 'per developer',
    priceDescription: 'Capped after 10 developer/project',
    buttonTitle: 'Learn More',
    featureTitle: 'Everything in Pro, plus Advanced support options',
    isPriorityButton: true,
    features: [
      { id: 1, detail: '24-hour response on all business days. ', isLink: false },
      { id: 2, detail: '1-hour of support per developer', isLink: false },
      { id: 3, detail: 'Perpetual license', isLink: true, href: 'https://material-ui.com' },
    ],
  },
];
function StartMaterialUi() {
  return (
    <Container>
      <Typography variant="h2" align="center" sx={{ mt: 8 }}>
        Start using Material-UI <UnderlinedText>for free!</UnderlinedText>
      </Typography>
      <Typography
        sx={{ fontSize: '18px', mt: 4, maxWidth: 670, mx: 'auto', textAlign: 'center', mb: 7.5 }}
      >
        Our free plan let's you get going right away. Switch to{' '}
        <Link href="/getting-started/usage/">Material-UI X</Link> to get more components & premium
        support.
      </Typography>
      <Container sx={{ px: { xs: 0 } }}>
        <Grid container>
          {startMaterialUi.map((data) => (
            <Grid item xs={12} md={12} lg={4} key={data.id}>
              <StartMaterialCard {...data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

const benefits = [
  {
    image: '/static/branding/pricing/fast.svg',
    color: undefined,
    description: 'Faster development process with pre-built elements.',
    order: { xs: 1, sm: 2, lg: 1 },
  },
  {
    image: '/static/branding/pricing/customizable.svg',
    color: 'info',
    description: 'Highly customisable components.',
    order: { xs: 2, sm: 1, lg: 2 },
  },
  {
    image: '/static/branding/pricing/community.svg',
    color: undefined,
    description: 'Strong community numbering 1M developers.',
    order: { xs: 3 },
  },
  {
    image: '/static/branding/pricing/documentation.svg',
    color: 'info',
    description: (
      <React.Fragment>
        Structured support documentation to help you{' '}
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }} />
        <Link href="/getting-started/usage/">Get started.</Link>
      </React.Fragment>
    ),
    order: { xs: 4 },
  },
];

function Benefits() {
  return (
    <Container sx={{ mt: [10, 18], mb: [12, 20] }}>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center', mt: 8, mb: 6 }}>
        Benefits included with <Box sx={{ display: { xs: 'none', md: 'block' } }} />
        all the plans
      </Typography>
      <Grid container spacing={4}>
        {benefits.map((benefit) => (
          <Grid
            item
            container
            direction="column"
            xs={12}
            sm={6}
            lg={3}
            sx={{ alignItems: 'center', order: benefit.order }}
            key={benefit.image}
          >
            <Avatar
              sx={{
                mb: 2,
                bgcolor: benefit.color === 'info' ? 'vividBlue' : 'primary.main',
                width: 80,
                height: 80,
              }}
            >
              <img loading="lazy" src={benefit.image} alt="" />
            </Avatar>
            <Typography component="p" sx={{ textAlign: 'center' }}>
              {benefit.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function ComparePlans() {
  return (
    <React.Fragment>
      <Typography variant="h2" align="center" sx={{ mt: 0 }}>
        <UnderlinedText>Compare</UnderlinedText> Plans
      </Typography>
      <Typography
        sx={{
          mt: 3,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',
          padding: { xs: '0 15px', md: 0, lg: 0 },
          mb: { sm: 6, xs: 0, lg: 10 },
          fontSize: '18px',
        }}
      >
        Compare Material-UI plans, see which one might fit you or your team. If you need further
        help deciding <Link href="/getting-started/support/">contact support</Link> or visit{' '}
        <Link href="/getting-started/usage/">community hub</Link>.
      </Typography>
      <ComparisonTable />
    </React.Fragment>
  );
}
function WhatToExpect() {
  return (
    <Container sx={{ mt: [10, 18], mb: [12, 20] }}>
      <Typography variant="h2" sx={{ mb: 10 }}>
        Here's <UnderlinedText>what to expect</UnderlinedText>
        <br />
        from Material-UI
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BrandingCard
            color="emerald"
            image="/static/branding/pricing/fast.svg"
            title="Volume Discount"
          >
            <Typography sx={{ mt: 2 }}>
              The licenses are on a per-developer basis. We offer the following tiered discounts
              from list prices when purchasing more than one license for your development team:
              <ul>
                <li>
                  – 2-5 Licenses: <strong>10% discount</strong>
                </li>
                <li>
                  – 6-10 Licenses: <strong>15% discount</strong>
                </li>
              </ul>
              If you require more than 10 licenses, contact us by email at{' '}
              <Link href="mailto:sales@material-ui.com">sales@material-ui.com</Link>.
            </Typography>
          </BrandingCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrandingCard
            color="vividBlue"
            image="/static/branding/pricing/customizable.svg"
            title="Perpetual License"
          >
            <Typography sx={{ mt: 2 }}>
              When you purchase,{' '}
              <strong>
                you are granted a license to use a version of the product in perpetuity
              </strong>
              . There are no further charges until you choose to extend your license to cover newer
              versions.
              <br />
              <br />
              Please note that while the use of the software is perpetual, support and corrective
              maintenance are not. We do not provide issue resolution to versions older than 12
              months. We roll bug fixes, performance enhancements, and other improvements into new
              releases; we don't patch, fix or in any way alter older versions.
            </Typography>
          </BrandingCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrandingCard
            image="/static/branding/pricing/community.svg"
            title="One year subscription to new versions"
          >
            <Typography sx={{ mt: 2 }}>
              When you make a purchase{' '}
              <strong>you get a subscription to license new versions for 365 days</strong>. Check
              the{' '}
              <Link href="https://github.com/mui-org/material-ui-x/blob/next/CHANGELOG.md">
                change log
              </Link>
              . After 1 year (or up to 5 years if you choose an extension package) you will no
              longer be allowed to use the latest versions without renewing your subscription. You
              can continue to use your licensed versions in perpetuity.
              <br />
              <br />
              Please note that while the use of the software is perpetual, support and corrective
              maintenance are not. We roll bug fixes, performance enhancements, and other
              improvements into new releases; we don't patch, fix or in any way alter older
              versions.
            </Typography>
          </BrandingCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrandingCard
            color="emerald"
            image="/static/branding/pricing/documentation.svg"
            title="Subscription Renewal"
          >
            <Typography sx={{ mt: 2 }}>
              At the end of your subscription period, you will no longer be able to license the
              latest versions or access support without renewing. This could range from 366 days up
              to a 5-year term.{' '}
              <strong>
                Renewal pricing is substantially lower than first-year subscription costs
              </strong>
              .
              <br />
              <br />
              Please note that while the use of the software is perpetual, access to new features,
              support and corrective maintenance are not. We do not provide issue resolution to
              versions older than 12 months. We roll bug fixes, performance enhancements, and other
              improvements into new releases; we don't patch, fix or in any way alter older
              versions.
            </Typography>
          </BrandingCard>
        </Grid>
      </Grid>
    </Container>
  );
}

const faqData = [
  {
    summary: 'Why are you calling it early access?',
    detail:
      "We think you’ll love the components we've built so far, but we're planning to release more. We opened it up as soon as we had something useful, so that you can start getting value from it right away, and we'll be adding new features and components based on our own ideas, and on suggestions from early access customers.",
  },
  {
    summary: 'How many licenses do I need?',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus exsit amet blandit leo lobortis eget.',
  },
  {
    summary: 'Am I allowed to use the product after 1-year subscription expires?',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus exsit amet blandit leo lobortis eget.',
  },
  {
    summary: 'What is the policy on redistributing the software?',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus exsit amet blandit leo lobortis eget.',
  },
  {
    summary: 'Do you offer discounts to educational and non-profit organizations?',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus exsit amet blandit leo lobortis eget.',
  },
];

function FAQ() {
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: 'auto !important',
      borderRadius: '0px',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      '&:not(:first-child)': {
        borderTop: 0,
      },
      '&:after': {
        display: 'none',
      },
    },
    content: {
      margin: '0 !important',
      minHeight: 'auto !important',
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    // expanded: {
    //   paddingTop: '30px',
    //   paddingBottom: '20px',
    // },
    // expandIcon: {
    //   margin: '0 !important',
    //   minHeight: 'auto !important',
    // },
  }));
  const classes = useStyles();
  return (
    <Container>
      <Typography
        variant="h2"
        align="center"
        sx={{ mt: { xs: 10, md: 12, lg: 14 }, mb: { xs: 4, lg: 10 } }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ mt: 10, maxWidth: '770px', margin: ' 0 auto' }}>
        {faqData.map((faq) => (
          <Accordion
            key={faq.summary}
            sx={{
              boxShadow: 'none',
              margin: '0px !important',
            }}
            classes={{ root: classes.root }}
          >
            <AccordionSummary
              expandIcon={<Dropdown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ minHeight: 'auto !important', padding: '30px 0' }}
            >
              <Typography variant="h4" component="p">
                {faq.summary}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px 0 30px 0' }}>
              <Typography sx={{ fontSize: '18px' }}>{faq.detail}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
const Support = () => {
  return (
    <Container>
      <Box>Support</Box>
    </Container>
  );
};
export default function Pricing() {
  return (
    <BrandingRoot>
      <StartMaterialUi />
      <Benefits />
      <ComparePlans />
      <WhatToExpect />
      <FAQ />
      {/* <Support /> */}
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
