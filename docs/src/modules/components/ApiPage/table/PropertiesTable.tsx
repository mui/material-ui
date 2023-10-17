/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import {
  PropDescriptionParams,
  getHash,
} from 'docs/src/modules/components/ApiPage/list/PropertiesList';

const StyledTable = styled('table')(
  ({ theme }) => ({
    '& .table-headers': {
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: 'left',
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(14),
    },
    '& tr': {
      scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      '&:hover': {
        backgroundColor: alpha(darkTheme.palette.grey[50], 0.5),
      },
    },
    '& .type-column': {
      minWidth: '20%',
    },
    '& .default-column': {
      minWidth: '20%',
    },
    '& .MuiApi-table-item-title': {
      minWidth: '20%',
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .MuiApi-table-item-type': {
      padding: '0 4px',
      borderRadius: 5,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.5),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
    },
    '& .MuiApi-table-item-default': {
      padding: '0 4px',
      borderRadius: 5,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
    },
    '& .MuiPropTable-description-column': {
      width: '40%',
      paddingRight: 8,
      '& .prop-list-description': {
        marginBottom: 0,
      },
      '& .prop-list-additional-description': {
        marginTop: 12,
        marginBottom: 0,
      },
      '& .refAlert': {
        padding: '2px 12px',
        marginTop: 12,
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
        backgroundColor: alpha(lightTheme.palette.warning[50], 0.5),
        borderColor: `var(--muidocs-palette-warning-200, ${lightTheme.palette.warning[200]})`,
        '& strong': {
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
        },
        '&>svg': {
          fill: `var(--muidocs-palette-warning-600, ${lightTheme.palette.warning[600]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
          textDecorationColor: alpha(lightTheme.palette.warning.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
    },
    '& .prop-list-signature': {
      marginTop: 12,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      '& .prop-list-title': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& tr': {
        '&:hover': {
          backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.5),
        },
      },
      '& .MuiApi-table-item-title': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .MuiApi-table-item-type': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.5),
      },
      '& .MuiApi-table-item-default': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        backgroundColor: `var(--muidocs-palette-grey-900, ${darkTheme.palette.grey[900]})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& .prop-list-signature': {
        '& .prop-list-title': {
          color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        },
      },
      '& .MuiPropTable-description-column': {
        '& .refAlert': {
          color: `var(--muidocs-palette-warning-50, ${darkTheme.palette.warning[50]})`,
          backgroundColor: alpha(darkTheme.palette.warning[700], 0.15),
          borderColor: alpha(darkTheme.palette.warning[600], 0.3),
          '& strong': {
            color: `var(--muidocs-palette-warning-200, ${darkTheme.palette.warning[200]})`,
          },
          '&>svg': {
            fill: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
          },
          '& a': {
            color: `var(--muidocs-palette-warning-100, ${darkTheme.palette.warning[100]})`,
          },
        },
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

interface PropertiesTableProps {
  properties: PropDescriptionParams[];
}

export default function PropertiesTable(props: PropertiesTableProps) {
  const { properties } = props;
  const t = useTranslate();
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className="table-headers">Name</th>
          <th className="table-headers">Type</th>
          <th className="table-headers">Default</th>
          <th className="table-headers">Description</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((params) => {
          const {
            targetName,
            propName,
            description,
            requiresRef,
            isOptional,
            isRequired,
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
          } = params;

          return (
            <tr
              key={propName}
              id={getHash({ targetName, propName, hooksParameters, hooksReturnValue })}
            >
              <td className="MuiApi-table-item-title">
                {propName}
                {isRequired ? '*' : ''}
                {isOptional ? '?' : ''}
              </td>
              <td className="type-column">
                {
                  <span
                    className="MuiApi-table-item-type"
                    dangerouslySetInnerHTML={{
                      __html: typeName,
                    }}
                  />
                }
              </td>
              <td className="default-column">
                <span className="MuiApi-table-item-default">{propDefault}</span>
              </td>
              <td className="MuiPropTable-description-column">
                {description && <PropDescription description={description} />}
                {requiresRef && (
                  <Alert
                    className="refAlert"
                    severity="warning"
                    icon={<WarningRoundedIcon fontSize="small" />}
                    sx={{
                      alignItems: 'center',
                      '& .MuiAlert-icon': {
                        height: 'fit-content',
                        p: 0,
                        mr: 1,
                        mb: 0.3,
                      },
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
                    className="prop-list-additional-description"
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
                {signature && (
                  <div className="prop-list-signature">
                    <span className="prop-list-title">{t('api-docs.signature')}:</span>

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
                              className="prop-signature-list"
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
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
