/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTranslate } from '@mui/docs/i18n';
import { SectionTitle, SectionTitleProps } from '@mui/docs/SectionTitle';
import ToggleDisplayOption, {
  ApiDisplayOptions,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import PropertiesList from 'docs/src/modules/components/ApiPage/list/PropertiesList';
import PropertiesTable from 'docs/src/modules/components/ApiPage/table/PropertiesTable';
import { PropertyDefinition } from 'docs/src/modules/components/ApiPage/common/properties';
import { LayoutStorageKeys } from 'docs/src/modules/components/ApiPage';

interface PropertiesSectionProps {
  properties: PropertyDefinition[];
  spreadHint: string;
  defaultLayout: ApiDisplayOptions;
  layoutStorageKey: LayoutStorageKeys['props'];
  /**
   * The translation key of the section title.
   * @default 'api-docs.props'
   */
  title?: string;
  /**
   * The hash linking to the section title.
   * @default 'props'
   */
  titleHash?: SectionTitleProps['hash'];
  /**
   * The title level of the section.
   * @default 'h2'
   */
  level?: SectionTitleProps['level'];
}

export default function PropertiesSection(props: PropertiesSectionProps) {
  const {
    properties,
    title = 'api-docs.props',
    titleHash = 'props',
    level = 'h2',
    spreadHint,
    defaultLayout,
    layoutStorageKey,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <SectionTitle title={t(title)} hash={titleHash} level={level} />
        <ToggleDisplayOption
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          sectionType="props"
        />
      </Box>
      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      {displayOption === 'table' ? (
        <PropertiesTable properties={properties} />
      ) : (
        <PropertiesList properties={properties} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
