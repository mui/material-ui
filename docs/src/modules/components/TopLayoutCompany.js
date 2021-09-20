import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Head from 'docs/src/modules/components/Head';
import { BANNER_HEIGHT } from 'docs/src/modules/constants';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppFooter from 'docs/src/layouts/AppFooter';
import MarkdownElement from './MarkdownElement';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import BrandingProvider from 'docs/src/BrandingProvider';

const styles = (theme) => ({
  root: {
    flex: '1 0 100%',
  },
  back: {
    display: 'block',
    marginBottom: theme.spacing(4),
  },
  container: {
    marginBottom: theme.spacing(15),
    maxWidth: `calc(680px + ${theme.spacing(12)})`,
    '& .markdownElement': {
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(4),
      },
    },
  },
});

function TopLayoutCompany(props) {
  const { classes, docs } = props;
  const { description, rendered, title } = docs.en;

  return (
    <BrandingProvider>
      <AppHeader />
      <Head title={`${title} - MUI`} description={description} />
      <div className={classes.root}>
        <AppContainer component="main" className={classes.container}>
          <Link
            href="/careers/#open-roles"
            rel="nofollow"
            color="text.secondary"
            variant="body2"
            className={classes.back}
          >
            {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
            {'< Back to open roles'}
          </Link>
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </AppContainer>
        <Divider />
        <AppFooter />
      </div>
    </BrandingProvider>
  );
}

TopLayoutCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.object.isRequired,
};

const defaultTheme = createTheme();
export default withStyles(styles, { defaultTheme })(TopLayoutCompany);
