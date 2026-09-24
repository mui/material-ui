import * as React from 'react';
import { Ad, AdGuest } from '../Ad';
import { RichMarkdownElement } from './RichMarkdownElement';
import { AppLayoutDocs } from '../AppLayout';
import { useUserLanguage } from '../i18n';

export interface MarkdownDocsProps {
  wideLayout?: boolean;
  demoComponents?: Record<string, React.ComponentType<any>>;
  demos?: Record<string, any>;
  disableAd?: boolean;
  disableToc?: boolean;
  docs: Record<string, any>;
  srcComponents?: Record<string, React.ComponentType<any>>;
}

export function MarkdownDocs(props: MarkdownDocsProps) {
  const {
    disableAd = false,
    disableToc = false,
    wideLayout,
    demos = {},
    docs,
    demoComponents = {},
    srcComponents,
  } = props;

  const userLanguage = useUserLanguage();
  const localizedDoc = docs[userLanguage] || docs.en;

  return (
    <AppLayoutDocs
      cardOptions={{
        description: localizedDoc.headers.cardDescription,
        title: localizedDoc.headers.cardTitle,
      }}
      description={localizedDoc.description}
      disableAd={disableAd}
      disableToc={disableToc}
      wideLayout={wideLayout}
      location={localizedDoc.location}
      title={localizedDoc.title}
      toc={localizedDoc.toc}
    >
      {disableAd ? null : (
        <AdGuest>
          <Ad />
        </AdGuest>
      )}
      {localizedDoc.rendered.map((renderedMarkdownOrDemo: any, index: number) => (
        <RichMarkdownElement
          key={`demos-section-${index}`}
          demoComponents={demoComponents}
          demos={demos}
          disableAd={disableAd}
          localizedDoc={localizedDoc}
          renderedMarkdownOrDemo={renderedMarkdownOrDemo}
          srcComponents={srcComponents}
        />
      ))}
    </AppLayoutDocs>
  );
}
