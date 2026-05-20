import * as React from 'react';
import { HighlightedCodeWithTabs } from '../HighlightedCodeWithTabs';
import { MarkdownElement } from './MarkdownElement';

export interface RichMarkdownElementProps {
  activeTab?: string;
  localizedDoc: {
    location: string;
    [key: string]: any;
  };
  renderedMarkdownOrDemo:
    | string
    | {
        component?: any;
        demo?: string;
        type?: string;
        data?: any;
        storageKey?: string;
        [key: string]: any;
      };
  srcComponents?: Record<string, React.ComponentType<any>>;
}

export function RichMarkdownElement(props: RichMarkdownElementProps) {
  const { activeTab, localizedDoc, renderedMarkdownOrDemo, srcComponents } = props;

  if (typeof renderedMarkdownOrDemo === 'string') {
    return <MarkdownElement renderedMarkdown={renderedMarkdownOrDemo} />;
  }

  if (renderedMarkdownOrDemo.component) {
    const name = renderedMarkdownOrDemo.component;
    const Component = srcComponents?.[name];

    if (Component === undefined) {
      throw new Error(`No component found at the path 'docs/src/${name}`);
    }

    const additionalProps: Record<string, any> = {};
    if (name === 'modules/components/ComponentPageTabs.js') {
      additionalProps.activeTab = activeTab;
    }

    return <Component {...renderedMarkdownOrDemo} {...additionalProps} markdown={localizedDoc} />;
  }

  if (renderedMarkdownOrDemo.type === 'codeblock') {
    return (
      <HighlightedCodeWithTabs
        tabs={renderedMarkdownOrDemo.data}
        storageKey={
          renderedMarkdownOrDemo.storageKey && `codeblock-${renderedMarkdownOrDemo.storageKey}`
        }
      />
    );
  }

  throw new Error(
    `MUI: Inline demos are no longer supported by RichMarkdownElement. ` +
      `Migrate the demo "${renderedMarkdownOrDemo.demo}" to the new createDemo flow.`,
  );
}
