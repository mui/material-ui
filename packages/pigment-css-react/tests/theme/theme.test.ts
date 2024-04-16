import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - theme', () => {
  it('should work with theme', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/themed-component.input.js'),
      {
        themeArgs: {
          theme: {
            colors: {
              primary: {
                background: '#EBF5FF',
                foreground: '#003A75',
              },
              neutral: {
                background: '#F3F6F9',
                foreground: '#6F7F95',
              },
            },
            radius: {
              xs: '0.25rem',
            },
            shadow: {
              sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            },
            typography: {
              h3: {
                fontSize: '2rem',
              },
              body2: {
                fontSize: '1rem',
              },
            },
            components: {
              MuiStat: {
                styleOverrides: {
                  root: ({ theme }) => ({
                    variants: [
                      {
                        props: { variant: 'outlined' },
                        style: {
                          borderColor: theme.colors.primary.background,
                        },
                      },
                    ],
                  }),
                  title: {
                    letterSpacing: '0.1rem',
                  },
                  value: {
                    lineHeight: 1.7,
                  },
                },
              },
            },
          },
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
