import { expect } from 'chai';
import { handleUrlReplacement } from '../src/utils';

const DATA_URI =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwLjUgMTMuN2';
const HTML_LOGO_URL = 'https://mui.com/static/logo.svg';
const ABSOLUTE_PATH = '/static/logo.svg';
const dummyResolver = (url: string) => {
  return Promise.resolve(url);
};

describe('utils', () => {
  describe('handleUrlReplacement', () => {
    it('should not replace http/data/absolute urls', async () => {
      [DATA_URI, HTML_LOGO_URL, ABSOLUTE_PATH].forEach(async (url) => {
        const cssString1 = `.className {
          background-image: url(${url});
        }`;
        const cssString2 = `.className {
          background-image: url('${url}');
        }`;
        expect(
          await handleUrlReplacement(
            cssString1,
            '/path/to/project/filename.ts',
            dummyResolver,
            '/path/to/project',
          ),
        ).to.equal(cssString1);
        expect(
          await handleUrlReplacement(
            cssString2,
            '/path/to/project/filename.ts',
            dummyResolver,
            '/path/to/project',
          ),
        ).to.equal(cssString1);
      });
    });

    it('should replace relative or aliased paths with paths relative to the current working directory', async () => {
      const projectPath = '/path/to/project';
      const filePath = `${projectPath}/src/components/Slider.tsx`;
      const resolver = (url: string): Promise<string> => {
        return new Promise((resolve) => {
          if (url.startsWith('@/')) {
            resolve(`${projectPath}/src${url.slice(1)}`);
          } else if (url.startsWith('../../')) {
            resolve(`${projectPath}/src/${url.replace('../../', '')}`);
          } else if (url.startsWith('/')) {
            resolve(url);
          }
        });
      };
      const cssString = `.className_c17ksbvo{
        background-color:var(--mui-palette-background-default, #fff);
        color:var(--mui-palette-text-primary, rgba(0, 0, 0, 0.87));
        background-image: url('${DATA_URI}');
        background-image: url('${HTML_LOGO_URL}');
        background-image: url(${ABSOLUTE_PATH});
        background-image: url('../../assets/mui.svg');
        background-image: url('@/assets/mui.svg');
        background-image: url('${projectPath}/src/assets/mui.svg');
        background-image: url('/assets/mui.svg');
        background-image: url('@/assets/mui.svg');
        display: flex;
        position: absolute;
      }`;
      const expectedCssString = `.className_c17ksbvo{
        background-color:var(--mui-palette-background-default, #fff);
        color:var(--mui-palette-text-primary, rgba(0, 0, 0, 0.87));
        background-image: url(${DATA_URI});
        background-image: url(${HTML_LOGO_URL});
        background-image: url(${ABSOLUTE_PATH});
        background-image: url(~/src/assets/mui.svg);
        background-image: url(~/src/assets/mui.svg);
        background-image: url(~/src/assets/mui.svg);
        background-image: url(/assets/mui.svg);
        background-image: url(~/src/assets/mui.svg);
        display: flex;
        position: absolute;
      }`;
      expect(await handleUrlReplacement(cssString, filePath, resolver, projectPath)).to.equal(
        expectedCssString,
      );
    });
  });
});
