/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ToggleDisplayOption, {
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/ToggleDisplayOption';
import ClassesList from './list/ClassesList';
import ClassesTable from './table/ClassesTable';

type ComponentClasses = {
  classes: string[];
  globalClasses: { [classeKey: string]: string };
};
type ClassDescription = {
  [classeKey: string]: {
    description: string;
    nodeName?: string;
    conditions?: string;
  };
};
export type ClassesSectionProps = {
  componentClasses: ComponentClasses;
  classDescriptions: ClassDescription;
  componentName: string;
  spreadHint?: string;
  title: string;
  titleHash: string;
  level?: 'h2' | 'h3' | 'h4';
};

export default function ClassesSection(props: ClassesSectionProps) {
  const {
    componentClasses,
    classDescriptions,
    componentName,
    spreadHint,
    title = 'api-docs.classes',
    titleHash = 'classes',
    level: Level = 'h2',
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption('api-page-props');

  const formatedClasses = componentClasses.classes
    .map((classKey) => {
      const className =
        componentClasses.globalClasses[classKey] ||
        `Mui${componentName.replace('Unstyled', '')}-${classKey}`;

      const isGlobalStateClass = !!componentClasses.globalClasses[classKey];
      const cssClassName = `.${className}`;

      const description =
        classDescriptions[classKey] &&
        classDescriptions[classKey].description
          .replace(/{{conditions}}/, classDescriptions[classKey].conditions!)
          .replace(/{{nodeName}}/, classDescriptions[classKey].nodeName!);
      return { className, isGlobalStateClass, cssClassName, description, componentName };
    })
    .sort((a, b) => a.className.localeCompare(b.className));

  if (formatedClasses.length === 0) {
    return null;
  }

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

        <ToggleDisplayOption displayOption={displayOption} setDisplayOption={setDisplayOption} />
      </div>

      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}

      {displayOption === 'table' ? (
        <ClassesTable classes={formatedClasses} />
      ) : (
        <ClassesList classes={formatedClasses} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
