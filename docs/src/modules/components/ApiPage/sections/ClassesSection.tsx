/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from '@mui/docs/i18n';
import { SectionTitle } from '@mui/docs/SectionTitle';
import Box from '@mui/material/Box';
import ToggleDisplayOption, {
  ApiDisplayOptions,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import ClassesList from 'docs/src/modules/components/ApiPage/list/ClassesList';
import ClassesTable from 'docs/src/modules/components/ApiPage/table/ClassesTable';
import { ClassDefinition } from '../common/classes';

export type ClassesSectionProps = {
  classes: ClassDefinition[];
  spreadHint?: string;
  /**
   * The translation key of the section title.
   * @default 'api-docs.classes'
   */
  title?: string;
  /**
   * @default 'classes'
   */
  titleHash?: string;
  /**
   * @default 'h2'
   */
  level?: 'h2' | 'h3' | 'h4';
  defaultLayout: ApiDisplayOptions;
  layoutStorageKey: string;
  displayClassKeys: boolean;
  styleOverridesLink: string;
};

export default function ClassesSection(props: ClassesSectionProps) {
  const {
    classes,
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

  if (!classes || classes.length === 0) {
    return null;
  }

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
        <ClassesTable classes={classes} displayClassKeys={displayClassKeys} />
      ) : (
        <ClassesList
          classes={classes}
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
