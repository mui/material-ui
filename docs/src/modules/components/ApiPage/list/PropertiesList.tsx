/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import kebabCase from 'lodash/kebabCase';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import ExpandableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/list/ExpandableApiItem';

const StyledApiItem = styled(ExpandableApiItem)(
  ({ theme }) => ({
    '& .prop-list-description': {
      marginBottom: 10,
    },
    '& .prop-list-additional-info': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      '& > p': {
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
      '& .default-value': {
        fontSize: theme.typography.pxToRem(12),
      },
    },
    '& .prop-list-deprecated': {
      '& code': { all: 'unset' },
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
      '& > code': {
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

function PropDescription(props: { description: string }) {
  const { description } = props;
  const isUlPresent = description.includes('<ul>');

  const ComponentToRender = isUlPresent ? 'div' : 'p';

  return (
    <ComponentToRender
      className="prop-list-description algolia-content" // This className is used by Algolia
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
}

export function getHash({
  componentName,
  propName,
  hooksParameters,
  hooksReturnValue,
}: {
  componentName: string;
  propName: string;
  hooksParameters?: boolean;
  hooksReturnValue?: boolean;
}) {
  let sectionName = 'prop';
  if (hooksParameters) {
    sectionName = 'parameters';
  } else if (hooksReturnValue) {
    sectionName = 'return-value';
  }
  return `${kebabCase(componentName)}-${sectionName}-${propName}`;
}

export interface PropDescriptionParams {
  componentName: string;
  propName: string;
  seeMoreDescription?: string;
  description?: string;
  requiresRef?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  isDeprecated?: boolean;
  hooksParameters?: boolean;
  hooksReturnValue?: boolean;
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
  displayOption: 'collapsed' | 'expanded';
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
          seeMoreDescription,
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
          <StyledApiItem
            key={propName}
            id={getHash({ componentName, propName, hooksParameters, hooksReturnValue })}
            title={propName}
            note={(isOptional && 'Optional') || (isRequired && 'Required') || ''}
            type="props"
            displayOption={displayOption}
          >
            {description && <PropDescription description={description} />}
            {seeMoreDescription && <p dangerouslySetInnerHTML={{ __html: seeMoreDescription }} />}
            {requiresRef && (
              <Alert
                severity="warning"
                icon={<WarningRoundedIcon fontSize="small" />}
                sx={{
                  '& .MuiAlert-icon': {
                    height: 'fit-content',
                    py: '8px',
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
                className="prop-list-additional-description  MuiApi-collapsible"
                key={key}
                dangerouslySetInnerHTML={{
                  __html: t(`api-docs.additional-info.${key}`),
                }}
              />
            ))}
            {isDeprecated && (
              <Alert
                className="MuiApi-collapsible prop-list-deprecated"
                severity="warning"
                icon={<WarningRoundedIcon fontSize="small" />}
                sx={{
                  '& .MuiAlert-icon': {
                    height: 'fit-content',
                    py: '8px',
                  },
                }}
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
            <div className="prop-list-additional-info">
              {typeName && (
                <p className="prop-list-type MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.type')}:</span>
                  <code
                    className="Api-code"
                    dangerouslySetInnerHTML={{
                      __html: typeName,
                    }}
                  />
                </p>
              )}
              {propDefault && (
                <p className="prop-list-default-props MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.default')}:</span>
                  <code className="default-value">{propDefault}</code>
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
