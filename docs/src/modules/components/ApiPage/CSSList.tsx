/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiItem';

export type CSSListProps = {
  componentStyles: {
    classes: string[];
    globalClasses: { [classeKey: string]: string };
    name: null | string;
  };
  classDescriptions: {
    [classeKey: string]: {
      description: string;
      nodeName?: string;
      conditions?: string;
    };
  };
  componentName?: string;
};

export default function CSSList(props: CSSListProps) {
  const { componentStyles, classDescriptions, componentName } = props;
  const t = useTranslate();

  const hashPrefix = componentName ? `${componentName}-` : '';
  return (
    <div className="MuiApi-css-list">
      {componentStyles.classes.map((className) => {
        const isGlobalStateClass = !!componentStyles.globalClasses[className];
        return (
          <ApiItem
            id={`${hashPrefix}css-${className}`}
            key={className}
            description={`${className}${isGlobalStateClass ? ' (State)' : ''}`}
            title={`.${
              componentStyles.globalClasses[className] || `${componentStyles.name}-${className}`
            }`}
            note={isGlobalStateClass ? t('api-docs.state') : ''}
            type='CSS'
          >
            <p
              dangerouslySetInnerHTML={{
                __html:
                  classDescriptions[className] &&
                  classDescriptions[className].description
                    .replace(
                      /{{conditions}}/,
                      classDescriptions[className].conditions ?? '{{conditions}}',
                    )
                    .replace(
                      /{{nodeName}}/,
                      classDescriptions[className].nodeName ?? '{{nodeName}}',
                    ),
              }}
            />
          </ApiItem>
        );
      })}
    </div>
  );
}

CSSList.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentStyles: PropTypes.object.isRequired,
};
