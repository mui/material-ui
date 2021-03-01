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
import { experimentalStyled as styled } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Dropdown from 'docs/src/modules/branding/icons/Dropdown';
import BrandingCard from 'docs/src/modules/branding/BrandingCard';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';
import HelpIcon from 'docs/src/modules/branding/icons/Help';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const startMaterialUi = [
  {
    id: 1,
    variant: 'light',
    src: '/static/branding/pricing/essential.svg',
    title: 'Essential',
    content:
      'Get started with the most popular and industry-standard UI library to build interfaces with React. MIT licensed.',
    actualPrice: 0,
    price: 0,
    priceFor: 'Free forever!',
    priceDescription: '',
    buttonTitle: 'Get Started',
    isPriorityButton: false,
    featureTitle: 'Includes',
    features: [
      { id: 1, detail: 'Material-UI lifetime access and lifetime updates', isLink: false },
      { id: 2, detail: 'Access to the contributions of the community', isLink: false },
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
    priceDescription: 'Capped at 10 developers',
    buttonTitle: 'Learn More',
    featureTitle: 'Includes',
    isPriorityButton: false,
    features: [
      { id: 1, detail: 'Everything in Community edition', isLink: false },
      {
        id: 2,
        detail: (
          <React.Fragment>
            Material-UI X package (grid and date picker included){' '}
            <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }} />
            with 1 year of updates
          </React.Fragment>
        ),
        isLink: true,
        href: 'https://material-ui.com',
      },
      { id: 3, detail: 'Perpetual license', isLink: true, href: 'https://material-ui.com' },
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
    priceDescription: 'Capped at 10 developers per project',
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
      <Typography component="h1" variant="h2" align="center" sx={{ mt: 8 }}>
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
  },
  {
    image: '/static/branding/pricing/documentation.svg',
    color: 'info',
    description: 'Outstanding documentation and support.',
  },
  {
    image: '/static/branding/pricing/customizable.svg',
    color: undefined,
    description: 'Highly customisable components.',
    order: { xs: 0, sm: 1, lg: 0 },
  },
  {
    image: '/static/branding/pricing/community.svg',
    color: 'info',
    description: 'Strong community numbering 2m developers.',
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
      <Typography variant="h2" align="center">
        <UnderlinedText>Compare</UnderlinedText> Plans
      </Typography>
      <Typography
        sx={{
          mt: 3,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',
          p: { xs: '0 15px', md: 0 },
          mb: { xs: 0, sm: 6, lg: 10 },
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
    <Box
      component="div"
      sx={{
        bgcolor: 'greyF3',
        position: 'relative',
        pt: 15,
        pb: 23,
        mt: { xs: 20, sm: 25 },
        mb: { xs: 12, sm: 15 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          right: '20px',
          top: '-78px',
        }}
      />
      <Box
        component="img"
        src="/static/branding/block2-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-40px',
          left: '60px',
        }}
      />
      <Container>
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
              <Box sx={{ mt: 2 }}>
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
              </Box>
            </BrandingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <BrandingCard
              color="vividBlue"
              image="/static/branding/pricing/customizable.svg"
              title="Perpetual License"
            >
              <Box sx={{ mt: 2 }}>
                When you purchase,{' '}
                <strong>
                  you are granted a license to use a version of the product in perpetuity
                </strong>
                . There are no further charges until you choose to extend your license to cover
                newer versions.
                <br />
                <br />
                Please note that while the use of the software is perpetual, support and corrective
                maintenance are not. We do not provide issue resolution to versions older than 12
                months. We roll bug fixes, performance enhancements, and other improvements into new
                releases; we don't patch, fix or in any way alter older versions.
              </Box>
            </BrandingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <BrandingCard
              image="/static/branding/pricing/community.svg"
              title="1-year subscription to new versions"
            >
              <Box sx={{ mt: 2 }}>
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
              </Box>
            </BrandingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <BrandingCard
              color="emerald"
              image="/static/branding/pricing/documentation.svg"
              title="Subscription renewal"
            >
              <Box sx={{ mt: 2 }}>
                While the use of the software is perpetual, access to new features, support and
                corrective maintenance are not. At the end of your subscription period, you will
                need to renew your license to access updates and support.{' '}
                <b>Renewal pricing is 50% than first-year subscription costs.</b> The renewal can
                range from 366 days up to a five-year term.
                <br />
                <br />
                We roll bug fixes, performance enhancements, and other improvements{' '}
                <b>from the latest version</b>. We don't patch, fix or cherry-pick fixes on older
                versions.
              </Box>
            </BrandingCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function WhyEnterprises() {
  return (
    <Container sx={{ mt: 2.5, textAlign: 'center' }}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontSize: { xs: '40px', sm: '48px', lg: '52px' },
          lineHeight: { xs: '48px', sm: '56px', lg: '60px' },
          mb: { xs: 8, sm: 10 },
          px: { xs: 0, sm: 8 },
        }}
      >
        Here’s why enterprises{' '}
        <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
        also use Material-UI
      </Typography>
      <Grid container alignItems="center" sx={{ px: { xs: 0, sm: 4 } }}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              maxWidth: '470px',
              height: '470px',
              bgcolor: 'greyAA',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <img alt="" src={'/static/branding/pricing/rectangle.jpg'} loading="lazy" />
          </Box>
        </Grid>
        <Grid textAlign="left" item xs={12} sm={6} sx={{ pl: { sm: 3.5, lg: 6 } }}>
          <Box
            component="img"
            src="/static/branding/pricing/netflix-enterprise.svg"
            loading="lazy"
            alt=""
            sx={{ mb: 3 }}
          />
          <Typography
            component="p"
            variant="h4"
            sx={{
              maxWidth: '470px',
              fontSize: { xs: '24px', sm: '28px', lg: '36px' },
              lineHeight: { xs: '32px', sm: '36px', lg: '44px' },
            }}
          >
            “With Material-UI we can roll out MVP’s much faster. This makes our product development
            team more agile in testing and releasing new updates.”
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 3,
              '& img': {
                mr: 2,
                borderRadius: '50%',
              },
            }}
          >
            <img
              width="48"
              height="48"
              loading="lazy"
              src={'/static/branding/pricing/avatar.svg'}
              alt=""
            />
            <Typography variant="body2" fontSize="16px" lineHeight="24px">
              <b>Joshua Smith</b>, CTO at Netflix
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const faqData = [
  {
    summary: 'Why are you calling it "early access"?',
    detail: (
      <React.Fragment>
        We think you’ll love the features we've built so far, but we're planning to release more. We
        opened it up as soon as we had something useful so that you can start getting value from it
        right away, and we'll be adding new features and components based on our own ideas, and on
        suggestions from early access customers.
      </React.Fragment>
    ),
  },
  {
    summary: 'How many licenses do I need?',
    detail: (
      <React.Fragment>
        The number of licenses purchased must correspond to the number of concurrent developers
        contributing changes to the front-end code of a project that uses Material-UI X. However,
        the number of developers required is capped at 10 developers for the <b>Pro plan</b> and 10
        developers/project for the <b>Premium plan</b>, developers above this limit don't need to be
        licensed.
        <br />
        <br />
        Example 1. Company ‘A’ is developing an application named ‘AppA’. The app needs to render
        10K rows of data in a table and allow users to group, filter, and sort. The dev team adds
        Material-UI X to the project to satisfy that requirement. 5 front-end and 10 back-end
        developers are working on ‘AppA’. Only 1 developer is tasked with configuring and modifying
        the data grid. The front-end developers and only are contributing code to the front-end.
        Company ‘A’ purchases 5 licenses.
        <br />
        <br />
        Example 2. A UI development team at Company ‘A’ creates its own UI library for internal
        development and includes Material-UI-X as a component. The team working on ‘AppA’ uses the
        new library and so does the team working on ‘AppB’. ‘AppA’ has 5 front-end developers and
        ‘AppB’ has 3. There are 2 front-end developers on the UI development team. Company ‘B’
        purchases 10 licenses.
      </React.Fragment>
    ),
  },
  {
    summary: 'How to remove the "Unlicensed product" watermark?',
    detail: (
      <React.Fragment>
        After you purchase a license, you'll receive a license key by email (if you didn't, check
        the spam folder). Once you have the license key, you need to follow the{' '}
        <Link href="/components/data-grid/getting-started/#license-key-installation">
          instructions
        </Link>{' '}
        necessary to set it up.
      </React.Fragment>
    ),
  },
  {
    summary: 'Do developers have to be named?',
    detail: (
      <React.Fragment>
        No. We trust that you will not go over the number of licensed developers. Developers moving
        on and off projects is expected occasionally, and the license can be transferred between
        developers at that time.
      </React.Fragment>
    ),
  },
  {
    summary: 'Am I allowed to use the product after 1-year subscription expires?',
    detail: (
      <React.Fragment>
        The licenses are perpetual, you are allowed to continue using the products even after the
        1-year subscription expires. However, you will be using the last product version released
        before your license expired. You will lose access to new functionality and updates, as well
        as technical support.
        <br />
        <br />
        If you wish to preserve your access to product updates (new features and fixes) and
        dedicated support, you need to renew your license, please contact sales.
      </React.Fragment>
    ),
  },
  {
    summary: 'What is the policy on redistributing the software?',
    detail: (
      <React.Fragment>
        Our developer licenses are royalty-free - the licensed entity can use our tools in:
        <ul>
          <li>Solutions for internal company use</li>
          <li>Hosted applications</li>
          <li>Commercial solutions deployed for end-customers by our customers</li>
        </ul>
        There are only 2 limitations that require additional discussion with our sales team:
        <ul>
          <li>
            A product that exposes the components in a form that allows for using them to build
            applications, for example, in a CMS or a design-builder.
          </li>
          <li>
            Modules/components that DO NOT add significant primary functionality. Example: a theme
            for a set of components that is sold as a separate product and includes the XGrid
            components. In such cases, we offer reseller arrangements so that everyone has an
            incentive to enter into a relationship.
          </li>
        </ul>
        If your desired use falls under any of the three categories listed above, please contact
        sales. We will be happy to discuss your needs and see what we can do to accommodate your
        case.
      </React.Fragment>
    ),
  },
  {
    summary: 'Do you offer discounts to educational and non-profit organizations?',
    detail: (
      <React.Fragment>
        Yes, we offer a 50% discount on any product license to educational, non-profit, and charity
        entities. This special discount cannot be combined with any other type of discount.
        <br />
        <br />
        To qualify for the discount, you need to send us a document clearly indicating that you are
        a member of the respective institution. An email from your official account which bears your
        signature is sufficient in most cases.
        <br />
        <br />
        For more information on how to qualify for a discount, please contact sales.
      </React.Fragment>
    ),
  },
];

