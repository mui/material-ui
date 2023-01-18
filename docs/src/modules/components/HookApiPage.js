/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { exactProp } from '@mui/utils';
import { alpha, styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import Ad from 'docs/src/modules/components/Ad';

const Asterisk = styled('abbr')(({ theme }) => ({ color: theme.palette.error.main }));

const Wrapper = styled('div')({
  overflow: 'hidden',
});
const Table = styled('table')(({ theme }) => {
  const contentColor =
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primaryDark[900], 1)
      : 'rgba(255, 255, 255, 1)';
  const contentColorTransparent =
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primaryDark[900], 0)
      : 'rgba(255, 255, 255, 0)';
  const shadowColor = theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.2)';
  return {
    borderRadius: 10,
    background: `
  linear-gradient(to right, ${contentColor} 5%, ${contentColorTransparent}),
  linear-gradient(to right, ${contentColorTransparent}, ${contentColor} 100%) 100%,
  linear-gradient(to right, ${shadowColor}, rgba(0, 0, 0, 0) 5%),
  linear-gradient(to left, ${shadowColor}, rgba(0, 0, 0, 0) 5%)`,
    backgroundAttachment: 'local, local, scroll, scroll',
    // the above background create thin line on the left and right sides of the table
    // as a workaround, use negative margin with overflow `hidden` on the parent
    marginLeft: -1,
    marginRight: -1,
  };
});

function PropertiesTable(props) {
  const { properties, propertiesDescriptions } = props;
  const t = useTranslate();

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th align="left">{t('api-docs.name')}</th>
            <th align="left">{t('api-docs.type')}</th>
            <th align="left">{t('api-docs.default')}</th>
            <th align="left">{t('api-docs.description')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(properties).map(([propName, propData]) => {
            let typeName = propData.type.name;
            typeName = typeName
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
            const propDefault = propData.default || (propData.type.name === 'bool' && 'false');
            return (
              propData.description !== '@ignore' && (
                <tr key={propName}>
                  <td align="left">
                    <span className={clsx('prop-name', propData.required ? 'required' : null)}>
                      {propName}
                      {propData.required && (
                        <sup>
                          <Asterisk title="required">*</Asterisk>
                        </sup>
                      )}
                    </span>
                  </td>
                  <td align="left">
                    <span className="prop-type" dangerouslySetInnerHTML={{ __html: typeName }} />
                  </td>
                  <td align="left">
                    {propDefault && <span className="prop-default">{propDefault}</span>}
                  </td>
                  <td align="left">
                    {propData.deprecated && (
                      <Alert severity="warning" sx={{ mb: 1, py: 0 }}>
                        <strong>{t('api-docs.deprecated')}</strong>
                        {propData.deprecationInfo && ' - '}
                        {propData.deprecationInfo && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: propData.deprecationInfo,
                            }}
                          />
                        )}
                      </Alert>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: propertiesDescriptions[propName] || '',
                      }}
                    />
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
}

PropertiesTable.propTypes = {
  properties: PropTypes.object.isRequired,
  propertiesDescriptions: PropTypes.object.isRequired,
};

function getTranslatedHeader(t, header) {
  const translations = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    'hook-name': t('api-docs.hookName'),
    inputParams: t('api-docs.inputParams'),
    returnValue: t('api-docs.returnValue'),
  };

  // TODO Drop runtime type-checking once we type-check this file
  if (!translations.hasOwnProperty(header)) {
    throw new TypeError(
      `Unable to translate header '${header}'. Did you mean one of '${Object.keys(
        translations,
      ).join("', '")}'`,
    );
  }

  return translations[header] || header;
}

function Heading(props) {
  const { hash, level: Level = 'h2' } = props;
  const t = useTranslate();

  return (
    <Level id={hash}>
      {getTranslatedHeader(t, hash)}
      <a aria-labelledby={hash} className="anchor-link" href={`#${hash}`} tabIndex={-1}>
        <svg>
          <use xlinkHref="#anchor-link-icon" />
        </svg>
      </a>
    </Level>
  );
}

Heading.propTypes = {
  hash: PropTypes.string.isRequired,
  level: PropTypes.string,
};

export default function ApiPage(props) {
  const { descriptions, disableAd = false, pageContent } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();

  const { demos, filename, inheritance, name: hookName, inputParams, returnValue } = pageContent;

  const {
    hookDescription,
    hookDescriptionToc = [],
    inputParamsDescriptions,
    returnValueDescriptions,
  } = descriptions[userLanguage];
  const description = t('api-docs.hooksPageDescription').replace(/{{name}}/, hookName);

  const source = filename
    .replace(/\/packages\/mui(-(.+?))?\/src/, (match, dash, pkg) => `@mui/${pkg}`)
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.(js|tsx)$/, '');

  // Prefer linking the .tsx or .d.ts for the "Edit this page" link.
  const apiSourceLocation = filename.replace('.js', '.d.ts');

  function createTocEntry(sectionName) {
    return {
      text: getTranslatedHeader(t, sectionName),
      hash: sectionName,
      children: [
        ...(sectionName === 'props' && inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : []),
      ],
    };
  }

  const toc = [
    createTocEntry('demos'),
    createTocEntry('import'),
    ...hookDescriptionToc,
    createTocEntry('inputParams'),
    createTocEntry('returnValue'),
  ].filter(Boolean);

  return (
    <AppLayoutDocs
      description={description}
      disableAd={disableAd}
      disableToc={false}
      location={apiSourceLocation}
      title={`${hookName} API`}
      toc={toc}
    >
      <MarkdownElement>
        <h1>{hookName} API</h1>
        <Typography
          variant="h5"
          component="p"
          className={`description${disableAd ? '' : ' ad'}`}
          gutterBottom
        >
          {description}
          {disableAd ? null : <Ad />}
        </Typography>
        <Heading hash="demos" />
        <div
          className="MuiCallout-root MuiCallout-info"
          dangerouslySetInnerHTML={{
            __html: `<p>For examples and details on the usage of this React component, visit the component demo pages:</p>
              ${demos}`,
          }}
        />
        <Heading hash="import" />
        <HighlightedCode
          code={`
import { ${hookName} } from '${source.split('/').slice(0, -1).join('/')}';`}
          language="jsx"
        />
        {/* TODO: Add this once the hooks are in dedicated folders */}
        {/* <span dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} /> */}
        {hookDescription ? (
          <React.Fragment>
            <br />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: hookDescription,
              }}
            />
          </React.Fragment>
        ) : null}
        <Heading hash="inputParams" />
        <PropertiesTable
          properties={inputParams}
          propertiesDescriptions={inputParamsDescriptions}
        />
        <Heading hash="returnValue" />
        <PropertiesTable
          properties={returnValue}
          propertiesDescriptions={returnValueDescriptions}
        />
        <br />
        {/* TODO: Add section for the hook output type */}
      </MarkdownElement>
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 16 16">
          <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
        </symbol>
      </svg>
    </AppLayoutDocs>
  );
}

ApiPage.propTypes = {
  descriptions: PropTypes.object.isRequired,
  disableAd: PropTypes.bool,
  pageContent: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ApiPage.propTypes = exactProp(ApiPage.propTypes);
}
