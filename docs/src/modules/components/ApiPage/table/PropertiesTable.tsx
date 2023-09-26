/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import Alert from '@mui/material/Alert';
import { PropDescriptionParams } from '../list/PropertiesList';

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

interface PropertiesTableProps {
  properties: PropDescriptionParams[];
}

export default function PropertiesTable(props: PropertiesTableProps) {
  const { properties } = props;
  const t = useTranslate();
  return (
    <table>
      <thead>
        <tr>
          <th align="left">Name</th>
          <th align="left">Type</th>
          <th align="left">Default</th>
          <th align="left">Description</th>
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
            deprecationInfo,
            typeName,
            propDefault,
            additionalInfo,
            signature,
            signatureArgs,
            signatureReturnDescription,
          } = params;

          return (
            <tr key={propName} id={getHash({ componentName, propName })}>
              <td>
                {propName}
                {isRequired ? '*' : ''}
                {isOptional ? '?' : ''}
              </td>
              <td>
                {
                  <span
                    dangerouslySetInnerHTML={{
                      __html: typeName,
                    }}
                  />
                }
              </td>
              <td>{propDefault}</td>
              <td>
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
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
