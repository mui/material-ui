import { PropsTranslations, ComponentApiContent } from '@mui-internal/api-docs-builder';
import { Translate } from '@mui/docs/i18n';
import { TableOfContentsParams } from '../../ApiPage';

export type SlotDefinition = {
  className: string | null;
  hash: string;
  description?: string;
  name: string;
  defaultValue?: string;
};

export interface GetSlotsApiDefinitionsParams {
  componentSlots: ComponentApiContent['slots'];
  slotDescriptions: PropsTranslations['slotDescriptions'];
  componentName: string;
}

export function getSlotsApiDefinitions(params: GetSlotsApiDefinitionsParams): SlotDefinition[] {
  const { componentSlots, slotDescriptions, componentName } = params;

  if (!componentSlots) {
    return [];
  }
  return componentSlots.map(({ class: className, name, default: defaultValue }) => {
    return {
      description: slotDescriptions?.[name],
      className,
      name,
      defaultValue,
      hash: `${componentName}-css-${className ?? name}`,
    };
  });
}

export type GetCssToCParams = {
  slots: SlotDefinition[];
  t: Translate;
  hash?: string;
};

export const getSlotsToc = ({ slots, t, hash }: GetCssToCParams): TableOfContentsParams[] =>
  !slots || slots.length === 0
    ? []
    : [
        {
          text: t('api-docs.slots'),
          hash: hash ?? 'slots',
          children: [
            ...slots.map(({ name, hash: slotHash }) => ({
              text: name,
              hash: slotHash,
              children: [],
            })),
          ],
        },
      ];
