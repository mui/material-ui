/* eslint-disable react/no-danger */
import * as React from 'react';
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
import StyledTableContainer from 'docs/src/modules/components/ApiPage/table/StyledTableContainer';

const StyledTable = styled('table')(
  ({ theme }) => ({
    // Override docs/src/modules/components/MarkdownElement styles
    '&&': {
      display: 'table',
      width: '100%',
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
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.8),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
    },
    '& .MuiApi-table-item-default': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
    },
    '& .MuiPropTable-description-column': {
      width: '40%',
      paddingRight: 8,
      '& .prop-table-description': {
        marginBottom: 0,
      },
      '& .prop-table-additional-description': {
        marginTop: 12,
        marginBottom: 0,
      },
      '& .prop-table-deprecated': {
        '& code ': { all: 'unset' },
      },
      '& .prop-table-alert': {
        padding: '2px 12px',
        marginTop: 12,
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
        backgroundColor: alpha(lightTheme.palette.warning[50], 0.5),
        borderColor: `var(--muidocs-palette-warning-200, ${lightTheme.palette.warning[200]})`,
        '& .MuiAlert-icon': {
          padding: 0,
        },
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
    '& .prop-table-signature': {
      marginTop: 12,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      '& .prop-table-title': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-table-item-title': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .MuiApi-table-item-type': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.3),
      },
      '& .MuiApi-table-item-default': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        backgroundColor: `var(--muidocs-palette-grey-900, ${darkTheme.palette.grey[900]})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& .prop-table-signature': {
        '& .prop-table-title': {
          color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        },
      },
      '& .MuiPropTable-description-column': {
        '& .prop-table-alert': {
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
      className="prop-table-description" // This className is used by Algolia
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
}

interface PropertiesTableProps {
  properties: PropDescriptionParams[];
}

export default function PropertiesTable(props: PropertiesTableProps) {
  const { properties } = props;
  const t = useTranslate();
  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((params) => {
            const {
              componentName,
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
                id={getHash({ componentName, propName, hooksParameters, hooksReturnValue })}
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
                      className="prop-table-alert"
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
                      className="prop-table-additional-description"
                      key={key}
                      dangerouslySetInnerHTML={{
                        __html: t(`api-docs.additional-info.${key}`),
                      }}
                    />
                  ))}
                  {isDeprecated && (
                    <Alert
                      severity="warning"
                      className="prop-table-alert prop-table-deprecated"
                      icon={<WarningRoundedIcon fontSize="small" />}
                      sx={{ mb: 1, py: 0, alignItems: 'center' }}
                    >
                      {t('api-docs.deprecated')}
                      {deprecationInfo && (
                        <React.Fragment>
                          {' - '}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: deprecationInfo,
                            }}
                          />
                        </React.Fragment>
                      )}
                    </Alert>
                  )}
                  {signature && (
                    <div className="prop-table-signature">
                      <span className="prop-table-title">{t('api-docs.signature')}:</span>
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
    </StyledTableContainer>
  );
}
