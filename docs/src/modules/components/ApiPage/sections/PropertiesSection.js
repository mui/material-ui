/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTranslate } from '@mui/docs/i18n';
import { SectionTitle } from '@mui/docs/SectionTitle';
import ToggleDisplayOption, {
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import PropertiesList, { getHash } from 'docs/src/modules/components/ApiPage/list/PropertiesList';
import PropertiesTable from 'docs/src/modules/components/ApiPage/table/PropertiesTable';

export function getPropsToC({
  componentName,
  componentProps,
  inheritance,
  themeDefaultProps,
  t,
  hash,
}) {
  return {
    text: t('api-docs.props'),
    hash: hash ?? 'props',
    children: [
      ...Object.entries(componentProps)
        .filter(([, propData]) => propData.description !== '@ignore')
        .map(([propName]) => ({
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

export default function PropertiesSection(props) {
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
  const formatedProperties = Object.entries(properties)
    .filter(([, propData]) => propData.description !== '@ignore')
    .map(([propName, propData]) => {
      const isRequired = propData.required && !showOptionalAbbr;
      const isOptional = !propData.required && showOptionalAbbr;

      const isDeprecated = propData.deprecated;
      const deprecationInfo = propData.deprecationInfo;

      const typeName = propData.type?.description || propData.type.name;
      const propDefault = propData.default;
      const propDescription = propertiesDescriptions[propName];

      const additionalInfo = [
        'cssApi',
        'sx',
        'slotsApi',
        'joy-size',
        'joy-color',
        'joy-variant',
      ].filter((key) => propData.additionalInfo?.[key]);

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
        argDescription: propertiesDescriptions[propName].typeDescriptions[argName],
      }));
      const signatureReturnDescription =
        propData.signature?.returned &&
        propertiesDescriptions[propName].typeDescriptions[propData.signature.returned];

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
        <PropertiesTable properties={formatedProperties} />
      ) : (
        <PropertiesList properties={formatedProperties} displayOption={displayOption} />
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
