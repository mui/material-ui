import { PropsTranslations, ComponentApiContent } from '@mui-internal/api-docs-builder';

export type SlotDefinition = {
  className: string | null;
  hash: string;
  description?: string;
  name: string;
  defaultValue?: string;
};

export interface SlotsApiProcessorParams {
  componentSlots: ComponentApiContent['slots'];
  slotDescriptions: PropsTranslations['slotDescriptions'];
  componentName: string;
}

export function slotsApiProcessor(params: SlotsApiProcessorParams): SlotDefinition[] {
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
