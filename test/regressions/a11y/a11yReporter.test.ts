import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TestModule, Vitest } from 'vitest/node';
import A11yReporter from './a11yReporter';
import type { A11yMeta } from './axe';

interface TestEntry {
  fullName: string;
  a11y?: A11yMeta;
  a11yKept?: Pick<A11yMeta, 'slug' | 'demo'>;
}

function testModule(entries: TestEntry[]): TestModule {
  return {
    children: entries.map(({ fullName, ...meta }) => ({
      type: 'test',
      fullName,
      meta: () => meta,
    })),
  } as unknown as TestModule;
}

describe('A11yReporter', () => {
  let componentsDir: string;
  const rules: A11yMeta['rules'] = {
    'button-name': { status: 'pass', tags: ['wcag2a'] },
  };
  const accordionResults = {
    AccordionUsage: { rules },
    ControlledAccordions: { rules },
  };
  const keptAccordion: TestEntry = {
    fullName:
      'visual regressions > routes > runs a11y on /docs-components-accordion/AccordionUsage',
    a11yKept: { slug: 'accordion', demo: 'AccordionUsage' },
  };

  function resultsFile(slug: string) {
    return path.join(componentsDir, slug, `${slug}.a11y.json`);
  }

  function runReporter(entries: TestEntry[], testNamePattern?: RegExp) {
    const reporter = new A11yReporter(componentsDir);
    reporter.onInit({ config: { testNamePattern } } as Vitest);
    reporter.onTestRunEnd([testModule(entries)], [], 'passed');
  }

  beforeEach(() => {
    componentsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-a11y-reporter-'));
    for (const slug of ['accordion', 'buttons']) {
      fs.mkdirSync(path.join(componentsDir, slug));
    }
    fs.writeFileSync(resultsFile('accordion'), JSON.stringify(accordionResults));
    fs.writeFileSync(resultsFile('buttons'), '{}');
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(componentsDir, { recursive: true, force: true });
  });

  it('leaves unrelated slugs untouched when skipped metadata is outside the filter', () => {
    const original = fs.readFileSync(resultsFile('accordion'), 'utf8');
    runReporter(
      [
        {
          fullName:
            'visual regressions > routes > runs a11y on /docs-components-buttons/BasicButtons',
          a11y: { slug: 'buttons', demo: 'BasicButtons', rules },
        },
        keptAccordion,
      ],
      /\/docs-components-buttons\//,
    );

    expect(fs.readFileSync(resultsFile('accordion'), 'utf8')).to.equal(original);
    expect(JSON.parse(fs.readFileSync(resultsFile('buttons'), 'utf8'))).to.deep.equal({
      BasicButtons: { rules },
    });
  });

  it('leaves committed results untouched when no tests match the filter', () => {
    const original = fs.readFileSync(resultsFile('accordion'), 'utf8');
    runReporter([keptAccordion], /does not match/);

    expect(fs.readFileSync(resultsFile('accordion'), 'utf8')).to.equal(original);
    expect(fs.readFileSync(resultsFile('buttons'), 'utf8')).to.equal('{}');
  });

  it.each([undefined, /^visual regressions > routes > .*\/docs-components-accordion\//])(
    'merges preserved results with current results when the full name matches %s',
    (testNamePattern) => {
      const updatedRules: A11yMeta['rules'] = {
        'button-name': { status: 'incomplete', tags: ['wcag2a'] },
      };
      runReporter(
        [
          keptAccordion,
          {
            fullName:
              'visual regressions > routes > runs a11y on /docs-components-accordion/ControlledAccordions',
            a11y: { slug: 'accordion', demo: 'ControlledAccordions', rules: updatedRules },
          },
        ],
        testNamePattern,
      );

      expect(JSON.parse(fs.readFileSync(resultsFile('accordion'), 'utf8'))).to.deep.equal({
        AccordionUsage: { rules },
        ControlledAccordions: { rules: updatedRules },
      });
    },
  );
});
