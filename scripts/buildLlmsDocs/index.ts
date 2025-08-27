/**
 * LLM Documentation Generator
 *
 * This script generates LLM-optimized documentation by processing MUI component markdown files
 * and non-component documentation files to create comprehensive, standalone documentation.
 *
 * ## Main Workflow:
 *
 * 1. **Component Processing**:
 *    - Discovers all components using the API docs builder infrastructure
 *    - For each component, finds its markdown documentation and API JSON
 *    - Processes markdown by replacing `{{"demo": "filename.js"}}` syntax with actual code snippets
 *    - Appends API documentation (props, slots, CSS classes) to the markdown
 *    - Outputs to files like `material-ui/react-accordion.md`
 *
 * 2. **Non-Component Processing** (optional):
 *    - Processes markdown files from specified folders (e.g., `system`, `material/customization`)
 *    - Applies the same demo replacement logic
 *    - Uses URL transformation logic to maintain consistent paths with components
 *    - Outputs to files like `system/borders.md`, `material-ui/customization/color.md`
 *
 * 3. **Index Generation** (llms.txt):
 *    - Generates `llms.txt` index files for each top-level directory
 *    - Groups files by category (components, customization, getting-started, etc.)
 *    - Creates markdown-formatted lists with relative paths and descriptions
 *    - Outputs to files like `material-ui/llms.txt`, `system/llms.txt`
 *
 * ## Key Features:
 *
 * - **Demo Replacement**: Converts `{{"demo": "filename.js"}}` to actual JSX/TSX code snippets
 * - **API Integration**: Automatically includes component API documentation (props, slots, CSS)
 * - **Reusable**: Accepts project settings via CLI to work across different repositories
 * - **Filtering**: Supports grep patterns to process specific components/files
 * - **Path Consistency**: Uses existing URL transformation logic for consistent output structure
 * - **Auto-indexing**: Generates llms.txt files with categorized documentation listings
 *
 * ## Usage Examples:
 *
 * ```bash
 * # Process all Material UI components
 * pnpm tsx scripts/buildLlmsDocs/index.ts --projectSettings ./packages/api-docs-builder-core/materialUi/projectSettings.ts
 *
 * # Process specific components with non-component docs
 * pnpm tsx scripts/buildLlmsDocs/index.ts \
 *   --projectSettings ./packages/api-docs-builder-core/materialUi/projectSettings.ts \
 *   --nonComponentFolders system material/customization \
 *   --grep "Button|borders"
 * ```
 *
 * ## Output Structure:
 *
 * - **Components**: `material-ui/react-{component}.md` (e.g., `material-ui/react-button.md`)
 * - **Customization**: `material-ui/customization/{topic}.md` (e.g., `material-ui/customization/color.md`)
 * - **Getting Started**: `material-ui/getting-started/{topic}.md` (e.g., `material-ui/getting-started/installation.md`)
 * - **Index Files**: `{directory}/llms.txt` (e.g., `material-ui/llms.txt`, `system/llms.txt`)
 */

import * as fs from 'fs';
import * as path from 'path';
import yargs, { ArgumentsCamelCase } from 'yargs';
import kebabCase from 'lodash/kebabCase';
import { processMarkdownFile, processApiFile } from '@mui/internal-scripts/generate-llms-txt';
import { ComponentInfo, ProjectSettings } from '@mui-internal/api-docs-builder';
import { getHeaders } from '@mui/internal-markdown';
import { fixPathname } from '@mui-internal/api-docs-builder/buildApiUtils';
import replaceUrl from '@mui-internal/api-docs-builder/utils/replaceUrl';
import findComponents from '@mui-internal/api-docs-builder/utils/findComponents';
import findPagesMarkdown from '@mui-internal/api-docs-builder/utils/findPagesMarkdown';

// Determine the host based on environment variables
let ORIGIN: string | undefined = 'https://mui.com';

