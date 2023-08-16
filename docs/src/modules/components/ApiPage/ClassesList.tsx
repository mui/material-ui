/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpendableApiItem from 'docs/src/modules/components/ApiPage/ExpendableApiItem';
// import ToggleDisplayOption, {
//   useApiPageOption,
// } from 'docs/src/modules/components/ApiPage/ToggleDisplayOption';

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
  spreadHint?: string;
  title: string;
  titleHash: string;
  level?: 'h2' | 'h3' | 'h4';
};

export default function ClassesList(props: ClassesListProps) {
  const {
    componentClasses,
    classDescriptions,
    componentName,
    spreadHint,
    title = 'api-docs.classesDescription',
    titleHash = 'classes',
    level: Level = 'h2',
  } = props;

  const t = useTranslate();

  // const [displayOption, setDisplayOption] = useApiPageOption('api-page-classes');

  const list = componentClasses.classes.map((classes) => ({
    classes,
    className:
      componentClasses.globalClasses[classes] ||
      `Mui${componentName.replace('Unstyled', '')}-${classes}`,
  }));

  const hashPrefix = componentName ? `${componentName}-` : '';
  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <Level id={titleHash} style={{ flexGrow: 1 }}>
          {t(title)}
          <a
            aria-labelledby={titleHash}
            className="anchor-link"
            href={`#${titleHash}`}
            tabIndex={-1}
          >
            <svg>
              <use xlinkHref="#anchor-link-icon" />
            </svg>
          </a>
        </Level>

        {/* <ToggleDisplayOption displayOption={displayOption} setDisplayOption={setDisplayOption} /> */}
      </div>

      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}

      <div>
        {list
          .sort((a, b) => a.className.localeCompare(b.className))
          .map((item) => {
            const isGlobalStateClass = !!componentClasses.globalClasses[item.classes];
            const cssClassName = `.${item.className}`;

            const description =
              classDescriptions[item.classes] &&
              classDescriptions[item.classes].description
                .replace(/{{conditions}}/, classDescriptions[item.classes].conditions!)
                .replace(/{{nodeName}}/, classDescriptions[item.classes].nodeName!);
            return (
              <ExpendableApiItem
                id={`${hashPrefix}classes-${item.className}`}
                key={item.className}
                note={isGlobalStateClass ? t('api-docs.state') : ''}
                title={cssClassName}
                type="classes"
              >
                <p dangerouslySetInnerHTML={{ __html: description }} />
              </ExpendableApiItem>
            );
          })}
      </div>
    </React.Fragment>
  );
}

ClassesList.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentClasses: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired,
};
