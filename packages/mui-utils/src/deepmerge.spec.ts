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

const notTarget = deepmerge(undefined, { bar: 1 });

expectType<{}, typeof notTarget>(notTarget);

const notSource = deepmerge({ foo: 1 }, undefined);

expectType<{ foo: number }, typeof notSource>(notSource);

const anyTarget = deepmerge(false, { bar: 1 });

expectType<{}, typeof anyTarget>(anyTarget);

const anyTarget1 = deepmerge(null, { bar: 1 });

expectType<{}, typeof anyTarget1>(anyTarget1);

const anyTarget2 = deepmerge('', { bar: 1 });

expectType<{}, typeof anyTarget2>(anyTarget2);

const anyTarget3 = deepmerge(1, { bar: 1 });

expectType<{}, typeof anyTarget3>(anyTarget3);

const anyTarget4 = deepmerge(NaN, { bar: 1 });

expectType<{}, typeof anyTarget4>(anyTarget4);

const anyTarget5 = deepmerge([], { bar: 1 });

expectType<{}, typeof anyTarget5>(anyTarget5);

const anyTarget6 = deepmerge(() => {}, { bar: 1 });

expectType<{}, typeof anyTarget6>(anyTarget6);

const anyTarget7 = deepmerge([1], { bar: 1 });

expectType<{}, typeof anyTarget7>(anyTarget7);

const anyTarget8 = deepmerge(
  () => {
    return { foo: 1 };
  },
  { bar: 1 },
);

expectType<{}, typeof anyTarget8>(anyTarget8);

const anyTarget9 = deepmerge(new Set([1, 2]), { bar: 1 });

expectType<{}, typeof anyTarget9>(anyTarget9);

const anyTarget10 = deepmerge(Symbol(''), { bar: 1 });

expectType<{}, typeof anyTarget10>(anyTarget10);

const anyTarget11 = deepmerge(new Map([['a', 1]]), { bar: 1 });

expectType<{}, typeof anyTarget11>(anyTarget11);

// any source...

const anySource = deepmerge({ bar: 1 }, false);

expectType<{ bar: number }, typeof anySource>(anySource);

const anySource1 = deepmerge({ bar: 1 }, null);

expectType<{ bar: number }, typeof anySource1>(anySource1);

const anySource2 = deepmerge({ bar: 1 }, '');

expectType<{ bar: number }, typeof anySource2>(anySource2);

const anySource3 = deepmerge({ bar: 1 }, 1);

expectType<{ bar: number }, typeof anySource3>(anySource3);

const anySource4 = deepmerge({ bar: 1 }, NaN);

expectType<{ bar: number }, typeof anySource4>(anySource4);

const anySource5 = deepmerge({ bar: 1 }, []);

expectType<{ bar: number }, typeof anySource5>(anySource5);

const anySource6 = deepmerge({ bar: 1 }, () => {});

expectType<{ bar: number }, typeof anySource6>(anySource6);

const anySource7 = deepmerge({ bar: 1 }, [1]);

expectType<{ bar: number }, typeof anySource7>(anySource7);

const anySource8 = deepmerge({ bar: 1 }, () => {
  return { foo: 2 };
});

expectType<{ bar: number }, typeof anySource8>(anySource8);

const anySource9 = deepmerge({ bar: 1 }, new Set([1, 2]));

expectType<{ bar: number }, typeof anySource9>(anySource9);

const anySource10 = deepmerge({ bar: 1 }, Symbol(''));

expectType<{ bar: number }, typeof anySource9>(anySource10);

const anySource11 = deepmerge({ bar: 1 }, new Map([['a', 1]]));

expectType<{ bar: number }, typeof anySource11>(anySource11);
