/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { ComponentApiContent, PropsTranslations } from '@mui-internal/api-docs-builder';
import exactProp from '@mui/utils/exactProp';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { TableOfContentsEntry } from '@mui/internal-markdown';
import { Ad, AdGuest } from '@mui/docs/Ad';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Translate, useTranslate, useUserLanguage } from '@mui/docs/i18n';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { BrandingProvider } from '@mui/docs/branding';
import { SectionTitle, SectionTitleProps } from '@mui/docs/SectionTitle';
import { MarkdownElement } from '@mui/docs/MarkdownElement';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import PropertiesSection from 'docs/src/modules/components/ApiPage/sections/PropertiesSection';
import ClassesSection from 'docs/src/modules/components/ApiPage/sections/ClassesSection';
import SlotsSection from 'docs/src/modules/components/ApiPage/sections/SlotsSection';
import {
  ApiDisplayOptions,
  DEFAULT_API_LAYOUT_STORAGE_KEYS,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import {
  getPropertiesToC,
  getPropsApiDefinitions,
} from 'docs/src/modules/components/ApiPage/definitions/properties';
import {
  getClassApiDefinitions,
  getClassesToC,
} from 'docs/src/modules/components/ApiPage/definitions/classes';
import { getSlotsApiDefinitions } from 'docs/src/modules/components/ApiPage/definitions/slots';

// TODO Move this type definition to the AppLayoutDocs file when moved to TS
export interface TableOfContentsParams {
  children: (TableOfContentsParams | TableOfContentsEntry)[];
  hash: string;
  text: string;
}

type ApiHeaderKeys =
  | 'demos'
  | 'import'
  | 'props'
  | 'theme-default-props'
  | 'inheritance'
  | 'slots'
  | 'classes'
  | 'css';

export function getTranslatedHeader(t: Translate, header: ApiHeaderKeys) {
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

function Heading(props: Pick<SectionTitleProps<ApiHeaderKeys>, 'hash' | 'level'>) {
  const { hash, level = 'h2' } = props;
  const t = useTranslate();
  return <SectionTitle title={getTranslatedHeader(t, hash)} hash={hash} level={level} />;
}

Heading.propTypes = {
  hash: PropTypes.string.isRequired,
  level: PropTypes.string,
};

export interface LayoutStorageKeys {
  slots: string;
  props: string;
  classes: string;
}

interface ApiPageProps {
  descriptions: {
    [lang: string]: PropsTranslations & {
      // Table of Content added by the mapApiPageTranslations function
      componentDescriptionToc: TableOfContentsParams[];
    };
  };
  disableAd?: boolean;
  pageContent: ComponentApiContent;
  defaultLayout?: ApiDisplayOptions;
  /**
   * The localStorage key used to save the user layout for each section.
   * It's useful to dave different preferences on different pages.
   * For example, the data grid has a different key that the core.
   */
  layoutStorageKey?: LayoutStorageKeys;
}
export default function ApiPage(props: ApiPageProps) {
  const {
    descriptions,
    disableAd = false,
    pageContent,
    defaultLayout = 'table',
    layoutStorageKey = DEFAULT_API_LAYOUT_STORAGE_KEYS,
  } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();

  const {
    cssComponent,
    demos,
    deprecated,
    filename,
    forwardsRefTo,
    inheritance,
    props: componentProps,
    spread,
    slots: componentSlots = [],
    classes,
  } = pageContent;

  const componentClasses = Array.isArray(classes)
    ? [...classes].sort((c1, c2) => c1.className.localeCompare(c2.className))
    : [];

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
    slotGuideLink = '/joy-ui/customization/overriding-component-structure/';
  } else if (isBaseComponent) {
    slotGuideLink = '/base-ui/guides/overriding-component-structure/';
  }

  const {
    componentDescription,
    componentDescriptionToc = [],
    classDescriptions,
    deprecationInfo,
    propDescriptions,
    slotDescriptions = {},
  } = descriptions[userLanguage];
  const description = t('api-docs.pageDescription').replace(/{{name}}/, pageContent.name);

  // Prefer linking the .tsx or .d.ts for the "Edit this page" link.
  const apiSourceLocation = filename.replace('.js', '.d.ts');

  // Merge data and translation
  const propertiesDef = getPropsApiDefinitions({
    componentName: pageContent.name,
    properties: componentProps,
    propertiesDescriptions: propDescriptions,
  });
  const classesDef = getClassApiDefinitions({
    componentClasses,
    componentName: pageContent.name,
    classDescriptions,
  });
  const slotsDef = getSlotsApiDefinitions({
    componentSlots,
    componentName: pageContent.name,
    slotDescriptions,
  });

  function createTocEntry(sectionName: ApiHeaderKeys): TableOfContentsParams {
    return {
      text: getTranslatedHeader(t, sectionName),
      hash: sectionName,
      children: [
        ...(sectionName === 'props' && inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : ([] as TableOfContentsParams[])),
        ...(sectionName === 'props' && pageContent.themeDefaultProps
          ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
          : ([] as TableOfContentsParams[])),
      ],
    };
  }

  const toc: TableOfContentsParams[] = [
    createTocEntry('demos'),
    createTocEntry('import'),
    ...componentDescriptionToc,
    getPropertiesToC({ properties: propertiesDef, hash: 'props', t }),
    ...(componentSlots?.length > 0 ? [createTocEntry('slots')] : []),
    ...getClassesToC({ classes: classesDef, t }),
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
        {deprecated ? (
          <Alert
            severity="warning"
            icon={<WarningRoundedIcon fontSize="small" />}
            sx={{ mt: 1.5, mb: 3 }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: deprecationInfo || t('api-docs.defaultDeprecationMessage'),
              }}
            />
          </Alert>
        ) : null}
        <Typography variant="h5" component="p" className="description" gutterBottom>
          {description}
          {disableAd ? null : (
            <BrandingProvider>
              <AdGuest>
                <Ad />
              </AdGuest>
            </BrandingProvider>
          )}
        </Typography>
        <Heading hash="demos" />
        <Alert severity="success" icon={<VerifiedRoundedIcon fontSize="small" />}>
          <span
            dangerouslySetInnerHTML={{
              __html: `<p>For examples and details on the usage of this React component, visit the component demo pages:</p>
              ${demos}`,
            }}
          />
        </Alert>
        <Heading hash="import" />
        <HighlightedCode
          code={pageContent.imports.join(`
// ${t('or')}
`)}
          language="jsx"
        />
        {pageContent.imports.length > 1 && (
          <p dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} />
        )}
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
        <PropertiesSection
          properties={propertiesDef}
          spreadHint={spreadHint}
          defaultLayout={defaultLayout}
          layoutStorageKey={layoutStorageKey.props}
        />
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
        <div
          className="MuiCallout-root MuiCallout-info"
          dangerouslySetInnerHTML={{ __html: refHint }}
          style={{
            alignItems: 'baseline',
            gap: '4px',
            marginTop: 0,
          }}
        />
        {inheritance && (
          <React.Fragment>
            <Heading hash="inheritance" level="h3" />
            <p
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
            <p
              dangerouslySetInnerHTML={{
                __html: t('api-docs.themeDefaultPropsDescription')
                  .replace(/{{muiName}}/, pageContent.muiName)
                  .replace(/{{defaultPropsLink}}/, defaultPropsLink),
              }}
            />
          </React.Fragment>
        )}
        <SlotsSection
          slots={slotsDef}
          spreadHint={
            slotGuideLink &&
            t('api-docs.slotDescription').replace(/{{slotGuideLink}}/, slotGuideLink)
          }
          defaultLayout={defaultLayout}
          layoutStorageKey={layoutStorageKey.slots}
        />
        <ClassesSection
          classes={classesDef}
          spreadHint={t('api-docs.classesDescription')}
          styleOverridesLink={styleOverridesLink}
          defaultLayout={defaultLayout}
          layoutStorageKey={layoutStorageKey.classes}
          displayClassKeys
        />
      </MarkdownElement>
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 12 6">
          <path d="M8.9176 0.083252H7.1676C6.84677 0.083252 6.58427 0.345752 6.58427 0.666585C6.58427 0.987419 6.84677 1.24992 7.1676 1.24992H8.9176C9.8801 1.24992 10.6676 2.03742 10.6676 2.99992C10.6676 3.96242 9.8801 4.74992 8.9176 4.74992H7.1676C6.84677 4.74992 6.58427 5.01242 6.58427 5.33325C6.58427 5.65409 6.84677 5.91659 7.1676 5.91659H8.9176C10.5276 5.91659 11.8343 4.60992 11.8343 2.99992C11.8343 1.38992 10.5276 0.083252 8.9176 0.083252ZM3.6676 2.99992C3.6676 3.32075 3.9301 3.58325 4.25094 3.58325H7.75094C8.07177 3.58325 8.33427 3.32075 8.33427 2.99992C8.33427 2.67909 8.07177 2.41659 7.75094 2.41659H4.25094C3.9301 2.41659 3.6676 2.67909 3.6676 2.99992ZM4.83427 4.74992H3.08427C2.12177 4.74992 1.33427 3.96242 1.33427 2.99992C1.33427 2.03742 2.12177 1.24992 3.08427 1.24992H4.83427C5.1551 1.24992 5.4176 0.987419 5.4176 0.666585C5.4176 0.345752 5.1551 0.083252 4.83427 0.083252H3.08427C1.47427 0.083252 0.167603 1.38992 0.167603 2.99992C0.167603 4.60992 1.47427 5.91659 3.08427 5.91659H4.83427C5.1551 5.91659 5.4176 5.65409 5.4176 5.33325C5.4176 5.01242 5.1551 4.74992 4.83427 4.74992Z" />
        </symbol>
      </svg>
    </AppLayoutDocs>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ApiPage.propTypes = exactProp({
    defaultLayout: PropTypes.oneOf(['collapsed', 'expanded', 'table']),
    descriptions: PropTypes.object.isRequired,
    disableAd: PropTypes.bool,
    layoutStorageKey: PropTypes.shape({
      classes: PropTypes.string,
      props: PropTypes.string,
      slots: PropTypes.string,
    }),
    pageContent: PropTypes.object.isRequired,
  });
}
