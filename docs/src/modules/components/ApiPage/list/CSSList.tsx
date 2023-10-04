/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpendableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/ExpendableApiItem';

const StyledApiItem = styled(ExpendableApiItem)({
  '& p': {
    margin: 0,
  },
});

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
              <p className="prop-list-default-props">
                <span className="prop-list-title">{'className'}:</span>
                <code className="Api-code">{className}</code>
              </p>
            )}
          </StyledApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
