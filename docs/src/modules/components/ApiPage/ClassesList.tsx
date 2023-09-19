/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiItem';

export type ClassesListProps = {
  componentClasses: {
    classes: string[];
    globalClasses: { [classeKey: string]: string };
  };
  classDescriptions: {
    [classeKey: string]: {
      description: string;
      nodeName?: string;
      conditions?: string;
    };
  };
  componentName: string;
};

export default function ClassesList(props: ClassesListProps) {
  const { componentClasses, classDescriptions, componentName } = props;
  const t = useTranslate();

  const list = componentClasses.classes.map((classes) => ({
    classes,
    className:
      componentClasses.globalClasses[classes] ||
      `Mui${componentName.replace('Unstyled', '')}-${classes}`,
  }));

  const hashPrefix = componentName ? `${componentName}-` : '';
  return (
    <div>
      {list
        .sort((a, b) => a.className.localeCompare(b.className))
        .map((item) => {
          const isGlobalStateClass = !!componentClasses.globalClasses[item.classes];
          const cssClassName = `.${item.className}`;
          return (
            <ApiItem
              id={`${hashPrefix}classes-${item.className}`}
              key={item.className}
              note={isGlobalStateClass ? t('api-docs.state') : ''}
              title={cssClassName}
              type="classes"
            >
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    classDescriptions[item.classes] &&
                    classDescriptions[item.classes].description
                      .replace(/{{conditions}}/, classDescriptions[item.classes].conditions!)
                      .replace(/{{nodeName}}/, classDescriptions[item.classes].nodeName!),
                }}
              />
            </ApiItem>
          );
        })}
    </div>
  );
}

ClassesList.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentClasses: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired,
};
