/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
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
  // const t = useTranslate();

  const hashPrefix = componentName ? `${componentName}-` : '';
  return (
    <React.Fragment>
      {componentStyles.classes.map((className) => {
        const isGlobalStateClass = !!componentStyles.globalClasses[className];
        return (
          <ApiItem
            id={`${hashPrefix}classes-${className}`}
            key={className}
            description={`${className}${isGlobalStateClass ? ' (State)' : ''}`}
            title={`.${
              componentStyles.globalClasses[className] || `${componentStyles.name}-${className}`
            }`}
            note="Required"
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
    </React.Fragment>
  );
}

CSSList.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentStyles: PropTypes.object.isRequired,
};
