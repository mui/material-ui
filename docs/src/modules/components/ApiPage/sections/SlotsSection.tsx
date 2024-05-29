/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTranslate } from '@mui/docs/i18n';
import { SectionTitle } from '@mui/docs/SectionTitle';
import ToggleDisplayOption, {
  ApiDisplayOptions,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import SlotsList from 'docs/src/modules/components/ApiPage/list/SlotsList';
import SlotsTable from 'docs/src/modules/components/ApiPage/table/SlotsTable';

export type SlotsSectionProps = {
  componentSlots: { class: string; name: string; default: string }[];
  slotDescriptions: { [key: string]: string };
  componentName: string;
  title?: string;
  titleHash?: string;
  level?: 'h2' | 'h3' | 'h4';
  defaultLayout: ApiDisplayOptions;
  layoutStorageKey: string;
  spreadHint?: string;
};

export default function SlotsSection(props: SlotsSectionProps) {
  const {
    componentSlots,
    slotDescriptions,
    componentName,
    title = 'api-docs.slots',
    titleHash = 'slots',
    level = 'h2',
    spreadHint,
    defaultLayout,
    layoutStorageKey,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);

  if (!componentSlots || componentSlots.length === 0) {
    return null;
  }

  const formatedSlots = componentSlots?.map(({ class: className, name, default: defaultValue }) => {
    return {
      description: slotDescriptions[name],
      className,
      name,
      defaultValue,
      componentName,
    };
  });

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <SectionTitle title={t(title)} hash={titleHash} level={level} />
        <ToggleDisplayOption
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          sectionType="slots"
        />
      </Box>
      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      {displayOption === 'table' ? (
        <SlotsTable slots={formatedSlots} />
      ) : (
        <SlotsList slots={formatedSlots} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
