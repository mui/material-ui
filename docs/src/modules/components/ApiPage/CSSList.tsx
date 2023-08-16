/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpendableApiItem from 'docs/src/modules/components/ApiPage/ExpendableApiItem';
import ToggleDisplayOption, {
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/ToggleDisplayOption';

export type CSSListProps = {
  componentStyles: {
    classes: string[];
    globalClasses: { [classeKey: string]: string };
    name: null | string;
  };
  classDescriptions: {
    [classeKey: string]: {
      description: string;
      nodeName?: string;
      conditions?: string;
    };
  };
  componentName?: string;
  spreadHint?: string;
  title: string;
  titleHash: string;
  level?: 'h2' | 'h3' | 'h4';
};

type HashParams = { componentName?: string; className: string };

export type GetCssToCParams = {
  componentName: string;
  componentStyles: CSSListProps['componentStyles'];
  t: (key: any, options?: {}) => any;
  hash?: string;
};

const getHash = ({ componentName, className }: HashParams) =>
  `${componentName ? `${componentName}-` : ''}css-${className}`;

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

export default function CSSList(props: CSSListProps) {
  const {
    componentStyles,
    classDescriptions,
    componentName,
    spreadHint,
    title = 'api-docs.css',
    titleHash = 'css',
    level: Level = 'h2',
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption('api-page-css');

  const isExtendable = true;

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

      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      <div className="MuiApi-css-list">
        {componentStyles.classes.map((className) => {
          const isGlobalStateClass = !!componentStyles.globalClasses[className];
          return (
            <ExpendableApiItem
              id={getHash({ componentName, className })}
              key={className}
              title={`.${
                componentStyles.globalClasses[className] || `${componentStyles.name}-${className}`
              }`}
              note={isGlobalStateClass ? t('api-docs.state') : ''}
              type="CSS"
              isExtendable={isExtendable && displayOption === 'collapsed'}
              sx={{
                '& p': {
                  margin: 0,
                  '&.MuiApi-collapsible': { marginTop: '16px' },
                },
              }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    classDescriptions[className] &&
                    classDescriptions[className].description
                      .replace(
                        /{{conditions}}/,
                        classDescriptions[className].conditions ?? '{{conditions}}',
                      )
                      .replace(
                        /{{nodeName}}/,
                        classDescriptions[className].nodeName ?? '{{nodeName}}',
                      ),
                }}
              />
              {className && (
                <p className="prop-list-default-props MuiApi-collapsible">
                  <span className="prop-list-title">{'className'}:</span>
                  <code className="Api-code">{className}</code>
                </p>
              )}
            </ExpendableApiItem>
          );
        })}
      </div>
    </React.Fragment>
  );
}

CSSList.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentStyles: PropTypes.object.isRequired,
};
