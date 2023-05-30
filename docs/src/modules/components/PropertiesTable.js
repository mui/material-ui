/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiPage/ApiItem';

const additionalPropsInfoText = {
  cssApi: 'See <a href="#css">CSS API</a> below for more details.',
  sx: 'See the <a href="/system/getting-started/the-sx-prop/">`sx` page</a> for more details.',
  slotsApi: 'See <a href="#slots">Slots API</a> below for more details.',
  'joy-size':
    'To learn how to add custom sizes to the component, check out <a href="/joy-ui/customization/themed-components/#extend-sizes">Themed components—Extend sizes</a>.',
  'joy-color':
    'To learn how to add your own colors, check out <a href="/joy-ui/customization/themed-components/#extend-colors">Themed components—Extend colors</a>.',
  'joy-variant':
    'To learn how to add your own variants, check out <a href="/joy-ui/customization/themed-components/#extend-variants">Themed components—Extend variants</a>.',
};

export default function PropertiesTable(props) {
  const { properties, propertiesDescriptions, showOptionalAbbr = false } = props;

  const t = useTranslate();

  return (
    <div>
      {Object.entries(properties)
        .filter(([, propData]) => propData.description !== '@ignore')
        .map(([propName, propData]) => {
          // ApiItem
          const typeName = propData.type.description || propData.type.name;
          const propDefault = propData.default;

          const signature = propData.signature?.type;

          return (
            <ApiItem
              key={propName}
              id={`prop-${propName}`}
              title={propName}
              description={typeName}
              note={
                (propData.required && !showOptionalAbbr && 'Required') ||
                (!propData.required && showOptionalAbbr && 'Optional') ||
                ''
              }
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: propertiesDescriptions[propName].description || '',
                }}
              />
              {propertiesDescriptions[propName].notes && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: propertiesDescriptions[propName].notes || '',
                  }}
                />
              )}

              {Object.keys(additionalPropsInfoText)
                .filter((key) => propData.additionalInfo?.[key])
                .map((key) => (
                  <p
                    key={key}
                    dangerouslySetInnerHTML={{
                      __html: additionalPropsInfoText[key],
                    }}
                  />
                ))}
              {propData.deprecated && (
                <Alert
                  severity="warning"
                  sx={{ mb: 1, py: 0 }}
                  iconMapping={{
                    warning: (
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1.98012 11.9997H12.0201C13.0468 11.9997 13.6868 10.8864 13.1735 9.99971L8.15345 1.32638C7.64012 0.43971 6.36012 0.43971 5.84679 1.32638L0.826788 9.99971C0.313455 10.8864 0.953455 11.9997 1.98012 11.9997ZM7.00012 7.33304C6.63345 7.33304 6.33345 7.03304 6.33345 6.66638V5.33304C6.33345 4.96638 6.63345 4.66638 7.00012 4.66638C7.36679 4.66638 7.66679 4.96638 7.66679 5.33304V6.66638C7.66679 7.03304 7.36679 7.33304 7.00012 7.33304ZM7.66679 9.99971H6.33345V8.66638H7.66679V9.99971Z" />
                      </svg>
                    ),
                  }}
                >
                  {t('api-docs.deprecated')}
                  {propData.deprecationInfo && ' - '}
                  {propData.deprecationInfo && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: propData.deprecationInfo
                          .replace(/<code>/g, '<span>')
                          .replace(/<\/code>/g, '</span>'),
                      }}
                    />
                  )}
                </Alert>
              )}

              {propDefault && (
                <p className="default-props">
                  <span>{t('api-docs.default')}: </span>
                  <code>{propDefault}</code>
                </p>
              )}

              {signature && (
                <div className="signature">
                  <p>
                    <span>Signature: </span>
                    <code
                      dangerouslySetInnerHTML={{
                        __html: signature,
                      }}
                    />
                  </p>
                  {propData.signature.describedArgs && (
                    <React.Fragment>
                      <p>Args:</p>
                      <ul>
                        {propData.signature.describedArgs.map((argName) => (
                          <li
                            key={argName}
                            dangerouslySetInnerHTML={{
                              __html: propertiesDescriptions[propName].typeDescriptions[argName],
                            }}
                          />
                        ))}
                      </ul>
                    </React.Fragment>
                  )}
                  {propData.signature.returned && (
                    <p>
                      Return:{' '}
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            propertiesDescriptions[propName].typeDescriptions[
                              propData.signature.returned
                            ],
                        }}
                      />
                    </p>
                  )}
                </div>
              )}
            </ApiItem>
          );
        })}
    </div>
  );
}

PropertiesTable.propTypes = {
  properties: PropTypes.object.isRequired,
  propertiesDescriptions: PropTypes.object.isRequired,
  showOptionalAbbr: PropTypes.bool,
};
