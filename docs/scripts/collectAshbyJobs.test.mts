import { describe, expect, it } from 'vitest';
import {
  buildRoleMarkdown,
  collectCareersData,
  extractActiveOpenRoles,
  htmlToMarkdown,
  isActiveAshbyJob,
  matchJobs,
  parseRoleMarkdown,
  slugifyTitle,
} from './collectAshbyJobs.mts';

describe('collectAshbyJobs', () => {
  describe('htmlToMarkdown', () => {
    it('converts Ashby ProseMirror HTML to clean Markdown and inserts How to apply', () => {
      const html = [
        '<h2>Details of the role</h2>',
        '<ul style="min-height:1.5em">',
        '<li><p style="min-height:1.5em"><strong>Location:</strong> Remote.</p></li>',
        '<li><p style="min-height:1.5em"><strong>Level:</strong> <a target="_blank" href="https://example.com/level"><u>IC4 Senior</u></a>.</p></li>',
        '</ul>',
        '<p style="min-height:1.5em"></p>',
        '<h2>The products</h2>',
        '<p style="min-height:1.5em">We build Material UI, MUI X, and Base UI.</p>',
        '<p style="min-height:1.5em">Don&#39;t meet every requirement? Apply anyway!</p>',
        '<div style="min-height:1.2em">&nbsp;</div>',
      ].join('');

      const applyUrl = 'https://jobs.ashbyhq.com/MUI/1234/application?utm_source=ZNRrPGBkqO';
      const markdown = htmlToMarkdown(html, { applyUrl });

      expect(markdown).to.equal(
        [
          '## Details of the role',
          '',
          '- **Location:** Remote.',
          '- **Level:** [IC4 Senior](https://example.com/level).',
          '',
          '## The products',
          '',
          'We build Material\u00A0UI, MUI\u00A0X, and Base\u00A0UI.',
          '',
          '## How to apply',
          '',
          `[Apply now for this position 📮](${applyUrl})`,
          '',
          "Don't meet every requirement? Apply anyway!",
        ].join('\n'),
      );
    });

    it('appends How to apply when the standard footer paragraph is absent and strips empty headings and boundary hrs', () => {
      const html =
        '<p></p><hr /><h2>Overview</h2><hr /><p>Join our team.</p><hr><h2>&nbsp;</h2><h2></h2>';
      const applyUrl = 'https://jobs.ashbyhq.com/MUI/5678/application?utm_source=ZNRrPGBkqO';

      expect(htmlToMarkdown(html, { applyUrl })).to.equal(
        [
          '## Overview',
          '',
          '---',
          '',
          'Join our team.',
          '',
          '## How to apply',
          '',
          `[Apply now for this position 📮](${applyUrl})`,
        ].join('\n'),
      );
    });

    it('inserts the application link under an existing How to apply heading when missing', () => {
      const html = '<h2>Overview</h2><p>Join us.</p><h2>How to apply</h2><p>Apply below.</p>';
      const applyUrl = 'https://jobs.ashbyhq.com/MUI/5678/application?utm_source=ZNRrPGBkqO';

      expect(htmlToMarkdown(html, { applyUrl })).to.equal(
        [
          '## Overview',
          '',
          'Join us.',
          '',
          '## How to apply',
          '',
          `[Apply now for this position 📮](${applyUrl})`,
          '',
          'Apply below.',
        ].join('\n'),
      );
    });

    it('does not duplicate the application link if it is already present', () => {
      const applyUrl = 'https://jobs.ashbyhq.com/MUI/5678/application?utm_source=ZNRrPGBkqO';
      const html = `<h2>How to apply</h2><p><a href="https://jobs.ashbyhq.com/MUI/5678/application">Apply here</a></p>`;

      expect(htmlToMarkdown(html, { applyUrl })).to.equal(
        ['## How to apply', '', '[Apply here](https://jobs.ashbyhq.com/MUI/5678/application)'].join(
          '\n',
        ),
      );
    });
  });

  describe('isActiveAshbyJob', () => {
    const now = Date.parse('2026-11-26T00:00:00.000Z');

    it('accepts listed, published jobs and filters out inactive, future, or dream jobs', () => {
      expect(
        isActiveAshbyJob(
          {
            id: '4bfd5851-6252-489d-a7b1-06a704c285a7',
            isListed: true,
            publishedAt: '2026-08-25T00:19:24.371+00:00',
          },
          now,
        ),
      ).to.equal(true);

      expect(
        isActiveAshbyJob(
          {
            id: '4bfd5851-6252-489d-a7b1-06a704c285a7',
            isListed: false,
            publishedAt: '2026-08-25T00:19:24.371+00:00',
          },
          now,
        ),
      ).to.equal(false);

      expect(
        isActiveAshbyJob(
          {
            id: '4bfd5851-6252-489d-a7b1-06a704c285a7',
            isListed: true,
            publishedAt: null,
          },
          now,
        ),
      ).to.equal(false);

      expect(
        isActiveAshbyJob(
          {
            id: '4bfd5851-6252-489d-a7b1-06a704c285a7',
            isListed: true,
            publishedAt: '2026-12-01T00:00:00.000Z',
          },
          now,
        ),
      ).to.equal(false);

      expect(
        isActiveAshbyJob(
          {
            id: '4715d81f-d00f-42d4-a0d0-221f40f73e19',
            isListed: true,
            publishedAt: '2026-08-25T00:19:24.371+00:00',
          },
          now,
        ),
      ).to.equal(false);
    });
  });

  describe('extractActiveOpenRoles', () => {
    it('extracts categories and active roles with slugs from openRoles.json data', () => {
      const parsed = extractActiveOpenRoles([
        { title: 'Engineering', roles: [] },
        {
          title: 'Operations',
          roles: [
            {
              title: 'Operations Engineer',
              description: 'Help us reach operational excellence using engineering skills.',
              url: '/careers/operations-engineer/',
            },
          ],
        },
      ]);

      expect(parsed.categories).to.deep.equal(['Engineering', 'Operations']);
      expect(parsed.activeOpenRoles).to.deep.equal([
        {
          category: 'Operations',
          title: 'Operations Engineer',
          description: 'Help us reach operational excellence using engineering skills.',
          url: '/careers/operations-engineer/',
          slug: 'operations-engineer',
        },
      ]);
    });
  });

  describe('matchJobs', () => {
    it('reserves exact matches and existing page names before assigning new slugs', () => {
      const jobs = ['c', 'b', 'a'].map((id) => ({ id, title: 'Engineer' }));
      const role = { ashbyId: 'b', title: 'Engineer', slug: 'engineer' };
      const matches = matchJobs(jobs, [role], ['engineer.md', 'engineer-2.js']);
      expect(
        matches.map(({ job, matchType, suggestedSlug }) => [job.id, matchType, suggestedSlug]),
      ).to.deep.equal([
        ['a', null, 'engineer-3'],
        ['b', 'ashbyId', 'engineer'],
        ['c', null, 'engineer-4'],
      ]);
    });

    it('uses a title fallback only for an unambiguous remaining pair', () => {
      const job = { id: 'new', title: 'Engineer' };
      const role = { ashbyId: 'old', title: job.title, slug: 'previous' };
      expect(matchJobs([job], [role], ['previous.md'])[0].existing).to.equal(role);
      expect(matchJobs([job, { ...job, id: 'second' }], [role], [])[0].existing).to.equal(null);
      expect(matchJobs([job], [role, { ...role, slug: 'other' }], [])[0].existing).to.equal(null);
    });
  });

  describe('parseRoleMarkdown', () => {
    it('extracts title, description, and Ashby UUID from role Markdown', () => {
      const markdown = [
        '# Operations Engineer',
        '',
        '<p class="description">Help us reach operational excellence using engineering skills.</p>',
        '',
        '## How to apply',
        '',
        '[Apply now for this position 📮](https://jobs.ashbyhq.com/MUI/4bfd5851-6252-489d-a7b1-06a704c285a7/application?utm_source=ZNRrPGBkqO)',
      ].join('\n');

      expect(parseRoleMarkdown(markdown)).to.deep.equal({
        title: 'Operations Engineer',
        description: 'Help us reach operational excellence using engineering skills.',
        ashbyId: '4bfd5851-6252-489d-a7b1-06a704c285a7',
      });
    });
  });

  describe('slugifyTitle & buildRoleMarkdown', () => {
    it('slugifies job titles into clean kebab-case', () => {
      expect(slugifyTitle('React Engineer — MUI X Grid')).to.equal('react-engineer-mui-x-grid');
      expect(slugifyTitle('Director of Business Operations')).to.equal(
        'director-of-business-operations',
      );
    });

    it('builds complete Markdown with title, description, body, and apply link', () => {
      const generated = buildRoleMarkdown({
        title: 'Operations Engineer',
        description: 'Help us reach operational excellence.',
        descriptionHtml: '<h2>The culture</h2><p>Remote and async.</p>',
        applyUrl: 'https://jobs.ashbyhq.com/MUI/1234/application?utm_source=ZNRrPGBkqO',
      });

      expect(generated).to.equal(
        [
          '# Operations Engineer',
          '',
          '<p class="description">Help us reach operational excellence.</p>',
          '',
          '## The culture',
          '',
          'Remote and async.',
          '',
          '## How to apply',
          '',
          '[Apply now for this position 📮](https://jobs.ashbyhq.com/MUI/1234/application?utm_source=ZNRrPGBkqO)',
          '',
        ].join('\n'),
      );
    });
  });

  describe('collectCareersData', () => {
    it('reconciles active jobs and roles to deactivate without filesystem or network I/O', () => {
      const result = collectCareersData({
        now: Date.parse('2026-11-26T00:00:00.000Z'),
        jobs: [
          {
            id: '4bfd5851-6252-489d-a7b1-06a704c285a7',
            title: 'Operations Engineer',
            department: 'Operations',
            isListed: true,
            publishedAt: '2026-08-25T00:19:24.371+00:00',
            descriptionHtml: '<h2>Overview</h2><p>Join us.</p>',
          },
        ],
        openRolesData: [
          {
            title: 'Operations',
            roles: [
              {
                title: 'Closed Role',
                description: 'No longer active.',
                url: '/careers/closed-role/',
              },
            ],
          },
        ],
        entries: ['closed-role.md', 'closed-role.js'],
        existingRoleFiles: [
          {
            slug: 'closed-role',
            content: '# Closed Role\n\n<p class="description">No longer active.</p>\n',
          },
        ],
      });

      expect(result.summary).to.deep.equal({
        activeJobsCount: 1,
        matchedByIdCount: 0,
        matchedByTitleCount: 0,
        newJobsCount: 1,
        rolesToDeactivateCount: 1,
      });
      expect(result.activeJobs[0].suggestedSlug).to.equal('operations-engineer');
      expect(result.rolesToDeactivate.map((role) => role.slug)).to.deep.equal(['closed-role']);
    });
  });
});
