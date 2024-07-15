import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslate, useUserLanguage } from '@mui/docs/i18n';
import { HighlightedCodeWithTabs } from '@mui/docs/HighlightedCodeWithTabs';
import { MarkdownElement } from '@mui/docs/MarkdownElement';
import Demo from 'docs/src/modules/components/Demo';

function noComponent(moduleID) {
  return function NoComponent() {
    throw new Error(`No demo component provided for '${moduleID}'`);
  };
}

export default function RichMarkdownElement(props) {
  const {
    activeTab,
    demoComponents,
    demos = {},
    disableAd,
    localizedDoc,
    renderedMarkdownOrDemo,
    srcComponents,
    theme,
    WrapperComponent: Wrapper,
    wrapperProps,
  } = props;
  const userLanguage = useUserLanguage();
  const t = useTranslate();

  if (typeof renderedMarkdownOrDemo === 'string') {
    return (
      <Wrapper {...wrapperProps}>
        <MarkdownElement renderedMarkdown={renderedMarkdownOrDemo} />
      </Wrapper>
    );
  }

  if (renderedMarkdownOrDemo.component) {
    const name = renderedMarkdownOrDemo.component;
    const Component = srcComponents?.[name];

    if (Component === undefined) {
      throw new Error(`No component found at the path 'docs/src/${name}`);
    }

    const additionalProps = {};
    if (name === 'modules/components/ComponentPageTabs.js') {
      additionalProps.activeTab = activeTab;
    }

    return (
      <Wrapper {...wrapperProps}>
        <Component {...renderedMarkdownOrDemo} {...additionalProps} markdown={localizedDoc} />
      </Wrapper>
    );
  }

  if (renderedMarkdownOrDemo.type === 'codeblock') {
    return (
      <Wrapper {...wrapperProps}>
        <HighlightedCodeWithTabs
          tabs={renderedMarkdownOrDemo.data}
          storageKey={
            renderedMarkdownOrDemo.storageKey && `codeblock-${renderedMarkdownOrDemo.storageKey}`
          }
        />
      </Wrapper>
    );
  }

  const name = renderedMarkdownOrDemo.demo;
  const demo = demos?.[name];
  if (demo === undefined) {
    const errorMessage = [
      `Missing demo: ${name}. You can use one of the following:`,
      Object.keys(demos),
    ].join('\n');

    if (userLanguage === 'en') {
      throw new Error(errorMessage);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error(errorMessage);
    }

    const warnIcon = (
      <span role="img" aria-label={t('emojiWarning')}>
        ⚠️
      </span>
    );
    return (
      <div>
        {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
        {warnIcon} Missing demo `{name}` {warnIcon}
      </div>
    );
  }

  const splitLocationBySlash = localizedDoc.location.split('/');
  splitLocationBySlash.pop();
  const fileNameWithLocation = `${splitLocationBySlash.join('/')}/${name}`;

  return (
    <Demo
      {...wrapperProps}
      mode={theme.palette.mode}
      demo={{
        raw: demo.raw,
        js: demoComponents[demo.module] ?? noComponent(demo.module),
        scope: demos.scope,
        jsxPreview: demo.jsxPreview,
        tailwindJsxPreview: demo.tailwindJsxPreview,
        cssJsxPreview: demo.cssJsxPreview,
        rawTS: demo.rawTS,
        module: demo.module,
        moduleTS: demo.moduleTS,
        tsx: demoComponents[demo.moduleTS] ?? noComponent(demo.moduleTS),
        rawTailwind: demo.rawTailwind,
        rawTailwindTS: demo.rawTailwindTS,
        jsTailwind: demoComponents[demo.moduleTailwind] ?? null,
        tsxTailwind: demoComponents[demo.moduleTSTailwind] ?? null,
        rawCSS: demo.rawCSS,
        rawCSSTS: demo.rawCSSTS,
        jsCSS: demoComponents[demo.moduleCSS] ?? null,
        tsxCSS: demoComponents[demo.moduleTSCSS] ?? null,
        gaLabel: fileNameWithLocation.replace(/^\/docs\/data\//, ''),
        relativeModules: demo.relativeModules,
      }}
      disableAd={disableAd}
      demoOptions={renderedMarkdownOrDemo}
      githubLocation={`${process.env.SOURCE_CODE_REPO}/blob/v${process.env.LIB_VERSION}${fileNameWithLocation}`}
    />
  );
}

RichMarkdownElement.propTypes = {
  activeTab: PropTypes.string,
  demoComponents: PropTypes.any,
  demos: PropTypes.any,
  disableAd: PropTypes.bool,
  localizedDoc: PropTypes.any,
  renderedMarkdownOrDemo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ component: PropTypes.any, demo: PropTypes.any }),
  ]),
  srcComponents: PropTypes.any,
  theme: PropTypes.object,
  WrapperComponent: PropTypes.elementType,
  wrapperProps: PropTypes.object,
};
