/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTranslate } from '@mui/docs/i18n';
import { SectionTitle } from '@mui/docs/SectionTitle';
import { ComponentApiContent } from '@mui-internal/api-docs-builder';
import ToggleDisplayOption, {
  ApiDisplayOptions,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import SlotsList from 'docs/src/modules/components/ApiPage/list/SlotsList';
import SlotsTable from 'docs/src/modules/components/ApiPage/table/SlotsTable';
import {
  SlotDefinition,
  getSlotsApiDefinitions,
} from 'docs/src/modules/components/ApiPage/definitions/slots';

export type SlotsSectionProps = (
  | {
      slots: SlotDefinition[];
      componentSlots?: undefined;
      slotDescriptions?: undefined;
      componentName?: undefined;
    }
  | {
      slots: undefined;
      componentSlots: ComponentApiContent['slots'];
      slotDescriptions: { [key: string]: string };
      componentName: string;
    }
) & {
  title?: string;
  titleHash?: string;
  level?: 'h2' | 'h3' | 'h4';
  defaultLayout: ApiDisplayOptions;
  layoutStorageKey: string;
  spreadHint?: string;
};

export default function SlotsSection(props: SlotsSectionProps) {
  const {
    slots,
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

  const formattedSlots =
    slots ??
    getSlotsApiDefinitions({
      componentSlots,
      slotDescriptions,
      componentName,
    });
  if (!formattedSlots || formattedSlots.length === 0) {
    return null;
  }

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
        <SlotsTable slots={formattedSlots} />
      ) : (
        <SlotsList slots={formattedSlots} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
