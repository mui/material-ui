import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
import { Link } from '@mui/docs/Link';
import Section from 'docs/src/layouts/Section';

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

function renderFAQItem(index: number, defaultExpanded?: boolean) {
  const faq = faqData[index];
  return (
    <Accordion variant="outlined" defaultExpanded={defaultExpanded}>
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

export default function CareersFaq() {
  return (
    <Section bg="transparent" cozy>
      <Typography variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
        Frequently asked questions
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          {renderFAQItem(0, true)}
          {renderFAQItem(1)}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
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
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                Got any questions unanswered or need more help?
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', my: 1, textAlign: 'left' }}>
              We&apos;re here to help you with any other question you have about our hiring process.
            </Typography>
            <Link href="mailto:job@mui.com" variant="body2">
              Contact us <KeyboardArrowRightRounded fontSize="small" />
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}
