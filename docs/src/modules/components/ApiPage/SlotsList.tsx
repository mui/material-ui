/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { brandingDarkTheme as darkTheme } from 'docs/src/modules/brandingTheme';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiItem';

const StyledApiItem = styled(ApiItem)(
  ({ theme }) => ({
    '.slot-classname, .slot-default-element': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
    },
    '& .slot-description-title': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
      paddingRight: 5,
      whiteSpace: 'nowrap',
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .slot-classname': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
      },
    },
  }),
);

export type SlotsListProps = {
  componentSlots: { class: string; name: string; default: string }[];
  slotDescriptions: { [key: string]: string };
  componentName?: string;
};

export default function SlotsList(props: SlotsListProps) {
  const { componentSlots, slotDescriptions, componentName } = props;
  const t = useTranslate();

  const hashPrefix = componentName ? `${componentName}-` : '';
  return (
    <div className="MuiApi-slot-list">
      {componentSlots.map(({ class: className, name, default: defaultValue }) => {
        return (
          <StyledApiItem
            id={`${hashPrefix}slots-${className}`}
            key={className}
            description=""
            title={name}
            note=""
            type="slots"
          >
            <p className="slot-default-element">
              <span>{t('api-docs.default')}:</span> <code className="Api-code">{defaultValue}</code>
            </p>

            {className && (
              <p className="slot-classname">
                <span>{t('api-docs.globalClass')}:</span>{' '}
                <code dangerouslySetInnerHTML={{ __html: className }} className="Api-code" />
              </p>
            )}
            {slotDescriptions[name] && (
              <p>
                <span className="slot-description-title">{t('api-docs.description')}:</span>{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: slotDescriptions[name] || '',
                  }}
                />
              </p>
            )}
          </StyledApiItem>
        );
      })}
    </div>
  );
}
