/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import Box from '@mui/material/Box';
import ToggleDisplayOption, {
  API_LAYOUT_STORAGE_KEYS,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import CSSList, { getHash } from 'docs/src/modules/components/ApiPage/list/CSSList';
import CSSTable from 'docs/src/modules/components/ApiPage/table/CSSTable';

type ComponentStyles = {
  classes: string[];
  globalClasses: { [classeKey: string]: string };
  name: null | string;
};
type ClassDescription = {
  [classeKey: string]: {
    description: string;
    nodeName?: string;
    conditions?: string;
  };
};

export type GetCssToCParams = {
  componentName: string;
  componentStyles: ComponentStyles;
  t: (key: any, options?: {}) => any;
  hash?: string;
};

export const getCssToC = ({ componentName, componentStyles, t, hash }: GetCssToCParams) =>
  componentStyles.classes.length === 0
    ? []
    : [
        {
          text: t('api-docs.css'),
          hash: hash ?? 'css',
          children: [
            ...componentStyles.classes.map((className) => ({
              text: className,
              hash: getHash({ componentName, className }),
              children: [],
            })),
          ],
        },
      ];

export type CSSSectionProps = {
  componentStyles: ComponentStyles;
  classDescriptions: ClassDescription;
  componentName?: string;
  spreadHint?: string;
  title: string;
  titleHash: string;
  level?: 'h2' | 'h3' | 'h4';
  styleOverridesLink: string;
};

export default function CSSSection(props: CSSSectionProps) {
  const {
    componentStyles,
    classDescriptions,
    componentName,
    spreadHint,
    styleOverridesLink,
    title = 'api-docs.css',
    titleHash = 'css',
    level: Level = 'h2',
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(API_LAYOUT_STORAGE_KEYS.css);

  if (!componentStyles?.classes || componentStyles.classes.length === 0) {
    return null;
  }

  const formatedClasses = componentStyles.classes.map((className) => {
    const isGlobalStateClass = !!componentStyles.globalClasses[className];
    const selector = `.${
      componentStyles.globalClasses[className] || `${componentStyles.name}-${className}`
    }`;
    const description =
      classDescriptions[className] &&
      classDescriptions[className].description
        .replace(/{{conditions}}/, classDescriptions[className].conditions ?? '{{conditions}}')
        .replace(/{{nodeName}}/, classDescriptions[className].nodeName ?? '{{nodeName}}');

    return {
      componentName,
      className,
      isGlobalStateClass,
      selector,
      description,
    };
  });

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
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
      </Box>

      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}

      {displayOption === 'table' ? (
        <CSSTable classes={formatedClasses} />
      ) : (
        <CSSList classes={formatedClasses} displayOption={displayOption} />
      )}
      <br />
      <p dangerouslySetInnerHTML={{ __html: t('api-docs.overrideStyles') }} />
      <span
        dangerouslySetInnerHTML={{
          __html: t('api-docs.overrideStylesStyledComponent').replace(
            /{{styleOverridesLink}}/,
            styleOverridesLink,
          ),
        }}
      />
    </React.Fragment>
  );
}
