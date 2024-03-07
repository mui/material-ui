import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect } from 'chai';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import { TransformCacheCollection, transform, createFileReporter } from '@wyw-in-js/transform';
import { preprocessor } from '@pigment-css/react/utils';
import * as prettier from 'prettier';

const shouldUpdateOutput = process.env.UPDATE_FIXTURES === 'true';
const files = fs.readdirSync(path.join(__dirname, 'fixtures'));

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

const CUSTOM_ERROR =
  'The file contents have changed. Run "test:update" command to update the file if this is expected.';

describe('zero-runtime', () => {
  let prettierConfig: Exclude<Awaited<ReturnType<typeof prettier.resolveConfig>>, null>;

  files.forEach((file) => {
    it(`test input file ${file}`, async () => {
      if (file.includes('.output.')) {
        return;
      }
      const cache = new TransformCacheCollection();
      const { emitter: eventEmitter } = createFileReporter(false);
      const inputFilePath = path.join(__dirname, 'fixtures', file);
      const outputFilePath = path.join(__dirname, 'fixtures', file.replace('.input.', '.output.'));
      const outputCssFilePath = path.join(
        __dirname,
        'fixtures',
        file.replace('.input.js', '.output.css'),
      );
      const inputContent = fs.readFileSync(inputFilePath, 'utf8');
      const outputContent = fs.existsSync(outputFilePath)
        ? fs.readFileSync(outputFilePath, 'utf8')
        : '';
      const outputCssContent = fs.existsSync(outputCssFilePath)
        ? fs.readFileSync(outputCssFilePath, 'utf8')
        : '';

      const pluginOptions = {
        themeArgs: {
          theme,
        },
        babelOptions: {
          configFile: false,
          babelrc: false,
        },
        tagResolver(_source: string, tag: string) {
          return require.resolve(`../exports/${tag}`);
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

      const config =
        prettierConfig ??
        prettier.resolveConfig(path.join(__dirname, '../../../', 'prettier.config.js'));
      const formattedJs = await prettier.format(result.code, {
        ...config,
        parser: 'babel',
      });

      if (!outputContent || shouldUpdateOutput) {
        fs.writeFileSync(outputFilePath, formattedJs, 'utf-8');
        expect(true).to.equal(true);
      } else {
        expect(formattedJs, CUSTOM_ERROR).to.equal(outputContent);
      }

      const formattedCss = await prettier.format(result.cssText ?? '', {
        parser: 'css',
      });
      if (!outputCssContent || shouldUpdateOutput) {
        fs.writeFileSync(outputCssFilePath, formattedCss, 'utf-8');
        expect(true).to.equal(true);
      } else {
        expect(formattedCss, CUSTOM_ERROR).to.equal(outputCssContent);
      }
    });
  });
});
