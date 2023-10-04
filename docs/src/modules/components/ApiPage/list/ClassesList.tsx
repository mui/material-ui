/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpendableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/list/ExpendableApiItem';

export type ClassesFormatedParams = {
  className: string;
  isGlobalStateClass: boolean;
  cssClassName: string;
  description?: string;
  componentName: string;
};

type ClassesListProps = {
  classes: ClassesFormatedParams[];
  displayOption: 'collapsed' | 'expended';
};
type HashParams = { componentName?: string; className: string };

export const getHash = ({ componentName, className }: HashParams) =>
  `${componentName ? `${componentName}-` : ''}classes-${className}`;

export default function ClassesList(props: ClassesListProps) {
  const { classes, displayOption } = props;

  const t = useTranslate();

  return (
    <ApiItemContaier>
      {classes.map((params) => {
        const { className, isGlobalStateClass, cssClassName, description, componentName } = params;

        return (
          <ExpendableApiItem
            id={getHash({ componentName, className })}
            key={className}
            note={isGlobalStateClass ? t('api-docs.state') : ''}
            title={cssClassName}
            type="classes"
            displayOption={displayOption}
            isExtendable={!!description}
          >
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
          </ExpendableApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
