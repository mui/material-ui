/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { brandingDarkTheme as darkTheme } from 'docs/src/modules/brandingTheme';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ToggleDisplayOption, {
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/ToggleDisplayOption';
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

export type SlotsListProps = {
  componentSlots: { class: string; name: string; default: string }[];
  slotDescriptions: { [key: string]: string };
  componentName?: string;
  title?: string;
  titleHash?: string;
  level?: 'h2' | 'h3' | 'h4';
  spreadHint?: string;
};

export default function SlotsList(props: SlotsListProps) {
  const {
    componentSlots,
    slotDescriptions,
    componentName,
    title = 'api-docs.slots',
    titleHash = 'slots',
    level: Level = 'h2',
    spreadHint,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption('api-page-slots');

  const hashPrefix = componentName ? `${componentName}-` : '';
  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <Level id={titleHash} style={{ flexGrow: 1 }}>
          {t(title)}
          <a
            aria-labelledby={titleHash}
            className="anchor-link"
            href={`#${titleHash}`}
            tabIndex={-1}
          >
            <svg>
              <use xlinkHref="#anchor-link-icon" />
            </svg>
          </a>
        </Level>

        <ToggleDisplayOption displayOption={displayOption} setDisplayOption={setDisplayOption} />
      </div>
      {spreadHint && (
        <p
          dangerouslySetInnerHTML={{
            __html: spreadHint,
          }}
        />
      )}
      <ApiItemContaier className="MuiApi-slot-list">
        {componentSlots.map(({ class: className, name, default: defaultValue }) => {
          const isExtendable = defaultValue || className;

          return (
            <StyledApiItem
              id={`${hashPrefix}slots-${className}`}
              key={className}
              title={name}
              note=""
              type="slots"
              isExtendable={!!isExtendable && displayOption === 'collapsed'}
            >
              {slotDescriptions[name] && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: slotDescriptions[name] || '',
                  }}
                />
              )}
              <p className="slot-default-element MuiApi-collapsible">
                <span>{t('api-docs.default')}:</span>{' '}
                <code className="Api-code">{defaultValue}</code>
              </p>
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
    </React.Fragment>
  );
}
