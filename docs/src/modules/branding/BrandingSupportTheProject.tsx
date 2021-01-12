import * as React from 'react';
import Container from '@material-ui/core/Container';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import FeedbackIcon from 'docs/src/modules/branding/icons/Feedback';
import ChangesIcon from 'docs/src/modules/branding/icons/Changes';
import FinanceIcon from 'docs/src/modules/branding/icons/Finance';
import HelpIcon from 'docs/src/modules/branding/icons/Help';
import OpenCollectiveIcon from 'docs/src/modules/branding/icons/OpenCollective';

interface SupportCardProps {
  color?: 'primary' | 'info';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
}

const SupportCard = styled((props: SupportCardProps) => {
  const { color, icon, title, children, ...other } = props;
  return (
    <Card elevation={0} {...other}>
      <CardHeader avatar={<Avatar aria-label={title}>{icon}</Avatar>} />
      <CardContent>
        <Typography variant="h3">{title}</Typography>
        <Typography component="div">{children}</Typography>
      </CardContent>
    </Card>
  );
})<SupportCardProps>(({ color = 'primary', theme }) => ({
  '& [class*="MuiAvatar-root"]': {
    background: color === 'info' ? theme.palette.vividBlue : theme.palette.primary.main,
    width: 80,
    height: 80,
  },
}));

export default function BrandingSupportTheProject() {
  return (
    <Container sx={{ mt: [10, 18], mb: [12, 20] }}>
      <Typography variant="h2">Material-UI is awesome.</Typography>
      <Typography variant="h2">
        How can <UnderlinedText>I support the project?</UnderlinedText>
      </Typography>
      <Typography sx={{ mb: 4 }}>There are many ways to support Material-UI:</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SupportCard icon={<QuestionAnswerIcon fontSize="large" />} title="Spread the word">
            <Typography sx={{ mt: 2 }}>
              Evangelize Material-UI by linking to{' '}
              <Link href="https://material-ui.com">material-ui.com</Link> on your website, every
              backlink matters! Follow us on{' '}
              <Link href="https://twitter.com/MaterialUI">Twitter</Link>, like and retweet the
              important news. Or just talk about us with your friends.
            </Typography>
          </SupportCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SupportCard
            color="info"
            icon={<FeedbackIcon fontSize="large" />}
            title="Give us feedback"
          >
            <Typography sx={{ mt: 2 }}>
              Tell us what we&apos;re doing well or where we can improve. Please upvote (
              <span role="img" aria-label="Thumbs up emoji">
                👍
              </span>
              ) the issues that you are the most interested in seeing solved. {/* TODO: add link */}
              <Link href={'/'}>Give us feedback</Link>
            </Typography>
          </SupportCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SupportCard
            color="info"
            icon={<ChangesIcon fontSize="large" />}
            title="Make changes happen"
          >
            <ul>
              <li>
                Edit the documentation. Every page has an &quot;EDIT THIS PAGE&quot; link in the top
                right.
              </li>
              <li>
                Report bugs or missing features by{' '}
                <Link href="https://github.com/mui-org/material-ui/issues">creating an issue</Link>.
              </li>
              <li>
                Review and comment on existing{' '}
                <Link href="https://github.com/mui-org/material-ui/pulls">pull requests</Link> and{' '}
                <Link href="https://github.com/mui-org/material-ui/issues">issues</Link>.
              </li>
              <li>
                {/* TODO: add link */}
                Help <Link href={'/'}>translate</Link> the documentation.
              </li>
              <li>
                {/* TODO: add link */}
                <Link href={'/'}>Improve our documentation</Link>, fix bugs, or add features by{' '}
                {/* TODO: add link */}
                <Link href={'/'}>submitting a pull request</Link>.
              </li>
            </ul>
          </SupportCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SupportCard icon={<FinanceIcon fontSize="large" />} title="Support us financially">
            <Typography sx={{ mt: 2 }}>
              If you use Material-UI in a commercial project and would like to support its continued
              development by becoming a Sponsor, or in a side or hobby project and would like to
              become a Backer, you can do so through OpenCollective.
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              All funds donated are managed transparently, and Sponsors receive recognition in the
              README and on the Material-UI home page.
            </Typography>
            <Button
              color="inherit"
              // TODO: check link
              href={'https://opencollective.com/'}
              endIcon={<OpenCollectiveIcon />}
              variant="contained"
            >
              Open collective
            </Button>
          </SupportCard>
        </Grid>
        <Grid>
          <SupportCard icon={<HelpIcon fontSize="large" />} title="Help new users">
            <Typography sx={{ mt: 2 }}>
              You can answer questions on{' '}
              <Link href="https://stackoverflow.com/questions/tagged/material-ui">
                StackOverflow
              </Link>
              .
            </Typography>
          </SupportCard>
        </Grid>
      </Grid>
    </Container>
  );
}
