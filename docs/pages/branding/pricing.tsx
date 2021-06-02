import * as React from 'react';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Head from 'docs/src/modules/components/Head';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import StartMaterialCard from 'docs/src/modules/branding/StartMaterialCard';
import ComparisonTable from 'docs/src/modules/branding/ComparisonTable';
import { styled } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetail from '@material-ui/core/AccordionDetails';
import Dropdown from 'docs/src/modules/branding/icons/Dropdown';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';
import BrandingCard from 'docs/src/modules/branding/BrandingCard';
import BrandingCustomerIcons from 'docs/src/modules/branding/BrandingCustomerIcons';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';
import HelpIcon from 'docs/src/modules/branding/icons/Help';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const startMaterialUi = [
  {
    variant: 'light',
    src: '/static/branding/pricing/community-plan.svg',
    href: '/getting-started/usage/',
    imgProps: { height: 60, width: 52 },
    title: 'Community',
    content:
      'Get started with Material-UI – the most popular library for building interfaces with React. MIT licensed.',
    actualPrice: 0,
    price: 0,
    priceFor: 'Free forever!',
    priceDescription: '',
    buttonTitle: 'Get started',
    isPriorityButton: false,
    featureTitle: 'Includes',
    features: [
      { detail: 'Lifetime access and updates' },
      { detail: 'Access to approved community contributions' },
    ],
  },
  {
    variant: 'light',
    src: '/static/branding/pricing/pro.svg',
    href: '/components/data-grid/',
    imgProps: { height: 60, width: 80 },
    title: 'Pro',
    content: 'Best for professional developers building data-rich enterprise applications.',
    actualPrice: 249,
    price: 186,
    priceFor: 'per developer',
    priceDescription: 'Price capped at 10 developers',
    buttonTitle: 'Learn more',
    featureTitle: 'Includes',
    isPriorityButton: false,
    features: [
      { detail: 'Everything in Community edition' },
      {
        detail: 'More components: advanced data grid, date range picker',
        underline: true,
      },
      {
        detail: 'Perpetual license, 1 year of updates',
      },
    ],
  },
  {
    variant: 'dark',
    src: '/static/branding/pricing/premium.svg',
    href: '/components/data-grid/',
    imgProps: { height: 60, width: 110 },
    title: 'Premium',
    content: 'Unlock the most advanced features. Includes premium support.',
    actualPrice: 0,
    price: 599,
    priceFor: 'per developer',
    priceDescription: 'Price capped at 10 developers per project',
    buttonTitle: 'Learn more',
    featureTitle: 'Everything in Pro, plus advanced support options',
    isPriorityButton: true,
    features: [
      { detail: 'All the most advanced features.' },
      { detail: '2 business days response time.' },
    ],
  },
];

