/* eslint-disable react/no-danger */
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiItem';

const StyledApiItem = styled(ApiItem)(
  ({ theme }) => ({
    '.slot-classname': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
      code: {
        ...theme.typography.caption,
        fontFamily: theme.typography.fontFamilyCode,
        fontWeight: theme.typography.fontWeightRegular,
        padding: '1px 4px',
        border: '1px solid',
        borderColor: alpha(darkTheme.palette.primary[100], 0.5),
        backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      },
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
        code: {
          borderColor: alpha(darkTheme.palette.primary[800], 0.4),
          backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
        },
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
            description={defaultValue}
            title={name}
            note=""
            type="slots"
          >
            {className && (
              <p className="slot-classname">
                <span>{t('api-docs.globalClass')}:</span>{' '}
                <code dangerouslySetInnerHTML={{ __html: className }} />
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
