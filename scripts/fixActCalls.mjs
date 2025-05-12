#!/usr/bin/env node
import * as babel from '@babel/core';
import fs from 'fs/promises';
import fastGlob from 'fast-glob';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Transforms JavaScript/TypeScript code to fix act() calls:
 * - Adds async to functions that contain non-awaited act() calls
 * - Adds await before act() calls
 */
function transformCode(code, filename) {
  // Track whether we need to modify this file
  let needsModification = false;

  const result = babel.transformSync(code, {
    filename,
    plugins: [
      function fixActPlugin() {
        return {
          visitor: {
            CallExpression(nodePath) {
              const { node } = nodePath;

              // Check if this is an act() call
              if (
                node.callee.type === 'Identifier' &&
                node.callee.name === 'act' &&
                !nodePath.isAwaitExpression()
              ) {
                // Find if the first argument to act() is an async function
                const firstArg = node.arguments[0];
                if (
                  firstArg &&
                  (firstArg.type === 'ArrowFunctionExpression' ||
                    firstArg.type === 'FunctionExpression')
                ) {
                  // Add async to the function if it's not already async
                  if (!firstArg.async) {
                    firstArg.async = true;
                    needsModification = true;
                  }
                }

                // Check if we need to add an await before act()
                if (!nodePath.parent || nodePath.parent.type !== 'AwaitExpression') {
                  const funcParent = nodePath.getFunctionParent();

                  if (funcParent) {
                    // Make the parent function async if it's not already
                    if (!funcParent.node.async) {
                      funcParent.node.async = true;
                      needsModification = true;
                    }

                    // Replace act() with await act()
                    nodePath.replaceWith(babel.types.awaitExpression(node));
                    needsModification = true;
                  }
                }
              }
            },
          },
        };
      },
    ],
    configFile: false,
    babelrc: false,
    retainLines: true,
    // Preserve original code formatting as much as possible
    generatorOpts: {
      retainLines: true,
      compact: false,
    },
    parserOpts: {
      plugins: ['jsx', 'typescript', 'classProperties', 'decorators-legacy', 'objectRestSpread'],
    },
  });

  return {
    code: result.code,
    modified: needsModification,
  };
}

async function main() {
  try {
    // Find all test files
    const testFiles = await fastGlob('packages/**/*.test.{js,jsx,ts,tsx}', {
      cwd: rootDir,
      ignore: ['**/node_modules/**', '**/build/**', '**/dist/**'],
      absolute: true,
    });

    console.log(`Found ${testFiles.length} test files.`);

    let modifiedFileCount = 0;

    // Process each file
    for (const filePath of testFiles) {
      try {
        // Read file content
        const content = await fs.readFile(filePath, 'utf-8');

        // Skip files that don't include act
        if (!content.includes('act(')) {
          continue;
        }

        // Transform the code
        const { code, modified } = transformCode(content, filePath);

        if (modified) {
          // Write modified content back to file
          await fs.writeFile(filePath, code, 'utf-8');
          modifiedFileCount++;
          console.log(`Modified: ${path.relative(rootDir, filePath)}`);
        }
      } catch (err) {
        console.error(`Error processing file ${filePath}:`, err.message);
      }
    }

    console.log(`\nModified ${modifiedFileCount} files.`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
