/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Alert from '@mui/material/Alert';
import { alpha, styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Asterisk = styled('abbr')(({ theme }) => ({ color: theme.palette.error.main }));

const Wrapper = styled('div')({
  overflow: 'hidden',
});
const Table = styled('table')(({ theme }) => {
  const contentColor = 'rgba(255, 255, 255, 1)';
  const contentColorDark = alpha(theme.palette.primaryDark[900], 1);
  const contentColorTransparent = 'rgba(255, 255, 255, 0)';
  const contentColorTransparentDark = alpha(theme.palette.primaryDark[900], 0);
  const shadowColor = 'rgba(0,0,0,0.2)';
  const shadowColorDark = 'rgba(0,0,0,0.7)';
  return {
    borderRadius: 10,
    background: `
  linear-gradient(to right, ${contentColor} 5%, ${contentColorTransparent}),
  linear-gradient(to right, ${contentColorTransparent}, ${contentColor} 100%) 100%,
  linear-gradient(to right, ${shadowColor}, rgba(0, 0, 0, 0) 5%),
  linear-gradient(to left, ${shadowColor}, rgba(0, 0, 0, 0) 5%)`,
    backgroundAttachment: 'local, local, scroll, scroll',
    // the above background create thin line on the left and right sides of the table
    // as a workaround, use negative margin with overflow `hidden` on the parent
    marginLeft: -1,
    marginRight: -1,
    ...theme.applyDarkStyles({
      background: `
      linear-gradient(to right, ${contentColorDark} 5%, ${contentColorTransparentDark}),
      linear-gradient(to right, ${contentColorTransparentDark}, ${contentColorDark} 100%) 100%,
      linear-gradient(to right, ${shadowColorDark}, rgba(0, 0, 0, 0) 5%),
      linear-gradient(to left, ${shadowColorDark}, rgba(0, 0, 0, 0) 5%)`,
    }),
  };
});

export default function PropertiesTable(props) {
  const { properties, propertiesDescriptions, showOptionalAbbr = false } = props;
  const t = useTranslate();

  const showDefaultPropColumn = Object.entries(properties).some(
    ([, propData]) => propData.default != null,
  );

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th align="left">{t('api-docs.name')}</th>
            <th align="left">{t('api-docs.type')}</th>
            {showDefaultPropColumn && <th align="left">{t('api-docs.default')}</th>}
            <th align="left">{t('api-docs.description')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(properties).map(([propName, propData]) => {
            const typeName = propData.type.description || propData.type.name;
            const propDefault = propData.default;
            return (
              propData.description !== '@ignore' && (
                <tr key={propName}>
                  <td align="left">
                    <span
                      className={clsx('prop-name', {
                        required: propData.required && !showOptionalAbbr,
                        optional: !propData.required && showOptionalAbbr,
                      })}
                    >
                      {propName}
                      {propData.required && !showOptionalAbbr && (
                        <sup>
                          <Asterisk title="required">*</Asterisk>
                        </sup>
                      )}
                      {!propData.required && showOptionalAbbr && (
                        <sup>
                          <abbr title="optional">?</abbr>
                        </sup>
                      )}
                    </span>
                  </td>
                  <td align="left">
                    <span className="prop-type" dangerouslySetInnerHTML={{ __html: typeName }} />
                  </td>
                  {showDefaultPropColumn && (
                    <td align="left">
                      {propDefault && <span className="prop-default">{propDefault}</span>}
                    </td>
                  )}
                  <td align="left">
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: propertiesDescriptions[propName] || '',
                      }}
                    />
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
}

PropertiesTable.propTypes = {
  properties: PropTypes.object.isRequired,
  propertiesDescriptions: PropTypes.object.isRequired,
  showOptionalAbbr: PropTypes.bool,
};
