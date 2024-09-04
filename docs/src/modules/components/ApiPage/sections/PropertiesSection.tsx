/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import { Translate, useTranslate } from '@mui/docs/i18n';
import { SectionTitle, SectionTitleProps } from '@mui/docs/SectionTitle';
import ToggleDisplayOption, {
  ApiDisplayOptions,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import PropertiesList from 'docs/src/modules/components/ApiPage/list/PropertiesList';
import PropertiesTable from 'docs/src/modules/components/ApiPage/table/PropertiesTable';
import {
  PropertyDefinition,
  getPropsApiDefinitions,
} from 'docs/src/modules/components/ApiPage/definitions/properties';
import { LayoutStorageKeys } from 'docs/src/modules/components/ApiPage';
import {
  ComponentApiContent,
  PropsTableItem,
  PropsTranslations,
} from '@mui-internal/api-docs-builder';
import kebabCase from 'lodash/kebabCase';

interface GetPropsToCParams extends Pick<ComponentApiContent, 'inheritance' | 'themeDefaultProps'> {
  componentProps: ComponentApiContent['props'];
  componentName: ComponentApiContent['name'];
  t: Translate;
  /**
   * @default 'props'
   */
  hash?: string;
}

/**
 * @deprecated Use the one from ApiPage/definitions
 */
export function getPropsToC({
  componentName,
  componentProps,
  inheritance,
  themeDefaultProps,
  t,
  hash = 'props',
}: GetPropsToCParams) {
  return {
    text: t('api-docs.props'),
    hash,
    children: [
      ...Object.entries(componentProps).map(([propName]) => ({
        text: propName,
        hash: `${kebabCase(componentName)}-prop-${propName}`,
        children: [],
      })),
      ...(inheritance
        ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
        : []),
      ...(themeDefaultProps
        ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
        : []),
    ],
  };
}

type PropertiesSectionProps = (
  | {
      properties: {
        // isProPlan and isPremiumPlan are added for the MUI X interface documentation.
        [name: string]: PropsTableItem & { isProPlan?: true; isPremiumPlan?: true };
      };
      propertiesDescriptions: PropsTranslations['propDescriptions'];
      componentName: string;
      /**
       * Add indicators that the properties is optional instead of showing it is required.
       */
      showOptionalAbbr?: boolean;
    }
  | {
      showOptionalAbbr?: undefined;
      properties: PropertyDefinition[];
      propertiesDescriptions?: undefined;
      componentName?: undefined;
    }
) & {
  spreadHint?: string;
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
};

export default function PropertiesSection(props: PropertiesSectionProps) {
  const {
    properties,
    propertiesDescriptions,
    componentName,
    title = 'api-docs.props',
    titleHash = 'props',
    level = 'h2',
    spreadHint,
    defaultLayout,
    layoutStorageKey,
    showOptionalAbbr,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);

  const formattedProperties = Array.isArray(properties)
    ? properties
    : getPropsApiDefinitions({
        properties,
        propertiesDescriptions: propertiesDescriptions!,
        componentName: componentName!,
        showOptionalAbbr,
      });

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
        <PropertiesTable properties={formattedProperties} />
      ) : (
        <PropertiesList properties={formattedProperties} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
