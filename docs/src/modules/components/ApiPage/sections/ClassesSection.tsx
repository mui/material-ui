/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from '@mui/docs/i18n';
import { SectionTitle } from '@mui/docs/SectionTitle';
import { ComponentClassDefinition } from '@mui/internal-docs-utils';
import Box from '@mui/material/Box';
import ToggleDisplayOption, {
  ApiDisplayOptions,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import ClassesList, { getHash } from 'docs/src/modules/components/ApiPage/list/ClassesList';
import ClassesTable from 'docs/src/modules/components/ApiPage/table/ClassesTable';

export type GetCssToCParams = {
  componentName: string;
  componentClasses: ComponentClassDefinition[];
  t: (key: any, options?: {}) => any;
  hash?: string;
};

export const getClassesToC = ({ componentName, componentClasses, t, hash }: GetCssToCParams) =>
  !componentClasses || componentClasses.length === 0
    ? []
    : [
        {
          text: t('api-docs.classes'),
          hash: hash ?? 'classes',
          children: [
            ...componentClasses.map((styles) => ({
              text: styles.key,
              hash: getHash({ componentName, className: styles.key }),
              children: [],
            })),
          ],
        },
      ];
type ClassDescription = {
  [classKey: string]: {
    description: string;
    nodeName?: string;
    conditions?: string;
    deprecationInfo?: string;
  };
};
export type ClassesSectionProps = {
  componentClasses: ComponentClassDefinition[];
  classDescriptions: ClassDescription;
  componentName: string;
  spreadHint?: string;
  title: string;
  titleHash: string;
  level?: 'h2' | 'h3' | 'h4';
  defaultLayout: ApiDisplayOptions;
  layoutStorageKey: string;
  displayClassKeys: boolean;
  styleOverridesLink: string;
};

export default function ClassesSection(props: ClassesSectionProps) {
  const {
    componentClasses,
    classDescriptions,
    componentName,
    spreadHint,
    title = 'api-docs.classes',
    titleHash = 'classes',
    level = 'h2',
    displayClassKeys,
    styleOverridesLink,
    defaultLayout,
    layoutStorageKey,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);

  if (!componentClasses || componentClasses.length === 0) {
    return null;
  }

  const classesWithTranslatedDescriptions = componentClasses.map((classDefinition) => {
    return {
      ...classDefinition,
      description:
        classDescriptions[classDefinition.key]?.description
          ?.replace(/{{conditions}}/, classDescriptions[classDefinition.key].conditions!)
          ?.replace(/{{nodeName}}/, classDescriptions[classDefinition.key].nodeName!) ??
        classDefinition.description,
      deprecationInfo: classDescriptions[classDefinition.key]?.deprecationInfo,
    };
  });

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <SectionTitle title={t(title)} hash={titleHash} level={level} />
        <ToggleDisplayOption
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          sectionType="classes"
        />
      </Box>
      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      {displayOption === 'table' ? (
        <ClassesTable
          classes={classesWithTranslatedDescriptions}
          componentName={componentName}
          displayClassKeys={displayClassKeys}
        />
      ) : (
        <ClassesList
          classes={classesWithTranslatedDescriptions}
          componentName={componentName}
          displayOption={displayOption}
          displayClassKeys={displayClassKeys}
        />
      )}
      {styleOverridesLink && (
        <React.Fragment>
          <br />
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
      )}
    </React.Fragment>
  );
}
