import { expectType } from '@mui/types';
import deepmerge from './deepmerge';

const a = { foo: 1 };

const value = deepmerge(a, { bar: 1 });

value.bar;
value.foo;

const value1 = deepmerge(a, a);

expectType<{ foo: number }, typeof value1>(value1);
expectType<{ foo: number; bar: number }, typeof value>(value);

const element1 = document.createElement('div');
const element2 = document.createElement('div');

const elementi = deepmerge(element1, element2);
const elementii = deepmerge({ element: element1 }, { elements: element2 });

type Same = typeof elementii extends { elements: HTMLDivElement; element: HTMLDivElement }
  ? true
  : false;

expectType<Same, true>(true);
expectType<HTMLDivElement, typeof elementi>(elementi);

const style = { foo: { color: 'red' } };
const style1 = { foo: { fontSize: 13 } };

const result = deepmerge(
  {
    '&.Mui-disabled': {
      color: 'red',
    },
  },
  {
    '&.Mui-disabled': undefined,
  },
);

const sx = deepmerge(style, style1);

expectType<{ foo: { color: string; fontSize: number } }, typeof sx>(sx);

expectType<{ '&.Mui-disabled': undefined }, typeof result>(result);
