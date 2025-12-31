import { crawl, Issue } from '@mui/internal-code-infra/brokenLinksChecker';
import { globby } from 'globby';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { crawlSeedUrlsOnHost, getBlogSeedUrls } from '../src/index';

// Mock external dependencies to control their behavior in tests

// globby: simulate file system scans for blog pages
vi.mock('globby', () => ({
  globby: vi.fn(),
}));

// crawl: simulate the broken links check without starting a server
vi.mock('@mui/internal-code-infra/brokenLinksChecker', () => ({
  crawl: vi.fn(),
}));

describe('checkLinks', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getBlogSeedUrls', () => {
    it('produces correct seed URLs from blog pages', async () => {
      (globby as unknown as Mock).mockResolvedValue([
        'blog/index.js',
        'blog/my-post.js',
        'blog/nested/another-post/index.js',
      ]);

      const mockArgument = 'placeholder/to/execute/globby/mock';
      const result = await getBlogSeedUrls(mockArgument);

      expect(globby).toHaveBeenCalledWith('blog/**/*.js', {
        cwd: mockArgument,
      });

      expect(result).toEqual(['/blog', '/blog/my-post', '/blog/nested/another-post']);
    });
  });

  describe('crawlSeedUrlsOnHost', () => {
    it('returns crawl results unmodified', async () => {
      const issues: Issue[] = [
        {
          type: 'broken-link',
          message: '',
          link: { href: '/some/broken/link', text: null, src: null },
        },
        {
          type: 'broken-link',
          message: '',
          link: { href: '/another/broken-link', text: null, src: null },
        },
      ];

      (crawl as unknown as Mock).mockResolvedValue({ issues });

      const result = await crawlSeedUrlsOnHost({
        host: 'http://localhost:3001/',
        seedUrls: ['/'],
        outPath: '/tmp/link-structure.json',
      });

      expect(result.issues).toHaveLength(2);
      expect(result.issues).toEqual(issues);
    });
  });
});
