/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import kebabCase from 'lodash/kebabCase';
import { ComponentClassDefinition } from '@mui/internal-docs-utils';
import { useTranslate } from '@mui/docs/i18n';
import ExpandableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/list/ExpandableApiItem';
import {
  brandingLightTheme as lightTheme,
  brandingDarkTheme as darkTheme,
} from '@mui/docs/branding';
import ApiWarningAlert from 'docs/src/modules/components/ApiPage/ApiWarningAlert';

const StyledApiItem = styled(ExpandableApiItem)(
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
    '&.classes-list-deprecated-item': {
      '& .MuiApi-item-note': {
        color: `var(--muidocs-palette-warning-700, ${lightTheme.palette.warning[700]})`,
      },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .prop-list-title': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
      },
      '&.classes-list-deprecated-item': {
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
        },
      },
    },
  }),
);

type HashParams = { componentName: string; className: string };

export function getHash({ componentName, className }: HashParams) {
  return `${kebabCase(componentName)}-classes-${className}`;
}

type ClassesListProps = {
  componentName: string;
  classes: ComponentClassDefinition[];
  displayOption: 'collapsed' | 'expanded';
  displayClassKeys?: boolean;
};

export default function ClassesList(props: ClassesListProps) {
  const { classes, displayOption, componentName, displayClassKeys } = props;
  const t = useTranslate();

  return (
    <ApiItemContaier>
      {classes.map((classDefinition) => {
        const { className, key, description, isGlobal, isDeprecated, deprecationInfo } =
          classDefinition;

        let note = isGlobal ? t('api-docs.state') : '';

        if (isDeprecated) {
          note = [note, t('api-docs.deprecated')].filter(Boolean).join(' - ');
        }

        return (
          <StyledApiItem
            id={getHash({ componentName, className: key })}
            key={key}
            note={note}
            title={`.${className}`}
            type="classes"
            displayOption={displayOption}
            isExtendable={!!description}
            className={isDeprecated ? 'classes-list-deprecated-item' : ''}
          >
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
            {displayClassKeys && !isGlobal && (
              <p className="prop-list-class">
                <span className="prop-list-title">{'Rule name'}:</span>
                <code className="Api-code">{key}</code>
              </p>
            )}
            {isDeprecated && (
              <ApiWarningAlert>
                <b>{t('api-docs.deprecated')}</b>
                {deprecationInfo && (
                  <React.Fragment>
                    {'－'}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: deprecationInfo,
                      }}
                    />
                  </React.Fragment>
                )}
              </ApiWarningAlert>
            )}
          </StyledApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
