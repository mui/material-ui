/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Translator, useTranslate } from '@mui/docs/i18n';
import { SectionTitle, SectionTitleProps } from '@mui/docs/SectionTitle';
import ToggleDisplayOption, {
  ApiDisplayOptions,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import PropertiesList, { getHash } from 'docs/src/modules/components/ApiPage/list/PropertiesList';
import PropertiesTable from 'docs/src/modules/components/ApiPage/table/PropertiesTable';
import { ComponentApiContent } from '@mui-internal/api-docs-builder';
import {
  PropsTableItem,
  PropsTranslations,
} from 'packages/api-docs-builder/types/ApiBuilder.types';
import { LayoutStorageKeys } from '../../ApiPage';

interface GetPropsToCParams extends Pick<ComponentApiContent, 'inheritance' | 'themeDefaultProps'> {
  componentProps: ComponentApiContent['props'];
  componentName: ComponentApiContent['name'];
  t: Translator;
  /**
   * @default 'props'
   */
  hash?: string;
}

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
        hash: getHash({ propName, componentName }),
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

interface PropertiesSectionProps {
  properties: {
    // isProPlan and isPremiumPlan are added for the MUI X interface documentation.
    [name: string]: PropsTableItem & { isProPlan?: true; isPremiumPlan?: true };
  };
  propertiesDescriptions: PropsTranslations['propDescriptions'];
  componentName: string;
  spreadHint: string;
  defaultLayout: ApiDisplayOptions;
  layoutStorageKey: LayoutStorageKeys['props'];
  /**
   * Add indicators that the properties is optional instead of showing it is required.
   */
  showOptionalAbbr?: boolean;
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
  hooksParameters?: true;
  hooksReturnValue?: true;
}
export default function PropertiesSection(props: PropertiesSectionProps) {
  const {
    properties,
    propertiesDescriptions,
    componentName = '',
    showOptionalAbbr = false,
    title = 'api-docs.props',
    titleHash = 'props',
    level = 'h2',
    spreadHint,
    hooksParameters = false,
    hooksReturnValue = false,
    defaultLayout,
    layoutStorageKey,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);
  const formattedProperties = Object.entries(properties).map(([propName, propData]) => {
    const isRequired = propData.required && !showOptionalAbbr;
    const isOptional = !propData.required && showOptionalAbbr;

    const isDeprecated = propData.deprecated;
    const deprecationInfo = propData.deprecationInfo;

    const typeName = propData.type?.description || propData.type.name;
    const propDefault = propData.default;
    const propDescription = propertiesDescriptions[propName];

    const additionalInfo = (
      ['cssApi', 'sx', 'slotsApi', 'joy-size', 'joy-color', 'joy-variant'] as const
    ).filter((key) => propData.additionalInfo?.[key]);

    const seeMoreDescription =
      propDescription?.seeMoreText &&
      propData.seeMoreLink &&
      propDescription.seeMoreText.replace(
        '{{link}}',
        `<a href="${propData.seeMoreLink.url}">${propData.seeMoreLink.text}</a>`,
      );

    const signature = propData.signature?.type;
    const signatureArgs = propData.signature?.describedArgs?.map((argName) => ({
      argName,
      argDescription: propertiesDescriptions[propName].typeDescriptions?.[argName],
    }));
    const signatureReturnDescription =
      propData.signature?.returned &&
      propertiesDescriptions[propName].typeDescriptions?.[propData.signature.returned];

    return {
      componentName,
      propName,
      seeMoreDescription,
      description: propDescription?.description,
      requiresRef: propDescription?.requiresRef,
      isOptional,
      isRequired,
      isProPlan: propData.isProPlan,
      isPremiumPlan: propData.isPremiumPlan,
      isDeprecated,
      hooksParameters,
      hooksReturnValue,
      deprecationInfo,
      typeName,
      propDefault,
      additionalInfo,
      signature,
      signatureArgs,
      signatureReturnDescription,
    };
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

PropertiesSection.propTypes = {
  componentName: PropTypes.string,
  defaultLayout: PropTypes.oneOf(['collapsed', 'expanded', 'table']).isRequired,
  hooksParameters: PropTypes.bool,
  hooksReturnValue: PropTypes.bool,
  layoutStorageKey: PropTypes.string.isRequired,
  level: PropTypes.string,
  properties: PropTypes.object.isRequired,
  propertiesDescriptions: PropTypes.object.isRequired,
  showOptionalAbbr: PropTypes.bool,
  spreadHint: PropTypes.string,
  title: PropTypes.string,
  titleHash: PropTypes.string,
};
