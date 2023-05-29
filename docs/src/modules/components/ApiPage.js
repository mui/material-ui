/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@mui/utils';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import PropertiesTable from 'docs/src/modules/components/PropertiesTable';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import Ad from 'docs/src/modules/components/Ad';
import { sxChip } from './AppNavDrawerItem';
import CSSList from './ApiPage/CSSList';

function CSSTable(props) {
  const { componentStyles, classDescriptions } = props;
  const t = useTranslate();

  return (
    <table>
      <thead>
        <tr>
          <th align="left">{t('api-docs.ruleName')}</th>
          <th align="left">{t('api-docs.globalClass')}</th>
          <th align="left">{t('api-docs.description')}</th>
        </tr>
      </thead>
      <tbody>
        {componentStyles.classes.map((className) => {
          const isGlobalStateClass = !!componentStyles.globalClasses[className];
          return (
            <tr key={className}>
              <td align="left">
                <span className="prop-name">
                  {isGlobalStateClass ? (
                    <React.Fragment>
                      {className}
                      <Chip size="small" label={t('api-docs.state')} sx={sxChip('primary')} />
                    </React.Fragment>
                  ) : (
                    className
                  )}
                </span>
              </td>
              <td align="left">
                <span className="prop-name">
                  .
                  {componentStyles.globalClasses[className] ||
                    `${componentStyles.name}-${className}`}
                </span>
              </td>
              <td
                align="left"
                dangerouslySetInnerHTML={{
                  __html:
                    classDescriptions[className] &&
                    classDescriptions[className].description
                      .replace(/{{conditions}}/, classDescriptions[className].conditions)
                      .replace(/{{nodeName}}/, classDescriptions[className].nodeName),
                }}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CSSTable.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentStyles: PropTypes.object.isRequired,
};

export function SlotsTable(props) {
  const { componentSlots, slotDescriptions } = props;
  const t = useTranslate();

  return (
    <table>
      <thead>
        <tr>
          <th align="left">{t('api-docs.name')}</th>
          <th align="left">{t('api-docs.defaultClass')}</th>
          <th align="left">{t('api-docs.defaultHTMLTag')}</th>
          <th align="left">{t('api-docs.description')}</th>
        </tr>
      </thead>
      <tbody>
        {componentSlots.map(({ class: className, name, default: defaultValue }) => {
          return (
            <tr key={name}>
              <td align="left" width="15%">
                <span className="slot-name">{name}</span>
              </td>
              <td align="left" width="25%">
                <span
                  className="slot-defaultClass"
                  dangerouslySetInnerHTML={{ __html: className }}
                />
              </td>
              <td align="left" width="25%">
                {defaultValue && <span className="slot-default">{defaultValue}</span>}
              </td>
              <td
                align="left"
                width="35%"
                dangerouslySetInnerHTML={{
                  __html: slotDescriptions[name] || '',
                }}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

SlotsTable.propTypes = {
  componentSlots: PropTypes.array.isRequired,
  slotDescriptions: PropTypes.object.isRequired,
};

export function ClassesTable(props) {
  const { componentClasses, classDescriptions, componentName } = props;
  const t = useTranslate();

  const list = componentClasses.classes.map((classes) => ({
    classes,
    className:
      componentClasses.globalClasses[classes] ||
      `Mui${componentName.replace('Unstyled', '')}-${classes}`,
  }));

  return (
    <table style={{ display: 'table', width: '100%' }}>
      <thead>
        <tr>
          <th align="left">{t('api-docs.globalClass')}</th>
          <th align="left">{t('api-docs.description')}</th>
        </tr>
      </thead>
      <tbody>
        {list
          .sort((a, b) => a.className.localeCompare(b.className))
          .map((item) => {
            const isGlobalStateClass = !!componentClasses.globalClasses[item.classes];
            return (
              <tr key={item.classes}>
                <td align="left">
                  <span className="prop-name">
                    .
                    {isGlobalStateClass ? (
                      <React.Fragment>
                        {item.className}
                        <Chip size="small" label={t('api-docs.state')} sx={sxChip('grey')} />
                      </React.Fragment>
                    ) : (
                      item.className
                    )}
                  </span>
                </td>
                <td
                  align="left"
                  dangerouslySetInnerHTML={{
                    __html:
                      classDescriptions[item.classes] &&
                      classDescriptions[item.classes].description
                        .replace(/{{conditions}}/, classDescriptions[item.classes].conditions)
                        .replace(/{{nodeName}}/, classDescriptions[item.classes].nodeName),
                  }}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

ClassesTable.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentClasses: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired,
};

export function getTranslatedHeader(t, header) {
  const translations = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    props: t('api-docs.props'),
    'theme-default-props': t('api-docs.themeDefaultProps'),
    inheritance: t('api-docs.inheritance'),
    slots: t('api-docs.slots'),
    classes: t('api-docs.classes'),
    css: t('api-docs.css'),
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

  const {
    cssComponent,
    demos,
    filename,
    forwardsRefTo,
    inheritance,
    props: componentProps,
    spread,
    styles: componentStyles,
    slots: componentSlots,
    classes: componentClasses,
  } = pageContent;

  const isJoyComponent = filename.includes('mui-joy');
  const isBaseComponent = filename.includes('mui-base');
  const defaultPropsLink = isJoyComponent
    ? '/joy-ui/customization/themed-components/#theme-default-props'
    : '/material-ui/customization/theme-components/#theme-default-props';
  const styleOverridesLink = isJoyComponent
    ? '/joy-ui/customization/themed-components/#theme-style-overrides'
    : '/material-ui/customization/theme-components/#theme-style-overrides';
  let slotGuideLink = '';
  if (isJoyComponent) {
    slotGuideLink = '/joy-ui/guides/overriding-component-structure/';
  } else if (isBaseComponent) {
    slotGuideLink = '/base/guides/overriding-component-structure/';
  }

  const {
    componentDescription,
    componentDescriptionToc = [],
    classDescriptions,
    propDescriptions,
    slotDescriptions,
  } = descriptions[userLanguage];
  const description = t('api-docs.pageDescription').replace(/{{name}}/, pageContent.name);

  const source = filename
    .replace(/\/packages\/mui(-(.+?))?\/src/, (match, dash, pkg) => `@mui/${pkg}`)
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.(js|tsx)$/, '');

  // Prefer linking the .tsx or .d.ts for the "Edit this page" link.
  const apiSourceLocation = filename.replace('.js', '.d.ts');

  const hasClasses =
    componentClasses?.classes?.length ||
    Object.keys(componentClasses?.classes?.globalClasses || {}).length;

  function createTocEntry(sectionName) {
    return {
      text: getTranslatedHeader(t, sectionName),
      hash: sectionName,
      children: [
        ...(sectionName === 'props' && inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : []),
        ...(sectionName === 'props' && pageContent.themeDefaultProps
          ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
          : []),
      ],
    };
  }

  const toc = [
    createTocEntry('demos'),
    createTocEntry('import'),
    ...componentDescriptionToc,
    createTocEntry('props'),
    componentStyles.classes.length > 0 && createTocEntry('css'),
    componentSlots?.length > 0 && createTocEntry('slots'),
    hasClasses && createTocEntry('classes'),
  ].filter(Boolean);

  // The `ref` is forwarded to the root element.
  let refHint = t('api-docs.refRootElement');
  if (forwardsRefTo == null) {
    // The component cannot hold a ref.
    refHint = t('api-docs.refNotHeld');
  }

  let spreadHint = '';
  if (spread) {
    // Any other props supplied will be provided to the root element ({{spreadHintElement}}).
    spreadHint = t('api-docs.spreadHint').replace(
      /{{spreadHintElement}}/,
      inheritance
        ? `<a href="${inheritance.pathname}">${inheritance.component}</a>`
        : t('api-docs.nativeElement'),
    );
  }

  let inheritanceSuffix = '';
  if (inheritance && inheritance.component === 'Transition') {
    inheritanceSuffix = t('api-docs.inheritanceSuffixTransition');
  }

  return (
    <AppLayoutDocs
      description={description}
      disableAd={disableAd}
      disableToc={false}
      location={apiSourceLocation}
      title={`${pageContent.name} API`}
      toc={toc}
    >
      <MarkdownElement>
        <h1>{pageContent.name} API</h1>
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
import ${pageContent.name} from '${source}/${pageContent.name}';
// ${t('or')}
import { ${pageContent.name} } from '${source}';`}
          language="jsx"
        />
        <span dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} />
        {componentDescription ? (
          <React.Fragment>
            <br />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: componentDescription,
              }}
            />
          </React.Fragment>
        ) : null}
        <Heading hash="props" />
        <p dangerouslySetInnerHTML={{ __html: spreadHint }} />
        <PropertiesTable properties={componentProps} propertiesDescriptions={propDescriptions} />
        <br />
        {cssComponent && (
          <React.Fragment>
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.cssComponent').replace(/{{name}}/, pageContent.name),
              }}
            />
            <br />
            <br />
          </React.Fragment>
        )}
        <span dangerouslySetInnerHTML={{ __html: refHint }} />
        {inheritance && (
          <React.Fragment>
            <Heading hash="inheritance" level="h3" />
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.inheritanceDescription')
                  .replace(/{{component}}/, inheritance.component)
                  .replace(/{{pathname}}/, inheritance.pathname)
                  .replace(/{{suffix}}/, inheritanceSuffix)
                  .replace(/{{name}}/, pageContent.name),
              }}
            />
          </React.Fragment>
        )}
        {pageContent.themeDefaultProps && (
          <React.Fragment>
            <Heading hash="theme-default-props" level="h3" />
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.themeDefaultPropsDescription')
                  .replace(/{{muiName}}/, pageContent.muiName)
                  .replace(/{{defaultPropsLink}}/, defaultPropsLink),
              }}
            />
          </React.Fragment>
        )}
        {Object.keys(componentStyles.classes).length ? (
          <React.Fragment>
            <Heading hash="css" />
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.cssDescription') }} />
            <CSSList componentStyles={componentStyles} classDescriptions={classDescriptions} />
            <br />
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.overrideStyles') }} />
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.overrideStylesStyledComponent').replace(
                  /{{styleOverridesLink}}/,
                  styleOverridesLink,
                ),
              }}
            />
          </React.Fragment>
        ) : null}
        {componentSlots?.length ? (
          <React.Fragment>
            <Heading hash="slots" />
            {slotGuideLink && (
              <p
                dangerouslySetInnerHTML={{
                  __html: t('api-docs.slotDescription').replace(/{{slotGuideLink}}/, slotGuideLink),
                }}
              />
            )}
            <SlotsTable componentSlots={componentSlots} slotDescriptions={slotDescriptions} />
            <br />
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.overrideStyles') }} />
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.overrideStylesStyledComponent').replace(
                  /{{styleOverridesLink}}/,
                  styleOverridesLink,
                ),
              }}
            />
          </React.Fragment>
        ) : null}
        {hasClasses ? (
          <React.Fragment>
            <Heading hash="classes" />
            <p
              dangerouslySetInnerHTML={{
                __html: t('api-docs.classesDescription'),
              }}
            />
            <ClassesTable
              componentClasses={componentClasses}
              componentName={pageContent.name}
              classDescriptions={classDescriptions}
            />
            <br />
          </React.Fragment>
        ) : null}
      </MarkdownElement>
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 12 6">
          <path d="M8.9176 0.083252H7.1676C6.84677 0.083252 6.58427 0.345752 6.58427 0.666585C6.58427 0.987419 6.84677 1.24992 7.1676 1.24992H8.9176C9.8801 1.24992 10.6676 2.03742 10.6676 2.99992C10.6676 3.96242 9.8801 4.74992 8.9176 4.74992H7.1676C6.84677 4.74992 6.58427 5.01242 6.58427 5.33325C6.58427 5.65409 6.84677 5.91659 7.1676 5.91659H8.9176C10.5276 5.91659 11.8343 4.60992 11.8343 2.99992C11.8343 1.38992 10.5276 0.083252 8.9176 0.083252ZM3.6676 2.99992C3.6676 3.32075 3.9301 3.58325 4.25094 3.58325H7.75094C8.07177 3.58325 8.33427 3.32075 8.33427 2.99992C8.33427 2.67909 8.07177 2.41659 7.75094 2.41659H4.25094C3.9301 2.41659 3.6676 2.67909 3.6676 2.99992ZM4.83427 4.74992H3.08427C2.12177 4.74992 1.33427 3.96242 1.33427 2.99992C1.33427 2.03742 2.12177 1.24992 3.08427 1.24992H4.83427C5.1551 1.24992 5.4176 0.987419 5.4176 0.666585C5.4176 0.345752 5.1551 0.083252 4.83427 0.083252H3.08427C1.47427 0.083252 0.167603 1.38992 0.167603 2.99992C0.167603 4.60992 1.47427 5.91659 3.08427 5.91659H4.83427C5.1551 5.91659 5.4176 5.65409 5.4176 5.33325C5.4176 5.01242 5.1551 4.74992 4.83427 4.74992Z" />
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