function StartMaterialUi() {
  return (
    <Container>
      <Typography component="h1" variant="h2" align="center" sx={{ mt: 8 }}>
        Start using Material-UI <UnderlinedText>for free!</UnderlinedText>
      </Typography>
      <Typography sx={{ mt: 4, maxWidth: '60ch', mx: 'auto', textAlign: 'center', mb: 12 }}>
        The community edition lets you get going right away. Switch to a commercial plan for more
        components & premium support.
      </Typography>
      <Grid container>
        {startMaterialUi.map((data, index) => (
          <Grid item xs={12} md={12} lg={4} key={data.title}>
            <StartMaterialCard {...(data as any)} id={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const benefits = [
  {
    image: '/static/branding/pricing/fast.svg',
    imgProps: { width: 28, height: 40 },
    color: undefined,
    description: 'Faster development with ready-made components.',
  },
  {
    image: '/static/branding/pricing/documentation.svg',
    imgProps: { width: 40, height: 32 },
    color: 'info',
    description: 'Outstanding documentation and support.',
  },
  {
    image: '/static/branding/pricing/customizable.svg',
    imgProps: { width: 36, height: 36 },
    color: undefined,
    description: 'Highly customisable.',
    order: { xs: 0, sm: 1, lg: 0 },
  },
  {
    image: '/static/branding/pricing/community.svg',
    imgProps: { width: 40, height: 40 },
    color: 'info',
    description: 'Strong community of developers.',
  },
];

function Benefits() {
  return (
    <Container sx={{ mt: [10, 18], mb: [12, 20] }}>
      <Typography
        variant="h3"
        component="div"
        sx={{ textAlign: 'center', mt: 8, mb: 6, maxWidth: '16ch', mx: 'auto' }}
      >
        Benefits included with all the plans
      </Typography>
      <Grid container spacing={4}>
        {benefits.map((benefit) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              order: benefit.order,
            }}
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
              <img loading="lazy" src={benefit.image} {...benefit.imgProps} alt="" />
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
        <UnderlinedText>Compare</UnderlinedText> plans
      </Typography>
      <Typography
        sx={{
          mt: 3,
          maxWidth: '60ch',
          mx: 'auto',
          textAlign: 'center',
          p: { xs: '0 15px', md: 0 },
          mb: { xs: 0, sm: 6, lg: 10 },
        }}
      >
        Compare plans to see which one might fit you or your team. If you need further help deciding{' '}
        <Link href="mailto:sales@material-ui.com">contact sales</Link>.
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
          right: 20,
          top: -78,
        }}
      />
      <Box
        component="img"
        src="/static/branding/block4.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: -40,
          left: 60,
        }}
      />
      <Container>
        <Typography variant="h2" sx={{ mb: { xs: 5, md: 10 }, maxWidth: '16ch' }}>
          Here&apos;s <UnderlinedText>what to expect</UnderlinedText> from Material-UI
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <BrandingCard
              color="emerald"
              image="/static/branding/pricing/fast.svg"
              imgProps={{ width: 28, height: 40 }}
              title="Volume discount"
            >
              <Box sx={{ mt: 2 }}>
                The licenses are on a per-developer basis. We offer the following tiered discounts
                from list prices when purchasing more than one license for your development team:
                <ul>
                  <li>
                    2-5 Licenses: <strong>10% discount</strong>
                  </li>
                  <li>
                    6-10 Licenses: <strong>15% discount</strong>
                  </li>
                  <li>11+ License capped. Extra developers don&apos;t need to be licensed.</li>
                </ul>
              </Box>
            </BrandingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <BrandingCard
              color="vividBlue"
              image="/static/branding/pricing/customizable.svg"
              imgProps={{ width: 36, height: 36 }}
              title="Perpetual license"
            >
              <Box sx={{ mt: 2 }}>
                When you purchase,{' '}
                <strong>you are granted a license to use a version of the product forever</strong>.
                There are no further charges unless you choose to extend your license to cover newer
                versions.
              </Box>
            </BrandingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <BrandingCard
              image="/static/branding/pricing/community.svg"
              imgProps={{ width: 40, height: 40 }}
              title="One year's entitlement to new versions"
            >
              <Box sx={{ mt: 2 }}>
                When you make a purchase{' '}
                <strong>
                  you have the right to use any version released within the following year
                </strong>
                . You can see our{' '}
                <Link href="https://github.com/mui-org/material-ui-x/releases">changelog</Link>.
                After a year (or up to five-year if you choose an extension package) you will no
                longer be able to update to the latest versions. You can continue to use your
                licensed versions in perpetuity.
              </Box>
            </BrandingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <BrandingCard
              color="emerald"
              image="/static/branding/pricing/documentation.svg"
              imgProps={{ width: 40, height: 32 }}
              title="Renewal"
            >
              <Box sx={{ mt: 2 }}>
                While the use of the software is perpetual, access to new features, support and
                corrective maintenance are not. At the end of your entitlement period, you will need
                to renew your license to access updates and support.{' '}
                <b>Renewal pricing is 50% of the initial cost.</b> The renewal can range from one to
                five years.
              </Box>
            </BrandingCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// function WhyEnterprises() {
//   return (
//     <Container sx={{ mt: 2.5, textAlign: 'center' }}>
//       <Typography
//         variant="h2"
//         align="center"
//         sx={{
//           fontSize: { xs: '40px', sm: '48px', lg: '52px' },
//           lineHeight: { xs: '48px', sm: '56px', lg: '60px' },
//           mb: { xs: 8, sm: 10 },
//           px: { xs: 0, sm: 8 },
//         }}
//       >
//         Here’s why enterprises{' '}
//         <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
//         also use Material-UI
//       </Typography>
//       <Grid container alignItems="center" sx={{ px: { xs: 0, sm: 4 } }}>
//         <Grid item xs={12} sm={6}>
//           <Box
//             sx={{
//               maxWidth: '470px',
//               height: '470px',
//               bgcolor: 'greyAA',
//               display: { xs: 'none', sm: 'block' },
//             }}
//           >
//             <img alt="" src={'/static/branding/pricing/rectangle.jpg'} loading="lazy" />
//           </Box>
//         </Grid>
//         <Grid textAlign="left" item xs={12} sm={6} sx={{ pl: { sm: 3.5, lg: 6 } }}>
//           <Box
//             component="img"
//             src="/static/branding/pricing/netflix-enterprise.svg"
//             loading="lazy"
//             alt=""
//             sx={{ mb: 3 }}
//           />
//           <Typography
//             component="p"
//             variant="h4"
//             sx={{
//               maxWidth: '470px',
//               fontSize: { xs: '24px', sm: '28px', lg: '36px' },
//               lineHeight: { xs: '32px', sm: '36px', lg: '44px' },
//             }}
//           >
//             “With Material-UI we can roll out MVP’s much faster. This makes our product development
//             team more agile in testing and releasing new updates.”
//           </Typography>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               mt: 3,
//               '& img': {
//                 mr: 2,
//                 borderRadius: '50%',
//               },
//             }}
//           >
//             <img
//               width="48"
//               height="48"
//               loading="lazy"
//               src={'/static/branding/pricing/avatar.svg'}
//               alt=""
//             />
//             <Typography variant="body2" fontSize="16px" lineHeight="24px">
//               <b>Joshua Smith</b>, CTO at Netflix
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

const faqData = [
  {
    summary: 'Why are you calling it "early access"?',
    detail: (
      <React.Fragment>
        We think you&apos;ll love the features we&apos;ve built so far, but we&apos;re planning to
        release more. We opened it up as soon as we had something useful so that you can start
        getting value from it right away, and we&apos;ll be adding new features and components based
        on our own ideas, and on suggestions from early access customers.
      </React.Fragment>
    ),
  },
  {
    summary: 'How many licenses do I need?',
    detail: (
      <React.Fragment>
        The number of licenses purchased must correspond to the number of concurrent developers
        contributing changes to the front-end code of a project that uses Material-UI X. However,
        the number of developer licenses required is capped at 10 developers for the <b>Pro plan</b>{' '}
        and 10 developers/project for the <b>Premium plan</b>, developers above this cap don&apos;t
        need to be licensed.
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
        After you purchase a license, you&apos;ll receive a license key by email Once you have the
        license key, you need to follow the{' '}
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
    summary: 'Am I allowed to use the product after the update entitlement expires?',
    detail: (
      <React.Fragment>
        Yes. The license is perpetual, so you are allowed to continue using the product even after
        the entitlement expires. However, you will be using the last product version released before
        this time. You will lose access to subsequently released functionality and updates, as well
        as technical support.
        <br />
        <br />
        If you wish to preserve your access to product updates (new features and fixes) and
        dedicated support, you need to renew your license, please{' '}
        <Link href="mailto:sales@material-ui.com">contact sales</Link>.
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
            A product that exposes the components in a form that allows using them to build
            applications, for example in a CMS or a design-builder.
          </li>
          <li>
            Modules/components that DO NOT add significant primary functionality. Example: a theme
            for a set of components that is sold as a separate product and includes the XGrid
            components. In such cases, we may offer a reseller agreement.
          </li>
        </ul>
        If your desired use falls under any of the three categories listed above, please{' '}
        <Link href="mailto:sales@material-ui.com">contact sales</Link>. We will be happy to discuss
        your needs and see what we can do to accommodate your use–case.
      </React.Fragment>
    ),
  },
  {
    summary: 'Do you offer discounts to educational and non-profit organizations?',
    detail: (
      <React.Fragment>
        Yes, we offer a 50% discount on all products licensed to students, instructors, non-profit,
        and charity entities.
        <br />
        <br />
        To qualify for this discount you need to send us a document clearly indicating that you are
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
  '&:not(:first-child)': {
    borderTop: 0,
  },
  '&:after': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
    '&:before': {
      opacity: 1,
    },
  },
});

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: '30px 0',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    paddingRight: theme.spacing(2),
    '&.Mui-expanded': {
      margin: 0,
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetail)(({ theme }) => ({
  padding: theme.spacing(0, 0, 3.5),
}));

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
      <Box sx={{ mt: 10, maxWidth: 770, mx: 'auto' }}>
        {faqData.map((faq) => (
          <Accordion key={faq.summary}>
            <AccordionSummary expandIcon={<Dropdown />}>
              <Typography variant="h4" component="h3">
                {faq.summary}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div">{faq.detail}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

function Support() {
  return (
    <Container sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          width: 64,
          height: 64,
          fontSize: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 6,
          mx: 'auto',
          mb: 2,
        }}
      >
        <HelpIcon fontSize="inherit" />
      </Box>
      <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
        Need help?
      </Typography>
      <Typography sx={{ mb: 4, mx: 'auto', maxWidth: 450 }}>
        From community help to premium business support, we’re here to help.
      </Typography>
      <Button
        component={Link}
        href="/getting-started/support/"
        variant="contained"
        endIcon={<NavigateNextIcon />}
        color="secondary"
      >
        View support
      </Button>
    </Container>
  );
}

export default function Pricing() {
  return (
    <BrandingRoot>
      <Head
        title="Pricing - Material-UI"
        description="The community edition lets you get going right away. Switch to a commercial plan for more components & premium support."
      />
      <BrandingHeader />
      <StartMaterialUi />
      <Benefits />
      <ComparePlans />
      <WhatToExpect />
      {/* <WhyEnterprises /> */}
      <FAQ />
      <Support />
      <BrandingCustomerIcons />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
