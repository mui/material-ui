/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { exactProp } from '@mui/utils';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import Divider from 'docs/src/modules/components/ApiDivider';
import PropertiesTable from 'docs/src/modules/components/PropertiesTable';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

function getTranslatedHeader(t, header, text) {
  const translations = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    'hook-name': t('api-docs.hookName'),
    parameters: t('api-docs.parameters'),
    'return-value': t('api-docs.returnValue'),
  };

  return translations[header] || translations[text] || text || header;
}

function Heading(props) {
  const { hash, text, level: Level = 'h2' } = props;
  const t = useTranslate();

  return (
    <Level id={hash}>
      {getTranslatedHeader(t, hash, text)}
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
  text: PropTypes.string,
};

export default function HooksApiContent(props) {
  const { descriptions, pagesContents } = props;
  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const hooks = Object.keys(pagesContents);
  const numberOfHooks = hooks.length;

  return hooks.map((key, idx) => {
    const { filename, name: hookName, parameters, returnValue } = pagesContents[key];

    const { parametersDescriptions, returnValueDescriptions } = descriptions[key][userLanguage];

    const source = filename
      .replace(/\/packages\/mui(-(.+?))?\/src/, (match, dash, pkg) => `@mui/${pkg}`)
      // convert things like `/Table/Table.js` to ``
      .replace(/\/([^/]+)\/\1\.(js|tsx)$/, '');

    const hookNameKebabCase = kebabCase(hookName);

    return (
      <React.Fragment key={`hook-api-${key}`}>
        <MarkdownElement>
          <Heading hash={hookNameKebabCase} text={`${hookName} API`} />
          <Heading text="import" hash={`${hookNameKebabCase}-import`} level="h3" />
          <HighlightedCode
            code={`
import ${hookName} from '${source.split('/').slice(0, -1).join('/')}';
// ${t('or')}
import { ${hookName} } from '${source.split('/').slice(0, 2).join('/')}';`}
            language="jsx"
          />
          <span dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} />
          <Heading text="parameters" hash={`${hookNameKebabCase}-parameters`} level="h3" />
          {Object.keys(parameters).length > 0 ? (
            <PropertiesTable
              properties={parameters}
              propertiesDescriptions={parametersDescriptions}
            />
          ) : (
            <span>{t('api-docs.hooksNoParameters')}</span>
          )}
          <Heading text="return-value" hash={`${hookNameKebabCase}-return-value`} level="h3" />
          <PropertiesTable
            showOptionalAbbr
            properties={returnValue}
            propertiesDescriptions={returnValueDescriptions}
          />
          <br />
        </MarkdownElement>
        <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <symbol id="anchor-link-icon" viewBox="0 0 16 16">
            <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
          </symbol>
        </svg>
        {idx < numberOfHooks - 1 && <Divider />}
      </React.Fragment>
    );
  });
}

HooksApiContent.propTypes = {
  descriptions: PropTypes.object.isRequired,
  pagesContents: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  HooksApiContent.propTypes = exactProp(HooksApiContent.propTypes);
}
