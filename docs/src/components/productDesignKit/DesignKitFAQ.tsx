import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { Link as InternalLink } from '@mui/docs/Link';
import Section from 'docs/src/layouts/Section';

const faqData = [
  {
    summary: 'What long-term support do you offer?',
    detail: (
      <React.Fragment>
        We think you&apos;ll love the components we&apos;ve built so far, but we&apos;re planning to
        release more. We opened it up as soon as we had something useful, so that you can start
        getting value from it right away, and we&apos;ll be adding new features and components based
        on our own ideas, and on suggestions from early access customers.
      </React.Fragment>
    ),
  },
  {
    summary: 'How many licenses do I need?',
    detail: (
      <React.Fragment>
        The number of licenses purchased must correspond to the maximum number of editors working
        concurrently in a 24 hour period. An editor is somebody contributing changes to the designed
        screens that use the Design Kits. No licenses are required for viewing the designs.
      </React.Fragment>
    ),
  },
  {
    summary: 'The Design Kit got an update. How do I get it?',
    detail: (
      <React.Fragment>
        We&apos;ll send you an email when a new release is available. You can access the item on the{' '}
        <InternalLink href="https://mui.com/store/account/downloads/">download</InternalLink> page
        of your store account and find a detailed description of the changes under
        the&quot;Changelog&quot; tab on this page.
      </React.Fragment>
    ),
  },
  {
    summary: 'Is the Material UI Sync plugin paid?',
    detail: (
      <React.Fragment>
        No. We&apos;re still in alpha mode and rolling out more features progressively, as per your
        feedback. We might introduce paid tiers in the future, though.
      </React.Fragment>
    ),
  },
  {
    summary: 'Do you offer discounts to educational or non-profit organizations?',
    detail: (
      <React.Fragment>
        <strong>Yes.</strong> We offer a 50% discount on all products licensed to students,
        instructors, non-profit, and charity entities. This special discount cannot be combined with
        any other type of discount. To qualify for the discount, you need to send us a document
        clearly indicating that you are a member of the respective institution. An email from your
        official account which bears your signature is sufficient in most cases. For more
        information on how to qualify for a discount, please contact sales.
      </React.Fragment>
    ),
  },
  {
    summary: 'Figma or Sketch or Adobe XD?',
    detail: (
      <React.Fragment>
        We aim to keep feature parity between the Figma, Sketch, and Adobe XD kits where possible.
        We have a 50% off coupon for past customers who want to switch between them.
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
    boxShadow: '1px 1px 8px 0 rgb(90 105 120 / 20%)',
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

export default function DesignKitFAQ() {
  function renderItem(index: number) {
    const faq = faqData[index];
    return (
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 20, color: 'primary.main' }} />}
        >
          <Typography variant="body2" component="h3" sx={{ fontWeight: 'bold' }}>
            {faq.summary}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            component="div"
            variant="body2"
            sx={{ color: 'text.secondary', '& ul': { pl: 2 } }}
          >
            {faq.detail}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
  return (
    <Section>
      <Typography variant="h2" sx={{ mb: { xs: 2, sm: 4 } }} id="faq">
        Frequently asked questions
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          {renderItem(0)}
          {renderItem(1)}
          {renderItem(2)}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {renderItem(3)}
          {renderItem(4)}
          <Paper
            variant="outlined"
            sx={(theme) => ({
              p: 2,
              pb: 1,
              borderStyle: 'dashed',
              borderColor: 'grey.300',
              bgcolor: 'white',
              textAlign: 'left',
              ...theme.applyDarkStyles({
                borderColor: 'primaryDark.600',
                bgcolor: 'primaryDark.800',
              }),
            })}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Got any questions unanswered or need more help?
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: 'text.primary' }}>
              From community help to premium business support, we&apos;re here to help.
            </Typography>
            <Button
              component="a"
              // @ts-expect-error
              variant="link"
              size="small"
              href="mailto:sales@mui.com"
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ ml: -1 }}
            >
              Contact sales
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}
