/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';

import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiItem';

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
};

export default function CSSList(props: CSSListProps) {
  const { componentStyles, classDescriptions } = props;
  // const t = useTranslate();

  return (
    <React.Fragment>
      {/* <li className="MuiApi-item-title">
        <span>Prop</span> this is a class
        <span className="MuiApi-item-note">Required</span>
      </li>
      <table>
        <thead>
          <tr>
            <th align="left">{t('api-docs.ruleName')}</th>
            <th align="left">{t('api-docs.globalClass')}</th>
            <th align="left">{t('api-docs.description')}</th>
          </tr>
        </thead>
        <tbody> */}
      {componentStyles.classes.map((className) => {
        const isGlobalStateClass = !!componentStyles.globalClasses[className];
        return (
          <ApiItem
            id={`classes-${className}`}
            key={className}
            description={`${className}${isGlobalStateClass ? ' (State)' : ''}`}
            title={`.${
              componentStyles.globalClasses[className] || `${componentStyles.name}-${className}`
            }`}
            note="Required"
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
          </ApiItem>
          //   <tr key={className}>
          //     <td align="left">
          //       <span className="prop-name">
          //         {isGlobalStateClass ? (
          //           <React.Fragment>
          //             {className}
          //             <Chip size="small" label={t('api-docs.state')} sx={sxChip('primary')} />
          //           </React.Fragment>
          //         ) : (
          //           className
          //         )}
          //       </span>
          //     </td>
          //     <td align="left">
          //       <span className="prop-name">
          //         .
          //         {componentStyles.globalClasses[className] ||
          //           `${componentStyles.name}-${className}`}
          //       </span>
          //     </td>
          //     <td
          //       align="left"
          //       dangerouslySetInnerHTML={{
          //         __html:
          //           classDescriptions[className] &&
          //           classDescriptions[className].description
          //             .replace(
          //               /{{conditions}}/,
          //               classDescriptions[className].conditions ?? '{{conditions}}',
          //             )
          //             .replace(
          //               /{{nodeName}}/,
          //               classDescriptions[className].nodeName ?? '{{nodeName}}',
          //             ),
          //       }}
          //     />
          //   </tr>
        );
      })}
      {/* </tbody>
      </table> */}
    </React.Fragment>
  );
}

CSSList.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentStyles: PropTypes.object.isRequired,
};
