import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import type { ProjectSettings } from '../ProjectSettings';
import { createTypeScriptProject } from './createTypeScriptProject';
import parseSlotsAndClasses, { getSlotDefaultError } from './parseSlotsAndClasses';

const projectSettings: ProjectSettings = {
  output: { apiManifestPath: '' },
  typeScriptProjects: [],
  getApiPages: () => [],
  getComponentInfo: () => {
    throw new Error('Component lookup is not used when parsing slots and classes.');
  },
  translationLanguages: [],
  skipComponent: () => false,
  translationPagesDirectory: '',
  generateClassName: (name, slot) => (slot === 'disabled' ? 'Mui-disabled' : `${name}-${slot}`),
  isGlobalClassName: (slot) => slot === 'disabled',
};

describe('parseSlotsAndClasses', () => {
  let directory: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-slots-and-classes-'));
    fs.writeFileSync(
      path.join(directory, 'tsconfig.build.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          jsx: 'react',
          module: 'esnext',
          moduleResolution: 'bundler',
          types: [],
          paths: {
            react: [
              path.resolve(import.meta.dirname, '../../../../node_modules/@types/react/index.d.ts'),
            ],
          },
        },
      }),
    );
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true });
  });

  it('marks classes that the theme styleOverrides do not accept', () => {
    fs.writeFileSync(
      path.join(directory, 'index.tsx'),
      `import * as React from 'react';
      interface ItemClasses { root: string; highlighted: string; disabled: string; }
      interface ParentClasses { root: string; paper: string; }
      export interface ComponentNameToClassKey {
        MuiItem: Exclude<keyof ItemClasses, 'highlighted'>;
        MuiParent: keyof ParentClasses;
      }
      export interface Components {
        MuiItem?: { styleOverrides?: object };
        MuiParent?: { styleOverrides?: object };
        MuiTrigger?: { defaultProps?: object };
        MuiChild?: { defaultProps?: object };
      }
      interface ItemProps { classes?: Partial<ItemClasses>; }
      interface TriggerProps { classes?: Partial<{ root: string; disabled: string }>; }
      interface ChildProps { classes?: Partial<ParentClasses>; }
      interface PlainProps { classes?: Partial<{ root: string }>; }
      export const Item = React.forwardRef<HTMLDivElement, ItemProps>(() => null);
      export const Trigger = React.forwardRef<HTMLDivElement, TriggerProps>(() => null);
      export const Child = React.forwardRef<HTMLDivElement, ChildProps>(() => null);
      export const Plain = React.forwardRef<HTMLDivElement, PlainProps>(() => null);`,
    );
    const typescriptProject = createTypeScriptProject({
      name: 'fixture',
      rootPath: directory,
      entryPointPath: 'index.tsx',
    });
    const settings: ProjectSettings = {
      ...projectSettings,
      // `Child` documents the inherited `MuiParent` classes.
      generateClassName: (name, slot) =>
        projectSettings.generateClassName(name === 'MuiChild' ? 'MuiParent' : name, slot),
    };
    const parse = (componentName: string) =>
      Object.fromEntries(
        parseSlotsAndClasses({
          typescriptProject,
          projectSettings: settings,
          componentName,
          muiName: `Mui${componentName}`,
        }).classes.map((definition) => [definition.key, definition.isStyleOverridesKey]),
      );

    expect(parse('Item')).to.deep.equal({
      root: undefined,
      highlighted: false,
      disabled: undefined,
    });
    expect(parse('Trigger')).to.deep.equal({ root: false, disabled: undefined });
    expect(parse('Child')).to.deep.equal({ root: undefined, paper: undefined });
    expect(parse('Plain')).to.deep.equal({ root: undefined });
  });
});

const location = 'the `ThingSlots` interface';

describe('getSlotDefaultError', () => {
  it('accepts a component', () => {
    expect(getSlotDefaultError('Paper', location)).to.equal(null);
  });

  it('accepts a quoted HTML tag', () => {
    expect(getSlotDefaultError("'div'", location)).to.equal(null);
  });

  it('accepts null', () => {
    expect(getSlotDefaultError('null', location)).to.equal(null);
  });

  it('accepts free text', () => {
    expect(
      getSlotDefaultError('DateField or TimeField, depending on the Picker.', location),
    ).to.equal(null);
  });

  it('fails without a default', () => {
    expect(getSlotDefaultError(undefined, location)).to.match(/has no `@default`/);
    expect(getSlotDefaultError(' ', location)).to.match(/has no `@default`/);
  });

  it('fails on undefined', () => {
    expect(getSlotDefaultError('undefined', location)).to.contain('`@default null`');
  });

  it('fails on an HTML tag that is not in single quotes', () => {
    ['span', '"span"', '`span`', '<span>', '<span />'].forEach((value) => {
      expect(getSlotDefaultError(value, location)).to.contain("`@default 'span'`");
    });
  });

  it('fails on a wrapped null', () => {
    expect(getSlotDefaultError('`null`', location)).to.contain('`@default null`');
  });
});
