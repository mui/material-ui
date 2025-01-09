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
import { MarkdownElement } from '@mui/docs/MarkdownElement';
import { createRender } from '@mui/internal-markdown';
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

// Data from https://www.notion.so/mui-org/Hiring-FAQ-64763b756ae44c37b47b081f98915501
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
    summary: 'Contractor or Employee?',
    detail: `
  People joining MUI have the choice between joining:

  - under an "employee" legal type of contract
  - under a "contractor" legal type of contract

  This is up to you. This is also not set in stone, you can change it later on [Raising a change of employment request](https://www.notion.so/Raising-a-change-of-employment-request-bac24a7a73f0413c8036b2640e1df9ae?pvs=21). We design the benefits so that there are as few differences as possible between each type of contract. 

  For those that chose the "employee":

  - people in France are hired as full-time employees under the French [legal entity](https://www.infogreffe.fr/entreprise-societe/852357748-material-ui-750119B189960000.html).
  - people outside of France are hired through an Employer of Record (EOR), for example, Deel: https://www.deel.com/.
`,
  },
  {
    summary: 'Which countries does MUI hire from?',
    detail: `
We hire from as many countries as possible. However, we have a few limitations:

- We favor candidates working normal hours in the UTC-6 to UTC+5 timezone range. It's not a hard requirement though. This helps us find synchronous time, e.g. for bonding.
- We can't hire people who have a fiscal residency in Russia. If you are impacted, you would need to relocate to a different country. We don't want to help fund the current government in place.

**Countries with complications**

  - Bank accounts in countries we can send money to with our Wise account https://wise.com/help/articles/2571942/what-countries-can-i-send-to
  - Countries we can use Deel in: https://help.letsdeel.com/hc/en-gb/articles/4407737728273-Where-Is-Deel-Available
`,
  },
  {
    summary: 'Does MUI offer visa sponsorship?',
    detail: `At present, MUI does not provide visa sponsorship for individuals applying for new roles within the company. Candidates must already possess legal authorization to work in the country for which they're applying to be considered for employment.`,
  },
  {
    summary: 'How would you describe the culture?',
    detail: `
We are documenting our [Company culture](https://www.notion.so/Company-culture-8c295a7b95564f2da03aca6759413391?pvs=21). This culture is not frozen in time, it evolves based on the needs of the organization and the opportunities we find to improve it. Assuming that most people's behavior hardly changes over time, we filter the candidates based on how we want the culture to look.

Compared to other company cultures, we aim to build a team of people who:

- **seeking correctness over complacency.** People who enjoy discovering the truth a lot more than being right. People who enjoy debate, embrace confusion, and reason with probabilistic models.
- **aim for clarity of thoughts.** This is the foundation for any great teamwork.
- **have self-determination.** They don't stop when it becomes hard, on the contrary, it's when things start to be interesting for them.
- **see opportunities anywhere there is a struggle.** We are optimistic about the future, and we enjoy helping the people around us.
`,
  },
  {
    summary: 'Can I use AI during the hiring process?',
    detail: `
We don't allow AI tools anytime we test skills for which candidates wouldn't be able to use AI in the role. For example, debating the pros and cons of a decision.

However, we allow candidates to use AI tools when applied to solve problems they would also use AI to solve in the role. For example, writing code.
    `,
  },
];

const render = createRender({
  options: {
    env: {
      SOURCE_CODE_REPO: '',
    },
  },
});

function renderFAQItem(faq: (typeof faqData)[0]) {
  return (
    <Accordion variant="outlined">
      <AccordionSummary
        expandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 20, color: 'primary.main' }} />}
      >
        <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
          {faq.summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ '& p:last-of-type': { mb: 0 } }}>
        <MarkdownElement renderedMarkdown={render(faq.detail)} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function CareersFaq() {
  return (
    <Section bg="transparent" cozy>
      <Typography id="faq" variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
        Frequently asked questions
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          {faqData.map((faq, index) => {
            if (index % 2 !== 0) {
              return null;
            }
            return renderFAQItem(faq);
          })}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {faqData.map((faq, index) => {
            if (index % 2 !== 1) {
              return null;
            }
            return renderFAQItem(faq);
          })}
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
