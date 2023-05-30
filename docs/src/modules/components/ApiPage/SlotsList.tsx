/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ApiItem from './ApiItem';

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
    <div>
      {componentSlots.map(({ class: className, name, default: defaultValue }) => {
        return (
          <ApiItem
            id={`${hashPrefix}classes-${className}`}
            key={className}
            description={defaultValue}
            title={name}
            note="Required"
          >
            {className && (
              <p>
                <em>{t('api-docs.globalClass')}:</em>{' '}
                <code dangerouslySetInnerHTML={{ __html: className }} />
              </p>
            )}
            {slotDescriptions[name] && (
              <p>
                <em>{t('api-docs.description')}:</em>{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: slotDescriptions[name] || '',
                  }}
                />
              </p>
            )}
          </ApiItem>
        );
      })}
    </div>
  );
}
