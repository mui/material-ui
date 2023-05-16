import * as React from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Demo from 'docs/src/modules/components/Demo';

function noComponent(moduleID) {
  return function NoComponent() {
    throw new Error(`No demo component provided for '${moduleID}'`);
  };
}

export default function MarkdownElementV2({
  renderedMarkdownOrDemo,
  WrapperComponent: Wrapper,
  wrapperProps,
  srcComponents,
  activeTab,
  localizedDoc,
  demos = {},
  location,
  theme,
  demoComponents,
  disableAd,
}) {
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
    const additionalProps = {};

    if (Component === undefined) {
      throw new Error(`No component found at the path ${path.join('docs/src', name)}`);
    }
    if (name.indexOf('Tabs') >= 0) {
      additionalProps.activeTab = activeTab;
    }

    return (
      <Wrapper {...wrapperProps}>
        <Component {...renderedMarkdownOrDemo} {...additionalProps} markdown={localizedDoc} />
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

  const splitLocationBySlash = location.split('/');
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
        rawTS: demo.rawTS,
        tsx: demoComponents[demo.moduleTS] ?? null,
      }}
      disableAd={disableAd}
      demoOptions={renderedMarkdownOrDemo}
      githubLocation={`${process.env.SOURCE_CODE_REPO}/blob/v${process.env.LIB_VERSION}${fileNameWithLocation}`}
    />
  );
}

MarkdownElementV2.propTypes = {
  activeTab: PropTypes.string,
  demoComponents: PropTypes.any,
  demos: PropTypes.any,
  disableAd: PropTypes.bool,
  localizedDoc: PropTypes.any,
  location: PropTypes.string,
  renderedMarkdownOrDemo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ component: PropTypes.any, demo: PropTypes.any }),
  ]),
  srcComponents: PropTypes.any,
  theme: PropTypes.object,
  WrapperComponent: PropTypes.elementType,
  wrapperProps: PropTypes.object,
};
