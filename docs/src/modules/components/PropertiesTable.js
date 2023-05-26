/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiPage/ApiItem';

const Wrapper = styled('div')({
  // overflow: 'hidden',
});

export default function PropertiesTable(props) {
  const { properties, propertiesDescriptions, showOptionalAbbr = false } = props;
  const t = useTranslate();

  return (
    <Wrapper>
      {Object.entries(properties)
        .filter(([, propData]) => propData.description !== '@ignore')
        .map(([propName, propData]) => {
          // ApiItem
          const typeName = propData.type.description || propData.type.name;
          const propDefault = propData.default;
          return (
            <ApiItem
              key={propName}
              id={`prop-${propName}`}
              title={propName}
              description={typeName}
              note={
                (propData.required && !showOptionalAbbr && 'Required') ||
                (!propData.required && showOptionalAbbr && 'Optional')
              }
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: propertiesDescriptions[propName] || '',
                }}
              />
              {propDefault && (
                <p>
                  {t('api-docs.default')}: <code>{propDefault}</code>
                </p>
              )}
              {propData.deprecated && (
                <Alert severity="warning" sx={{ mb: 1, py: 0 }}>
                  <strong>{t('api-docs.deprecated')}</strong>
                  {propData.deprecationInfo && ' - '}
                  {propData.deprecationInfo && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: propData.deprecationInfo,
                      }}
                    />
                  )}
                </Alert>
              )}
            </ApiItem>
          );
          // <tr key={propName}>
          //   <td align="left">
          //     <span
          //       className={clsx('prop-name', {
          //         required: propData.required && !showOptionalAbbr,
          //         optional: !propData.required && showOptionalAbbr,
          //       })}
          //     >
          //       {propName}
          //       {propData.required && !showOptionalAbbr && (
          //         <sup>
          //           <Asterisk title="required">*</Asterisk>
          //         </sup>
          //       )}
          //       {!propData.required && showOptionalAbbr && (
          //         <sup>
          //           <abbr title="optional">?</abbr>
          //         </sup>
          //       )}
          //     </span>
          //   </td>
          //   <td align="left">
          //     <span className="prop-type" dangerouslySetInnerHTML={{ __html: typeName }} />
          //   </td>
          //   {showDefaultPropColumn && (
          //     <td align="left">
          //       {propDefault && <span className="prop-default">{propDefault}</span>}
          //     </td>
          //   )}
          //   <td align="left">

          //     <div
          //       dangerouslySetInnerHTML={{
          //         __html: propertiesDescriptions[propName] || '',
          //       }}
          //     />
          //   </td>
          // </tr>
          // );
        })}
      {/* </tbody>
      </Table> */}
    </Wrapper>
  );
}

PropertiesTable.propTypes = {
  properties: PropTypes.object.isRequired,
  propertiesDescriptions: PropTypes.object.isRequired,
  showOptionalAbbr: PropTypes.bool,
};
