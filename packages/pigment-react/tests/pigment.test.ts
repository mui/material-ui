import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect } from 'chai';
import * as prettier from 'prettier';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import { TransformCacheCollection, transform, createFileReporter } from '@wyw-in-js/transform';
import { preprocessor } from '@pigment-css/react/utils';
import { createTheme } from '@mui/material/styles';

const materialTheme = createTheme();

const files = fs.readdirSync(path.join(__dirname, 'fixtures'), { recursive: true });

const theme = {
  palette: {
    primary: {
      main: 'red',
    },
  },
  size: {
    font: {
      h1: '3rem',
    },
  },
  transitions: materialTheme.transitions,
  components: {
    MuiSlider: {
      styleOverrides: {
        rail: {
          fontSize: '3rem',
        },
      },
    },
  },
};

describe('zero-runtime', () => {
  files.forEach((file) => {
    if (
      typeof file === 'string' &&
      file.endsWith('.input.js') &&
      file.includes('material-ui-touch-ripple')
    ) {
      it(`test input file ${file}`, async () => {
        const prettierConfig = await prettier.resolveConfig(process.cwd(), {
          config: path.join(process.cwd(), 'prettier.config.js'),
        });
        const cache = new TransformCacheCollection();
        const { emitter: eventEmitter } = createFileReporter(false);
        const inputFilePath = path.join(__dirname, 'fixtures', file);
        const outputFilePath = path.join(
          __dirname,
          'fixtures',
          file.replace('.input.', '.output.'),
        );
        const outputCssFilePath = path.join(
          __dirname,
          'fixtures',
          file.replace('.input.js', '.output.css'),
        );
        const inputContent = fs.readFileSync(inputFilePath, 'utf8');
        let outputContent = '';
        let outputCssContent = '';
        try {
          outputContent = fs.readFileSync(outputFilePath, 'utf8');
          outputCssContent = fs.readFileSync(outputCssFilePath, 'utf8');
        } catch (e) {
          /* empty */
        }

        const pluginOptions = {
          themeArgs: {
            theme,
          },
          babelOptions: {
            configFile: false,
            babelrc: false,
          },
          tagResolver(source: string, tag: string) {
            if (source === '@pigment-css/react') {
              return require.resolve(`../exports/${tag}`);
            }
            return null;
          },
        };
        const result = await transform(
          {
            options: {
              filename: inputFilePath,
              preprocessor,
              pluginOptions,
            },
            cache,
            eventEmitter,
          },
          inputContent,
          asyncResolveFallback,
        );

        const prettiedCode = await prettier.format(result.code!, {
          ...prettierConfig,
          filepath: outputFilePath,
        });
        if (!outputContent) {
          fs.writeFileSync(outputFilePath, prettiedCode);
        } else {
          expect(prettiedCode).to.equal(outputContent);
        }

        const prettiedCss = await prettier.format(result.cssText!, {
          ...prettierConfig,
          filepath: outputCssFilePath,
        });
        if (!outputCssContent) {
          fs.writeFileSync(outputCssFilePath, prettiedCss);
        } else {
          expect(prettiedCss).to.equal(outputCssContent);
        }
      });
    }
  });
});
