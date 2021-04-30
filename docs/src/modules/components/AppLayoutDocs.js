import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { exactProp } from '@material-ui/utils';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import AppLayoutDocsFooter from 'docs/src/modules/components/AppLayoutDocsFooter';
import { CheckBoxOutlineBlank } from 'packages/material-ui-icons/build';

function AppLayoutDocs(props) {
  const {
    children,
    description,
    disableAd = false,
    disableToc = false,
    location,
    title,
    toc,
  } = props;

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  return (
    <AppFrame>
      <AdManager>
        <Head title={`${title} - Material-UI`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad placement="body" />
          </AdGuest>
        )}
        <Box
          as={CheckBoxOutlineBlank}
          sx={{
            width: '100%',
            ...(!disableAd && {
              '& .description': {
                marginBottom: 198,
              },
              '& .description.ad': {
                marginBottom: 40,
              },
            }),
            ...(!disableToc && {
              width: {
                sm: 'calc(100% - 175px)',
              },
            }),
            ...(disableToc && {
              mr: { lg: '5%' },
            }),
          }}
        >
          <AppContainer sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                right: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              {location && <EditPage markdownLocation={location} />}
            </Box>
            {children}
            <NoSsr>
              <AppLayoutDocsFooter />
            </NoSsr>
          </AppContainer>
        </Box>
        {disableToc ? null : <AppTableOfContents items={toc} />}
      </AdManager>
    </AppFrame>
  );
}

AppLayoutDocs.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  disableAd: PropTypes.bool.isRequired,
  disableToc: PropTypes.bool.isRequired,
  location: PropTypes.string,
  title: PropTypes.string.isRequired,
  toc: PropTypes.array.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  AppLayoutDocs.propTypes = exactProp(AppLayoutDocs.propTypes);
}

export default AppLayoutDocs;