if (process.env.CONTEXT === 'deploy-preview') {
  // ref: https://docs.netlify.com/build/configure-builds/environment-variables/
  ORIGIN = process.env.DEPLOY_PRIME_URL;
} else if (
  process.env.CONTEXT === 'branch-deploy' &&
  (process.env.HEAD === 'master' || process.env.HEAD === 'next' || process.env.HEAD?.match(/^v\d/))
) {
  if (process.env.HEAD === 'master') {
    ORIGIN = process.env.DEPLOY_PRIME_URL;
  } else {
    // https://next.mui.com, https://v6.mui.com, etc.
    ORIGIN = `https://${process.env.HEAD.replace('.x', '')}.mui.com`;
  }
}

interface ComponentDocInfo {
  name: string;
  componentInfo: ComponentInfo;
  demos: Array<{ demoPageTitle: string; demoPathname: string }>;
  markdownPath?: string;
  apiJsonPath?: string;
}

interface GeneratedFile {
  outputPath: string;
  title: string;
  description: string;
  originalMarkdownPath: string;
  category: string;
  orderIndex?: number; // Track the order for non-component folders
}

type CommandOptions = {
  grep?: string;
  outputDir?: string;
  projectSettings?: string;
};

/**
 * Find all components using the API docs builder infrastructure
 */
async function findComponentsToProcess(
  projectSettings: ProjectSettings,
  grep: RegExp | null,
): Promise<ComponentDocInfo[]> {
  const components: ComponentDocInfo[] = [];

  // Iterate through TypeScript projects, using the same logic as buildApi.ts
  for (const project of projectSettings.typeScriptProjects) {
    const projectComponents = findComponents(path.join(project.rootPath, 'src')).filter(
      (component) => {
        if (projectSettings.skipComponent(component.filename)) {
          return false;
        }

        if (grep === null) {
          return true;
        }

        return grep.test(component.filename);
      },
    );

    for (const component of projectComponents) {
      try {
        // Get component info using the API docs builder
        const componentInfo = projectSettings.getComponentInfo(component.filename);

        // Skip if component should be skipped (internal, etc.)
        const fileInfo = componentInfo.readFile();
        if (fileInfo.shouldSkip) {
          continue;
        }

        // Get demos for this component
        const demos = componentInfo.getDemos();

        // Skip if no demos found (likely not a public component)
        if (demos.length === 0) {
          continue;
        }

        // Get the markdown file path from the first demo
        const firstDemo = demos[0];
        const markdownPath = firstDemo ? firstDemo.filePath : undefined;

        // Get API JSON path
        const apiJsonPath = path.join(
          componentInfo.apiPagesDirectory,
          `${path.basename(componentInfo.apiPathname)}.json`,
        );

        components.push({
          name: componentInfo.name,
          componentInfo,
          demos,
          markdownPath,
          apiJsonPath: fs.existsSync(apiJsonPath) ? apiJsonPath : undefined,
        });
      } catch (error) {
        // Skip components that can't be processed
        continue;
      }
    }
  }

  return components;
}

/**
 * Extract title and description from markdown content
 */
