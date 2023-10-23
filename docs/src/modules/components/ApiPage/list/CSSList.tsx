/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpendableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/list/ExpendableApiItem';
import { brandingDarkTheme as darkTheme } from 'docs/src/modules/brandingTheme';

const StyledApiItem = styled(ExpendableApiItem)(
  ({ theme }) => ({
    '& p': {
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
    '& .prop-list-class': {
      margin: 0,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .prop-list-title': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
      },
    },
  }),
);

type HashParams = { componentName?: string; className: string };

export type CSSFormatedParams = {
  componentName?: string;
  className: string;
  isGlobalStateClass: boolean;
  selector: string;
  description?: string;
};

export const getHash = ({ componentName, className }: HashParams) =>
  `${componentName ? `${componentName}-` : ''}css-${className}`;

interface CSSListProps {
  classes: CSSFormatedParams[];
  displayOption: 'collapsed' | 'expended';
}
export default function CSSList(props: CSSListProps) {
  const { classes, displayOption } = props;
  const t = useTranslate();

  return (
    <ApiItemContaier>
      {classes.map((params) => {
        const { componentName, className, isGlobalStateClass, selector, description } = params;

        return (
          <StyledApiItem
            key={className}
            id={getHash({ componentName, className })}
            title={selector}
            note={isGlobalStateClass ? t('api-docs.state') : ''}
            type="CSS"
            displayOption={displayOption}
          >
            {description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
            {className && (
              <p className="prop-list-class">
                <span className="prop-list-title">{'Rule name'}:</span>
                <code className="Api-code">{className}</code>
              </p>
            )}
          </StyledApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
