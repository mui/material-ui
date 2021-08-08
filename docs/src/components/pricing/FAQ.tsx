import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetail from '@material-ui/core/AccordionDetails';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

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
        <b>Example 1.</b> Company ‘A’ is developing an application named ‘AppA’. The app needs to
        render 10K rows of data in a table and allow users to group, filter, and sort. The dev team
        adds Material-UI X to the project to satisfy that requirement. 5 front-end and 10 back-end
        developers are working on ‘AppA’. Only 1 developer is tasked with configuring and modifying
        the data grid. The front-end developers and only are contributing code to the front-end.
        Company ‘A’ purchases 5 licenses.
        <br />
        <br />
        <b>Example 2.</b> A UI development team at Company ‘A’ creates its own UI library for
        internal development and includes Material-UI-X as a component. The team working on ‘AppA’
        uses the new library and so does the team working on ‘AppB’. ‘AppA’ has 5 front-end
        developers and ‘AppB’ has 3. There are 2 front-end developers on the UI development team.
        Company ‘B’ purchases 10 licenses.
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
        The licenses are royalty-free. The licensed entity can use our components without a
        sublicense in:
        <ul>
          <li>Solutions for internal company use</li>
          <li>Hosted applications</li>
          <li>Commercial solutions deployed for end-users</li>
        </ul>
        Based on the "Deployment" section of the EULA, you can sublicense the software if it's made
        part of a larger work. The new licenses must be in writing and substantially the same as
        these EULA.
        <br />
        <br />
        <b>Example 1.</b> Agency 'A' is building two applications for companies 'B' and 'C'. Agency
        'A' purchases four licenses for four developers. They build the applications and sublicense
        the software to companies 'B' and 'C' without any extra fee. Company 'B' can deploy the
        application built by the agency without modifying the sources. Company 'C' decides to
        continue working on the application. They purchase one license per developer working on the
        front end of the application.
        <br />
        <br />
        There are only two limitations that require additional discussion with our sales team:
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
        If your desired use falls under any of the three categories listed above, please{' '}
        <Link href="mailto:sales@material-ui.com">contact sales</Link>. We will be happy to discuss
        your needs and see what we can do to accommodate your case.
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

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: theme.transitions.create('box-shadow'),
  '&&': {
    borderRadius: theme.shape.borderRadius,
  },
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

export default function FAQ() {
  function renderItem(index: number) {
    const faq = faqData[index];
    return (
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 20, color: 'primary.main' }} />}
        >
          <Typography variant="body2" fontWeight="bold">
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
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
        Frequently asked questions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {renderItem(0)}
          {renderItem(1)}
          {renderItem(2)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderItem(3)}
          {renderItem(4)}
          {renderItem(5)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderItem(6)}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: 'center',
              borderStyle: 'dashed',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'white'),
            }}
          >
            <Box sx={{ maxWidth: 250, mx: 'auto' }}>
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                Got any questions unanswered or need more help?
              </Typography>
            </Box>
            <Typography variant="body2" color="text.primary" sx={{ my: 1, textAlign: 'left' }}>
              Email us at <Link href="mailto:sales@material-ui.com">sales@material-ui.com</Link> for
              sales-related questions.
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ my: 1, textAlign: 'left' }}>
              For product-related questions, you can open new issues on{' '}
              <Link href="https://github.com/mui-org/material-ui-x">GitHub</Link> (bugs and feature
              requests) or email us at{' '}
              <Link href="mailto:x@material-ui.com">x@material-ui.com</Link>.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
