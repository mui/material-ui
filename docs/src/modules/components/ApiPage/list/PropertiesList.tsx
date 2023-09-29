/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import ExpendableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/ExpendableApiItem';

const StyledApiItem = styled(ExpendableApiItem)(
  ({ theme }) => ({
    '& .prop-list-description': {
      marginBottom: 10,
    },
    '& .prop-list-additional-info': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      '&>p': {
        margin: 0,
      },
      '& .prop-list-title': {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightSemiBold,
        color: theme.palette.text.primary,
        paddingRight: 5,
        whiteSpace: 'nowrap',
        margin: 0,
      },
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

function PropDescription({ description }: { description: string }) {
  const isUlPresent = description.includes('<ul>');

  const ComponentToRender = isUlPresent ? 'div' : 'p';

  return (
    <ComponentToRender
      className="prop-list-description" // This className is used by Algolia
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
}

PropDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export const getHash = ({ componentName, propName }: { componentName: string; propName: string }) =>
  `${componentName ? `${componentName}-` : ''}prop-${propName}`;

export interface PropDescriptionParams {
  componentName: string;
  propName: string;
  description?: string;
  requiresRef?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  isDeprecated?: boolean;
  deprecationInfo?: string;
  typeName: string;
  propDefault?: string;
  additionalInfo: string[];
  signature?: string;
  signatureArgs?: { argName: string; argDescription?: string }[];
  signatureReturnDescription?: string;
}

interface PropertiesListProps {
  properties: PropDescriptionParams[];
  displayOption: 'collapsed' | 'expended';
}

export default function PropertiesList(props: PropertiesListProps) {
  const { properties, displayOption } = props;
  const t = useTranslate();
  return (
    <ApiItemContaier>
      {properties.map((params) => {
        const {
          componentName,
          propName,
          description,
          requiresRef,
          isOptional,
          isRequired,
          isDeprecated,
          deprecationInfo,
          typeName,
          propDefault,
          additionalInfo,
          signature,
          signatureArgs,
          signatureReturnDescription,
        } = params;
        return (
          <StyledApiItem
            key={propName}
            id={getHash({ componentName, propName })}
            title={propName}
            note={(isOptional && 'Optional') || (isRequired && 'Required') || ''}
            type="props"
            displayOption={displayOption}
          >
            {description && <PropDescription description={description} />}

            {requiresRef && (
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

            {additionalInfo.map((key) => (
              <p
                className="prop-list-additional-description  MuiApi-collapsible"
                key={key}
                dangerouslySetInnerHTML={{
                  __html: t(`api-docs.additional-info.${key}`),
                }}
              />
            ))}
            {isDeprecated && (
              <Alert
                severity="warning"
                sx={{ mb: 1, py: 0 }}
                className="MuiApi-collapsible"
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
                {deprecationInfo && (
                  <React.Fragment>
                    {' - '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: deprecationInfo
                          .replace(/<code>/g, '<span>')
                          .replace(/<\/code>/g, '</span>'),
                      }}
                    />
                  </React.Fragment>
                )}
              </Alert>
            )}
            <div className="prop-list-additional-info">
              {typeName && (
                <p className="prop-list-type MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.type')}:</span>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: typeName.replace(/<br>&#124;/g, ' |'),
                    }}
                  />
                </p>
              )}
              {propDefault && (
                <p className="prop-list-default-props MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.default')}:</span>
                  <code className="Api-code">{propDefault}</code>
                </p>
              )}
              {signature && (
                <div className="prop-list-signature MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.signature')}:</span>

                  <div className="prop-list-content">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: signature,
                      }}
                    />

                    {signatureArgs && (
                      <div>
                        <ul>
                          {signatureArgs.map(({ argName, argDescription }) => (
                            <li
                              key={argName}
                              dangerouslySetInnerHTML={{
                                __html: `<code>${argName}</code> ${argDescription}`,
                              }}
                            />
                          ))}
                        </ul>
                      </div>
                    )}
                    {signatureReturnDescription && (
                      <p>
                        {t('api-docs.returns')}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: signatureReturnDescription,
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
    </ApiItemContaier>
  );
}
