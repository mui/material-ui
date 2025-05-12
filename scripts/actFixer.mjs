#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

// Get current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const isAsyncFunction = (node) => {
  return node.type === 'ArrowFunctionExpression' && node.async === true;
};

const isActCall = (node) => {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'act'
  );
};

// Simple parser to find act calls with non-async functions
// This is not a full-featured parser, just enough to identify patterns we need
function parseAndModifyFile(content) {
  let modified = false;
  let modifiedContent = content;

  // Match act call patterns like: act(() => { ... });
  const actCallPattern = /act\(\s*\((?!async)([^)]*)\)\s*=>\s*{([^}]*)}\s*\)/gs;

  // Replace non-async arrow functions in act calls
  modifiedContent = modifiedContent.replace(actCallPattern, (match, params, body) => {
    modified = true;
    return `await act(async (${params}) => {${body}})`;
  });

  // Match act call patterns like: act(function() { ... });
  const actCallFunctionPattern = /act\(\s*function(?!.*async)([^)]*)\)\s*{([^}]*)}\s*\)/gs;

  // Replace non-async functions in act calls
  modifiedContent = modifiedContent.replace(actCallFunctionPattern, (match, params, body) => {
    modified = true;
    return `await act(async function${params}) {${body}})`;
  });

  // Find functions containing act calls that need to be made async
  const functionPatterns = [
    // Arrow functions in it() calls: it('test', () => { ... });
    {
      pattern:
        /it\(\s*(['"`].*?['"`])\s*,\s*(?!async)(\([^)]*\))\s*=>\s*{([\s\S]*?act\([\s\S]*?)}\s*\)/gs,
      replace: (match, testName, params, body) => {
        modified = true;
        return `it(${testName}, async ${params} => {${body}})`;
      },
    },
    // Traditional functions in it() calls: it('test', function() { ... });
    {
      pattern:
        /it\(\s*(['"`].*?['"`])\s*,\s*function(?!\s*async)([^)]*)\)\s*{([\s\S]*?act\([\s\S]*?)}\s*\)/gs,
      replace: (match, testName, params, body) => {
        modified = true;
        return `it(${testName}, async function${params}) {${body}})`;
      },
    },
    // Named functions containing act that are not in it() calls
    {
      pattern: /function\s+([a-zA-Z0-9_$]+)(?!\s*async)([^)]*)\)\s*{([\s\S]*?act\([\s\S]*?)}/gs,
      replace: (match, name, params, body) => {
        modified = true;
        // Add TODO comment for manual fix
        return `// TODO: This function needs to be manually updated to async
function ${name}${params}) {${body}}`;
      },
    },
    // Arrow functions that are not direct arguments to it()
    {
      pattern:
        /(?<!it\(\s*['"`].*?['"`]\s*,\s*)(?!async)(\([^)]*\))\s*=>\s*{([\s\S]*?act\([\s\S]*?)}/gs,
      replace: (match, params, body) => {
        // This may produce false positives, so add a TODO comment
        if (body.includes('act(')) {
          modified = true;
          return `// TODO: This arrow function might need to be manually updated to async
${params} => {${body}}`;
        }
        return match;
      },
    },
  ];

  // Apply function patterns
  for (const { pattern, replace } of functionPatterns) {
    modifiedContent = modifiedContent.replace(pattern, replace);
  }

  return { modified, modifiedContent };
}

async function main() {
  try {
    // Find all test files
    const testFiles = globSync('**/*.test.{js,jsx,ts,tsx}', {
      cwd: rootDir,
      ignore: ['**/node_modules/**', '**/build/**', '**/dist/**'],
      absolute: true,
    });

    console.log(`Found ${testFiles.length} test files.`);

    let modifiedFileCount = 0;

    for (const filePath of testFiles) {
      try {
        // Read file content
        const content = await fs.readFile(filePath, 'utf-8');

        // Skip files that don't include act
        if (!content.includes('act(')) {
          continue;
        }

        // Parse and modify file content
        const { modified, modifiedContent } = parseAndModifyFile(content);

        if (modified) {
          // Write modified content back to file
          await fs.writeFile(filePath, modifiedContent, 'utf-8');
          modifiedFileCount++;
          console.log(`Modified: ${path.relative(rootDir, filePath)}`);
        }
      } catch (err) {
        console.error(`Error processing file ${filePath}:`, err.message);
      }
    }

    console.log(`\nModified ${modifiedFileCount} files.`);
    console.log(`\nNOTE: Files marked with 'TODO' comments require manual review.`);
    console.log(
      `Please search for 'TODO: This function needs to be manually updated to async' in your codebase.`,
    );
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