function extractMarkdownInfo(markdownPath: string): { title: string; description: string } {
  try {
    const content = fs.readFileSync(markdownPath, 'utf-8');
    const headers = getHeaders(content);

    // Get title from frontmatter or first h1
    const title =
      headers.title || content.match(/^# (.+)$/m)?.[1] || path.basename(markdownPath, '.md');

    // Extract description from the first paragraph with class="description"
    const descriptionMatch = content.match(/<p class="description">([^<]+)<\/p>/);
    let description = '';

    if (descriptionMatch) {
      description = descriptionMatch[1].trim();
    } else {
      // Fallback: get first paragraph after title (excluding headers)
      const paragraphMatch = content.match(/^# .+\n\n(?!#)(.+?)(?:\n\n|$)/m);
      if (paragraphMatch && !paragraphMatch[1].startsWith('#')) {
        description = paragraphMatch[1].trim();
      }
    }

    return { title, description };
  } catch (error) {
    return {
      title: path.basename(markdownPath, '.md'),
      description: '',
    };
  }
}

/**
 * Find all non-component markdown files from specified folders
 */
function findNonComponentMarkdownFiles(
  folders: string[],
  grep: RegExp | null,
): Array<{ markdownPath: string; outputPath: string }> {
  // Get all markdown files using the existing findPagesMarkdown utility
  const allMarkdownFiles = findPagesMarkdown();

  const files: Array<{ markdownPath: string; outputPath: string }> = [];

  for (const page of allMarkdownFiles) {
    // Check if the page belongs to one of the specified folders
    const belongsToFolder = folders.some((folder) => page.pathname.startsWith(`/${folder}`));
    if (!belongsToFolder) {
      continue;
    }

    // Apply grep filter if specified
    if (grep) {
      const fileName = path.basename(page.filename);
      if (!grep.test(fileName) && !grep.test(page.pathname)) {
        continue;
      }
    }

    // Apply fixPathname first, then replaceUrl to get the proper output structure (like components)
    const afterFixPathname = fixPathname(page.pathname);
    const fixedPathname = replaceUrl(afterFixPathname, '/material-ui/');
    const outputPath = `${fixedPathname.replace(/^\//, '').replace(/\/$/, '')}.md`;

    files.push({
      markdownPath: page.filename,
      outputPath,
    });
  }

  return files;
}

/**
 * Process a single component
 */
function processComponent(component: ComponentDocInfo): string | null {
  // Processing component: ${component.name}

  // Skip if no markdown file found
  if (!component.markdownPath) {
    console.error(`Warning: No markdown file found for component: ${component.name}`);
    return null;
  }

  // Process the markdown file with demo replacement
  let processedMarkdown = processMarkdownFile(component.markdownPath);

  // Read the frontmatter to get all components listed in this markdown file
  const markdownContent = fs.readFileSync(component.markdownPath, 'utf-8');
  const headers = getHeaders(markdownContent);
  const componentsInPage = headers.components || [];

  // Add API sections for all components listed in the frontmatter
  if (componentsInPage.length > 0) {
    for (const componentName of componentsInPage) {
      // Construct the API JSON path based on the project settings
      const apiJsonPath = path.join(
        component.componentInfo.apiPagesDirectory,
        `${kebabCase(componentName)}.json`,
      );

      if (fs.existsSync(apiJsonPath)) {
        try {
          const apiMarkdown = processApiFile(apiJsonPath, { origin: ORIGIN });
          processedMarkdown += `\n\n${apiMarkdown}`;
        } catch (error) {
          console.error(`Warning: Could not process API for ${componentName}:`, error);
        }
      } else {
        console.warn(`Warning: API JSON file not found for ${componentName}: ${apiJsonPath}`);
      }
    }
  } else if (component.apiJsonPath) {
    // Fallback: Add API section for the primary component if no frontmatter components found
    try {
      const apiMarkdown = processApiFile(component.apiJsonPath, { origin: ORIGIN });
      processedMarkdown += `\n\n${apiMarkdown}`;
    } catch (error) {
      console.error(`Warning: Could not process API for ${component.name}:`, error);
    }
  }

  return processedMarkdown;
}

/**
 * Convert kebab-case to Title Case
 */
function toTitleCase(kebabCaseStr: string): string {
  return kebabCaseStr
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate llms.txt content for a specific directory
 */
function generateLlmsTxt(
  generatedFiles: GeneratedFile[],
  projectName: string,
  baseDir: string,
  origin?: string,
): string {
  // Group files by category
  const groupedByCategory: Record<string, GeneratedFile[]> = {};

  for (const file of generatedFiles) {
    const category = file.category;
    if (!groupedByCategory[category]) {
      groupedByCategory[category] = [];
    }
    groupedByCategory[category].push(file);
  }

  // Generate content
  let content = `# ${projectName}\n\n`;
  content += `This is the documentation for the ${projectName} package.\n`;
  content += `It contains comprehensive guides, components, and utilities for building user interfaces.\n\n`;

  // Add sections for each category
  // Sort categories to ensure components appear first, then by orderIndex for non-component folders
  const sortedCategories = Object.keys(groupedByCategory).sort((a, b) => {
    if (a === 'components') {
      return -1;
    }
    if (b === 'components') {
      return 1;
    }

    // For non-component categories, check if they have orderIndex
    const filesA = groupedByCategory[a];
    const filesB = groupedByCategory[b];
    const orderIndexA = filesA[0]?.orderIndex ?? Number.MAX_SAFE_INTEGER;
    const orderIndexB = filesB[0]?.orderIndex ?? Number.MAX_SAFE_INTEGER;

    if (orderIndexA !== orderIndexB) {
      return orderIndexA - orderIndexB;
    }

    return a.localeCompare(b);
  });

  for (const category of sortedCategories) {
    const files = groupedByCategory[category];
    if (files.length === 0) {
      continue;
    }

    const sectionTitle = toTitleCase(category);
    content += `## ${sectionTitle}\n\n`;

    // Sort files by title (components) or maintain original order (non-components)
    if (category === 'components') {
      files.sort((a, b) => a.title.localeCompare(b.title));
    }
    // Non-component files are already in the order they were discovered

    for (const file of files) {
      // Calculate relative path from the baseDir to the file
      const relativePath = file.outputPath.startsWith(`${baseDir}/`)
        ? `/${baseDir}/${file.outputPath.substring(baseDir.length + 1)}`
        : `/${file.outputPath}`;
      const url = origin ? new URL(relativePath, origin).href : relativePath;
      content += `- [${file.title}](${url})`;
      if (file.description) {
        content += `: ${file.description}`;
      }
      content += '\n';
    }
    content += '\n';
  }

  return content.trim();
}

/**
 * Main build function
 */
async function buildLlmsDocs(argv: ArgumentsCamelCase<CommandOptions>): Promise<void> {
  const grep = argv.grep ? new RegExp(argv.grep) : null;
  const outputDir = argv.outputDir || path.join(process.cwd(), 'docs/public');

  // Load project settings from the specified path
  if (!argv.projectSettings) {
    throw new Error('--projectSettings is required');
  }

  let projectSettings: ProjectSettings;
  try {
    const settingsPath = path.resolve(argv.projectSettings);
    const settingsModule = await import(settingsPath);
    projectSettings = settingsModule.projectSettings || settingsModule.default || settingsModule;
  } catch (error) {
    throw new Error(`Failed to load project settings from ${argv.projectSettings}: ${error}`);
  }

  // Find all components
  const components = await findComponentsToProcess(projectSettings, grep);

  // Found ${components.length} components to process

  // Find non-component markdown files if specified in project settings
  let nonComponentFiles: Array<{ markdownPath: string; outputPath: string }> = [];
  const nonComponentFolders = (projectSettings as any).nonComponentFolders;
  if (nonComponentFolders && nonComponentFolders.length > 0) {
    nonComponentFiles = findNonComponentMarkdownFiles(nonComponentFolders, grep);
    // Found ${nonComponentFiles.length} non-component markdown files to process
  }

  // Track generated files for llms.txt
  const generatedFiles: GeneratedFile[] = [];

  // Process each component
  let processedCount = 0;
  for (const component of components) {
    try {
      const processedMarkdown = processComponent(component);

      if (!processedMarkdown) {
        continue;
      }

      // Use the component's demo pathname to create the output structure
      // e.g., /material-ui/react-accordion/ -> material-ui/react-accordion.md
      const outputFileName = component.demos[0]
        ? `${component.demos[0].demoPathname.replace(/^\//, '').replace(/\/$/, '')}.md`
        : `${component.componentInfo.apiPathname.replace(/^\//, '').replace(/\/$/, '')}.md`;

      const outputPath = path.join(outputDir, outputFileName);

      // Check if this file has already been generated (avoid duplicates for components that share the same markdown file)
      const existingFile = generatedFiles.find((f) => f.outputPath === outputFileName);
      if (!existingFile) {
        // Ensure the directory exists
        const outputDirPath = path.dirname(outputPath);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }

        fs.writeFileSync(outputPath, processedMarkdown, 'utf-8');
        // ✓ Generated: ${outputFileName}
        processedCount += 1;

        // Track this file for llms.txt
        if (component.markdownPath) {
          const { title, description } = extractMarkdownInfo(component.markdownPath);
          generatedFiles.push({
            outputPath: outputFileName,
            title,
            description,
            originalMarkdownPath: component.markdownPath,
            category: 'components',
          });
        }
      }
    } catch (error) {
      console.error(`✗ Error processing ${component.name}:`, error);
    }
  }

  // Process non-component markdown files
  for (const file of nonComponentFiles) {
    try {
      // Processing non-component file: ${path.relative(process.cwd(), file.markdownPath)}

      // Process the markdown file with demo replacement
      const processedMarkdown = processMarkdownFile(file.markdownPath);

      const outputPath = path.join(outputDir, file.outputPath);

      // Ensure the directory exists
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      fs.writeFileSync(outputPath, processedMarkdown, 'utf-8');
      // ✓ Generated: ${file.outputPath}
      processedCount += 1;

      // Track this file for llms.txt
      const { title, description } = extractMarkdownInfo(file.markdownPath);

      // Extract category from the file path
      // e.g., "material-ui/customization/color.md" -> "customization"
      // e.g., "getting-started/installation.md" -> "getting-started"
      const pathParts = file.outputPath.split('/');
      const category = pathParts.reverse()[1];

      // Find the order index based on which folder this file belongs to
      let orderIndex = -1;
      if (nonComponentFolders) {
        for (let i = 0; i < nonComponentFolders.length; i += 1) {
          if (file.markdownPath.includes(`/${nonComponentFolders[i]}/`)) {
            orderIndex = i;
            break;
          }
        }
      }

      generatedFiles.push({
        outputPath: file.outputPath,
        title,
        description,
        originalMarkdownPath: file.markdownPath,
        category,
        orderIndex,
      });
    } catch (error) {
      console.error(`✗ Error processing ${file.markdownPath}:`, error);
    }
  }

  // Generate llms.txt files
  if (generatedFiles.length > 0) {
    const groupedByFirstDir: Record<string, GeneratedFile[]> = {};

    for (const file of generatedFiles) {
      const firstDir = file.outputPath.split('/')[0];
      if (!groupedByFirstDir[firstDir]) {
        groupedByFirstDir[firstDir] = [];
      }
      groupedByFirstDir[firstDir].push(file);
    }

    for (const [dirName, files] of Object.entries(groupedByFirstDir)) {
      let projectName;
      if (dirName === 'material-ui') {
        projectName = 'Material UI';
      } else if (dirName === 'system') {
        projectName = 'MUI System';
      } else {
        projectName = dirName.charAt(0).toUpperCase() + dirName.slice(1);
      }

      const llmsContent = generateLlmsTxt(files, projectName, dirName, ORIGIN);
      const llmsPath = path.join(outputDir, dirName, 'llms.txt');

      // Ensure directory exists
      const llmsDirPath = path.dirname(llmsPath);
      if (!fs.existsSync(llmsDirPath)) {
        fs.mkdirSync(llmsDirPath, { recursive: true });
      }

      fs.writeFileSync(llmsPath, llmsContent, 'utf-8');
      // ✓ Generated: ${dirName}/llms.txt
      processedCount += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`\nCompleted! Generated ${processedCount} files in ${outputDir}`);
}

/**
 * CLI setup
 */
yargs(process.argv.slice(2))
  .command({
    command: '$0',
    describe: 'Generates LLM-optimized documentation for MUI components.',
    builder: (command: any) => {
      return command
        .option('grep', {
          description:
            'Only generate files for components matching the pattern. The string is treated as a RegExp.',
          type: 'string',
        })
        .option('outputDir', {
          description: 'Output directory for generated markdown files.',
          type: 'string',
          default: './docs/public',
        })
        .option('projectSettings', {
          description:
            'Path to the project settings module that exports ProjectSettings interface.',
          type: 'string',
          demandOption: true,
        });
    },
    handler: buildLlmsDocs,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
