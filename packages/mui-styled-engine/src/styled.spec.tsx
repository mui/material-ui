import * as React from 'react';
import { CreateMUIStyled } from '@mui/styled-engine';

declare const styled: CreateMUIStyled<{}, {}, {}>;

interface RequiredButtonProps {
  label: string;
  color?: 'primary';
}

const RequiredButton = React.forwardRef<HTMLButtonElement, RequiredButtonProps>(
  function RequiredButton(props, ref) {
    return (
      <button type="button" ref={ref}>
        {props.label}
      </button>
    );
  },
);

const StringFilteredButton = styled(RequiredButton, {
  shouldForwardProp: (prop): prop is string => typeof prop === 'string',
})({});

<StringFilteredButton label="valid" color="primary" ref={React.createRef<HTMLButtonElement>()} />;

// @ts-expect-error a broad predicate must preserve required props
<StringFilteredButton />;

// @ts-expect-error a broad predicate must preserve prop types
<StringFilteredButton label={123} />;

// @ts-expect-error a broad predicate must preserve the ref type
<StringFilteredButton label="valid" ref={React.createRef<HTMLDivElement>()} />;

// @ts-expect-error a broad predicate must not introduce unknown props
<StringFilteredButton label="valid" localOnly />;

const PropertyKeyFilteredButton = styled(RequiredButton, {
  shouldForwardProp: (prop): prop is PropertyKey => typeof prop !== 'symbol',
})({});

<PropertyKeyFilteredButton
  label="valid"
  color="primary"
  ref={React.createRef<HTMLButtonElement>()}
/>;

// @ts-expect-error a PropertyKey predicate must preserve required props
<PropertyKeyFilteredButton />;

// @ts-expect-error a PropertyKey predicate must preserve prop types
<PropertyKeyFilteredButton label={123} />;

// @ts-expect-error a PropertyKey predicate must preserve the ref type
<PropertyKeyFilteredButton label="valid" ref={React.createRef<HTMLDivElement>()} />;

const LiteralFilteredButton = styled(RequiredButton, {
  shouldForwardProp: (prop): prop is 'label' | 'ref' | 'localOnly' => prop !== 'color',
})<{ color?: 'danger'; localOnly?: boolean }>({});

<LiteralFilteredButton
  label="valid"
  color="danger"
  localOnly
  ref={React.createRef<HTMLButtonElement>()}
/>;

// @ts-expect-error a literal predicate must preserve required forwarded props
<LiteralFilteredButton color="danger" />;

// @ts-expect-error a literal predicate must preserve additional prop types
<LiteralFilteredButton label="valid" localOnly="yes" />;

interface IndexedProps {
  label: string;
  [key: string]: unknown;
}

function IndexedComponent(props: IndexedProps) {
  return <span>{props.label}</span>;
}

const StringFilteredIndexed = styled(IndexedComponent, {
  shouldForwardProp: (prop): prop is string => typeof prop === 'string',
})({});

<StringFilteredIndexed label="valid" extra="value" />;

// @ts-expect-error a string predicate must preserve required indexed props
<StringFilteredIndexed />;

// @ts-expect-error an indexed component must preserve known prop types
<StringFilteredIndexed label={123} />;

const PropertyKeyFilteredIndexed = styled(IndexedComponent, {
  shouldForwardProp: (prop): prop is PropertyKey => typeof prop !== 'symbol',
})({});

<PropertyKeyFilteredIndexed label="valid" extra="value" />;

// @ts-expect-error a PropertyKey predicate must preserve required indexed props
<PropertyKeyFilteredIndexed />;

// @ts-expect-error an indexed component must preserve known prop types
<PropertyKeyFilteredIndexed label={123} />;

interface NumberAndSymbolIndexedProps {
  label: string;
  [key: number]: string;
  [key: symbol]: boolean;
}

function NumberAndSymbolIndexedComponent(props: NumberAndSymbolIndexedProps) {
  return <span>{props.label}</span>;
}

const PropertyKeyFilteredNumberAndSymbolIndexed = styled(NumberAndSymbolIndexedComponent, {
  shouldForwardProp: (prop): prop is PropertyKey => typeof prop !== 'symbol',
})({});

<PropertyKeyFilteredNumberAndSymbolIndexed
  label="valid"
  {...{ 0: 'value', [Symbol.iterator]: true }}
/>;

// @ts-expect-error a PropertyKey predicate must preserve required indexed props
<PropertyKeyFilteredNumberAndSymbolIndexed />;

// @ts-expect-error a PropertyKey predicate must preserve number index types
<PropertyKeyFilteredNumberAndSymbolIndexed label="valid" {...{ 0: 123 }} />;

// @ts-expect-error a PropertyKey predicate must preserve symbol index types
<PropertyKeyFilteredNumberAndSymbolIndexed label="valid" {...{ [Symbol.iterator]: 'invalid' }} />;

function DictionaryComponent(props: Record<string, unknown>) {
  return <span>{String(props.extra)}</span>;
}

const LiteralFilteredDictionary = styled(DictionaryComponent, {
  shouldForwardProp: (prop): prop is 'extra' => prop === 'extra',
})({});

<LiteralFilteredDictionary extra="value" />;

// @ts-expect-error a literal predicate must not forward other indexed keys
<LiteralFilteredDictionary extra="value" other="value" />;

const LiteralFilteredIndexed = styled(IndexedComponent, {
  shouldForwardProp: (prop): prop is 'label' | 'extra' => prop === 'label' || prop === 'extra',
})({});

<LiteralFilteredIndexed label="valid" extra="value" />;

// @ts-expect-error a literal predicate must preserve required known props
<LiteralFilteredIndexed extra="value" />;

// @ts-expect-error a literal predicate must preserve known prop types
<LiteralFilteredIndexed label={123} extra="value" />;

const LiteralFilteredNumberIndexed = styled(NumberAndSymbolIndexedComponent, {
  shouldForwardProp: (prop): prop is 'label' | 0 => prop === 'label' || prop === 0,
})({});

<LiteralFilteredNumberIndexed label="valid" {...{ 0: 'value' }} />;

// @ts-expect-error a literal predicate must preserve number index types
<LiteralFilteredNumberIndexed label="valid" {...{ 0: 123 }} />;
