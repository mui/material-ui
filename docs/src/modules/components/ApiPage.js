/* eslint-disable material-ui/no-hardcoded-labels */
/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@mui/utils';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import { alpha } from '@mui/material/styles';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import PropertiesTable, { getPropsToC } from 'docs/src/modules/components/PropertiesTable';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import Ad from 'docs/src/modules/components/Ad';
import CSSList, { getCssToC } from './ApiPage/CSSList';
import ClassesList from './ApiPage/ClassesList';
import SlotsList from './ApiPage/SlotsList';

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

function DesignInfo() {
  return (
    <Alert
      severity="info"
      icon={<ReviewsRoundedIcon fontSize="small" color="primary" sx={{ marginTop: 0.3 }} />}
      sx={[
        (theme) => ({
          mt: 4,
          padding: '16px 20px',
          gap: 1,
          background: alpha(theme.palette.primary[50], 0.5),
          border: '1px dashed',
          borderColor: (theme.vars || theme).palette.divider,
          ...theme.applyDarkStyles({
            background: alpha(theme.palette.primary[900], 0.2),
          }),
        }),
      ]}
    >
      <AlertTitle sx={{ fontWeight: (theme) => theme.typography.fontWeightSemiBold }}>
        Have any feedback about this new API display design?
      </AlertTitle>
      <Typography>
        We&apos;ve heard from you and iterated on making the design of API content documentation
        more scalable and easier to parse! We value your input, so please don&apos;t hesitate to
        share any additional feedback you may have.
      </Typography>
      <Button variant="outlined" data-feedback-hash="new-docs-api-feedback">
        Share feedback
      </Button>
    </Alert>
  );
}

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
    slotGuideLink = '/base-ui/guides/overriding-component-structure/';
  }

  const {
    componentDescription,
    componentDescriptionToc = [],
    classDescriptions,
    propDescriptions,
    slotDescriptions,
  } = descriptions[userLanguage];
  const description = t('api-docs.pageDescription').replace(/{{name}}/, pageContent.name);

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
    getPropsToC({
      t,
      componentName: pageContent.name,
      componentProps,
      inheritance,
      themeDefaultProps: pageContent.themeDefaultProps,
    }),
    ...getCssToC({
      t,
      componentName: pageContent.name,
      componentStyles,
    }),
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
          dangerouslySetInnerHTML={{
            __html: `<p>For examples and details on the usage of this React component, visit the component demo pages:</p>
              ${demos}`,
          }}
        />
        <Heading hash="import" />
        <HighlightedCode
          code={pageContent.imports.join(`
// ${t('or')}
`)}
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
        <PropertiesTable
          properties={componentProps}
          propertiesDescriptions={propDescriptions}
          componentName={pageContent.name}
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
        />
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
            <Divider />
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
            <Divider />
          </React.Fragment>
        )}
        {Object.keys(componentStyles.classes).length ? (
          <React.Fragment>
            <Heading hash="css" />
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.cssDescription') }} />
            <br />
            <CSSList
              componentStyles={componentStyles}
              classDescriptions={classDescriptions}
              componentName={pageContent.name}
            />
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
        {componentSlots?.length > 0 ? (
          <React.Fragment>
            <Heading hash="slots" />
            {slotGuideLink && (
              <p
                dangerouslySetInnerHTML={{
                  __html: t('api-docs.slotDescription').replace(/{{slotGuideLink}}/, slotGuideLink),
                }}
              />
            )}
            <SlotsList
              componentSlots={componentSlots}
              slotDescriptions={slotDescriptions}
              componentName={pageContent.name}
            />
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.overrideStyles') }} />
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.overrideStylesStyledComponent').replace(
                  /{{styleOverridesLink}}/,
                  styleOverridesLink,
                ),
              }}
            />

            <Divider />
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
            <ClassesList
              componentClasses={componentClasses}
              componentName={pageContent.name}
              classDescriptions={classDescriptions}
            />
          </React.Fragment>
        ) : null}
        <DesignInfo />
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
