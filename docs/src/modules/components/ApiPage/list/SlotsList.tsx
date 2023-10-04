/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { brandingDarkTheme as darkTheme } from 'docs/src/modules/brandingTheme';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpendableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/ExpendableApiItem';

const StyledApiItem = styled(ExpendableApiItem)(
  ({ theme }) => ({
    '.slot-classname, .slot-default-element': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
      marginBottom: 8,
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

export type SlotsFormatedParams = {
  className: string;
  componentName?: string;
  description?: string;
  name: string;
  defaultValue?: string;
};

type HashParams = { componentName?: string; className: string };

export const getHash = ({ componentName, className }: HashParams) =>
  `${componentName ? `${componentName}-` : ''}css-${className}`;

interface SlotsListProps {
  slots: SlotsFormatedParams[];
  displayOption: 'collapsed' | 'expended';
}

export default function SlotsList(props: SlotsListProps) {
  const { slots, displayOption } = props;
  const t = useTranslate();

  return (
    <ApiItemContaier className="MuiApi-slot-list">
      {slots.map((params) => {
        const { description, className, name, defaultValue, componentName } = params;

        const isExtendable = description || defaultValue || className;

        return (
          <StyledApiItem
            id={getHash({ componentName, className })}
            key={className}
            title={name}
            note=""
            type="slots"
            isExtendable={!!isExtendable}
            displayOption={displayOption}
          >
            {description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
            {defaultValue && (
              <p className="slot-default-element">
                <span>{t('api-docs.default')}:</span>{' '}
                <code className="Api-code">{defaultValue}</code>
              </p>
            )}
            {className && (
              <p className="slot-classname MuiApi-collapsible">
                <span>{t('api-docs.globalClass')}:</span>{' '}
                <code dangerouslySetInnerHTML={{ __html: className }} className="Api-code" />
              </p>
            )}
          </StyledApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
