/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiPage/ApiItem';

// TODO: Move to translation
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

const StyledApiItem = styled(ApiItem)(
  ({ theme }) => ({
    '& .prop-list-description': {
      marginBottom: 10,
    },
    '& .prop-list-additional-info': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      '& .prop-list-title': {
        paddingRight: 5,
        whiteSpace: 'nowrap',
        p: {
          ...theme.typography.body2,
          margin: 0,
          fontWeight: theme.typography.fontWeightSemiBold,
        },
      },
      '&>div': { display: 'flex', alignItems: 'baseline' },
    },
    '& .prop-list-default-props': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
    },
    '& .prop-list-signature': {
      p: {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightSemiBold,
        marginBottom: 8,
      },
      ul: {
        paddingLeft: 24,
        marginTop: 2,
        marginBottom: 0,
      },
      '&>code': {
        borderRadius: 8,
        padding: 12,
        width: '100%',
        marginBottom: 8,
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[50]})`,
        border: '1px solid',
        borderColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
        backgroundColor: `var(--muidocs-palette-primaryDark-800, ${lightTheme.palette.primaryDark[800]})`,
      },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .prop-list-additional-info': {
        '& .prop-list-title': {
          p: {
            color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
          },
        },
      },

      '& .prop-list-default-props': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
      },
    },
  }),
);

const getHash = ({ componentName, propName }) =>
  `${componentName ? `${componentName}-` : ''}prop-${propName}`;

export const getPropsToC = ({
  componentName,
  componentProps,
  inheritance,
  themeDefaultProps,
  t,
  hash,
}) => ({
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
});

export default function PropertiesTable(props) {
  const {
    properties,
    propertiesDescriptions,
    componentName = '',
    showOptionalAbbr = false,
  } = props;
  const t = useTranslate();

  return (
    <div>
      {Object.entries(properties)
        .filter(([, propData]) => propData.description !== '@ignore')
        .map(([propName, propData]) => {
          // ApiItem
          const typeName = propData.type?.description || propData.type.name;
          const propDefault = propData.default;
          const propDescription = propertiesDescriptions[propName];
          const signature = propData.signature?.type;

          return (
            <StyledApiItem
              key={propName}
              id={getHash({ componentName, propName })}
              title={propName}
              note={
                (propData.required && !showOptionalAbbr && 'Required') ||
                (!propData.required && showOptionalAbbr && 'Optional') ||
                ''
              }
              type="props"
            >
              {propDescription?.description && (
                <p
                  className="prop-list-description" // This className is used by Algolia
                  dangerouslySetInnerHTML={{
                    __html: propDescription?.description,
                  }}
                />
              )}
              {propDescription?.requiresRef && (
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
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t('api-docs.requires-ref'),
                    }}
                  />
                </Alert>
              )}

              {Object.keys(additionalPropsInfoText)
                .filter((key) => propData.additionalInfo?.[key])
                .map((key) => (
                  <p
                    className="prop-list-additional-description"
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
              <div className="prop-list-additional-info">
                {typeName && (
                  <div className="prop-list-type">
                    <div className="prop-list-title">
                      <p>{t('api-docs.type')}:</p>
                    </div>
                    <div className="prop-list-content">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: typeName.replace(/<br>&#124;/g, ' |'),
                        }}
                      />
                    </div>
                  </div>
                )}
                {propDefault && (
                  <div className="prop-list-default-props">
                    <div className="prop-list-title">
                      <p>{t('api-docs.default')}:</p>
                    </div>
                    <div className="prop-list-content">
                      <code className="Api-code">{propDefault}</code>
                    </div>
                  </div>
                )}
                {signature && (
                  <div className="prop-list-signature">
                    <div className="prop-list-title">
                      <p>{t('api-docs.signature')}:</p>
                    </div>
                    <div className="prop-list-content">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: signature,
                        }}
                      />
                      {propData.signature.describedArgs && (
                        <div>
                          <ul>
                            {propData.signature.describedArgs.map((argName) => (
                              <li
                                key={argName}
                                dangerouslySetInnerHTML={{
                                  __html: `<code>${argName}</code> ${propertiesDescriptions[propName].typeDescriptions[argName]}`,
                                }}
                              />
                            ))}
                          </ul>
                        </div>
                      )}
                      {propData.signature.returned && (
                        <p>
                          {t('api-docs.returns')}
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
                  </div>
                )}
              </div>
            </StyledApiItem>
          );
        })}
    </div>
  );
}

PropertiesTable.propTypes = {
  componentName: PropTypes.string,
  properties: PropTypes.object.isRequired,
  propertiesDescriptions: PropTypes.object.isRequired,
  showOptionalAbbr: PropTypes.bool,
};