const Accordion = styled(MuiAccordion)({
  boxShadow: 'none',
  '&.Mui-expanded': {
    margin: 0,
    '&:before': {
      opacity: 1,
    },
  },
});

const AccordionSummary = styled(MuiAccordionSummary)({
  minHeight: 'auto',
  padding: '30px 0',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    minHeight: 'auto',
  },
});

function FAQ() {
  return (
    <Container>
      <Typography
        variant="h2"
        align="center"
        sx={{ mt: { xs: 12, sm: 20, lg: 15 }, mb: { xs: 4, sm: 5, lg: 11 } }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ mt: 10, maxWidth: '770px', m: '0 auto' }}>
        {faqData.map((faq) => (
          <Accordion key={faq.summary}>
            <AccordionSummary expandIcon={<Dropdown />}>
              <Typography variant="h4">{faq.summary}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0, pb: 3.5 }}>
              <Typography sx={{ fontSize: '18px' }} component="div">
                {faq.detail}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

const customerIcons = [
  { image: '/static/branding/pricing/coursera.svg' },
  { image: '/static/branding/pricing/amazon.svg' },
  { image: '/static/branding/pricing/nasa.svg' },
  { image: '/static/branding/pricing/netflix.svg' },
  { image: '/static/branding/pricing/unity.svg' },
  { image: '/static/branding/pricing/shutterstock.svg' },
];

const Support = () => {
  return (
    <React.Fragment>
      <Container sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            width: '64px',
            height: '64px',
            m: '0 auto',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            mt: 2.3,
          }}
        >
          <HelpIcon />
        </Box>
        <Typography
          align="center"
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '26px',
            mb: 1.5,
          }}
        >
          Need help?
        </Typography>
        <Typography align="center" sx={{ fontSize: '18px', lineHeight: '24px', mb: 4 }}>
          From community help to premium
          <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} /> business support,
          <Box component="span" sx={{ display: 'block' }} />
          we’re here to help.
        </Typography>
        <Button
          component={Link}
          href="/getting-started/usage/"
          size="medium"
          variant="contained"
          endIcon={<NavigateNextIcon />}
          color="secondary"
        >
          View Support
        </Button>
      </Container>
      <Container>
        <Grid container sx={{ mt: { xs: 8, sm: 11, lg: 15 }, alignItems: 'center' }}>
          {customerIcons.map((customer) => (
            <Grid
              item
              container
              xs={6}
              sm={4}
              lg={2}
              key={customer.image}
              sx={{ justifyContent: 'center', my: { xs: 4, lg: 0 } }}
            >
              <img loading="lazy" src={customer.image} alt="" />
            </Grid>
          ))}
        </Grid>
        <Typography
          align="center"
          sx={{ color: 'grey5A', mt: { sm: 3, lg: 7 }, mb: { xs: 10, sm: 10, lg: 15 } }}
        >
          From startups to Fortune 500s, the world's
          <Box component="span" sx={{ display: 'block' }} />
          best product teams use Material-UI.
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default function Pricing() {
  return (
    <BrandingRoot>
      <StartMaterialUi />
      <Benefits />
      <ComparePlans />
      <WhatToExpect />
      <WhyEnterprises />
      <FAQ />
      <Support />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
