import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppFooter from 'docs/src/modules/components/AppFooter';
import MarkdownElement from './MarkdownElement';

const styles = (theme) => ({
  root: {
    flex: '1 0 100%',
  },
  container: {
    marginBottom: theme.spacing(20),
    maxWidth: 680 + theme.spacing(8 + 4),
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
    <AppFrame disableDrawer>
      <Head title={`${title} - Material-UI`} description={description} />
      <div className={classes.root}>
        <AppContainer className={classes.container}>
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </AppContainer>
        <AppFooter />
      </div>
    </AppFrame>
  );
}

TopLayoutCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopLayoutCompany);
