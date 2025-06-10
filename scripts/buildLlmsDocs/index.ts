import * as fs from 'fs';
import * as path from 'path';
import yargs, { ArgumentsCamelCase } from 'yargs';
import { processMarkdownFile, processApiFile } from '@mui/internal-scripts/generate-llms-txt';
import { ComponentInfo, ProjectSettings } from '@mui-internal/api-docs-builder';
import { fixPathname } from '../../packages/api-docs-builder/buildApiUtils';
import replaceUrl from '../../packages/api-docs-builder/utils/replaceUrl';
import findComponents from '../../packages/api-docs-builder/utils/findComponents';
import findPagesMarkdown from '../../packages/api-docs-builder/utils/findPagesMarkdown';

interface ComponentDocInfo {
  name: string;
  componentInfo: ComponentInfo;
  demos: Array<{ demoPageTitle: string; demoPathname: string }>;
  markdownPath?: string;
  apiJsonPath?: string;
}

type CommandOptions = {
  grep?: string;
  outputDir?: string;
  includeApi?: boolean;
  projectSettings?: string;
  nonComponentFolders?: string[];
};

/**
 * Find all components using the API docs builder infrastructure
 */
async function findComponentsToProcess(
  projectSettings: ProjectSettings,
  grep: RegExp | null
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
        const apiJsonPath = path.join(componentInfo.apiPagesDirectory, `${path.basename(componentInfo.apiPathname)}.json`);

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
 * Find all non-component markdown files from specified folders
 */
function findNonComponentMarkdownFiles(
  folders: string[],
  grep: RegExp | null
): Array<{ markdownPath: string; outputPath: string }> {
  // Get all markdown files using the existing findPagesMarkdown utility
  const allMarkdownFiles = findPagesMarkdown();
  
  const files: Array<{ markdownPath: string; outputPath: string }> = [];
  
  for (const page of allMarkdownFiles) {
    // Check if the page belongs to one of the specified folders
    const belongsToFolder = folders.some(folder => page.pathname.startsWith(`/${folder}`));
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
    const outputPath = fixedPathname.replace(/^\//, '').replace(/\/$/, '') + '.md';
    
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
function processComponent(component: ComponentDocInfo, options: { includeApi: boolean }): string | null {
  console.log(`Processing component: ${component.name}`);

  // Skip if no markdown file found
  if (!component.markdownPath) {
    console.warn(`Warning: No markdown file found for component: ${component.name}`);
    return null;
  }

  // Process the markdown file with demo replacement
  let processedMarkdown = processMarkdownFile(component.markdownPath);

  // Add API section if JSON exists and includeApi is true
  if (options.includeApi && component.apiJsonPath) {
    try {
      const apiMarkdown = processApiFile(component.apiJsonPath);
      processedMarkdown += '\n\n' + apiMarkdown;
    } catch (error) {
      console.warn(`Warning: Could not process API for ${component.name}:`, error);
    }
  }

  return processedMarkdown;
}

/**
 * Main build function
 */
async function buildLlmsDocs(argv: ArgumentsCamelCase<CommandOptions>): Promise<void> {
  const grep = argv.grep ? new RegExp(argv.grep) : null;
  const outputDir = argv.outputDir || path.join(process.cwd(), 'docs/public');
  const includeApi = argv.includeApi !== false; // Default to true

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

  console.log(`Building LLMs docs...`);
  console.log(`Project settings: ${argv.projectSettings}`);
  console.log(`Output directory: ${outputDir}`);
  console.log(`Include API: ${includeApi}`);
  if (grep) {
    console.log(`Filter pattern: ${grep}`);
  }

  // Find all components
  const components = await findComponentsToProcess(projectSettings, grep);

  console.log(`Found ${components.length} components to process`);

  // Find non-component markdown files if specified
  let nonComponentFiles: Array<{ markdownPath: string; outputPath: string }> = [];
  if (argv.nonComponentFolders && argv.nonComponentFolders.length > 0) {
    nonComponentFiles = findNonComponentMarkdownFiles(argv.nonComponentFolders, grep);
    console.log(`Found ${nonComponentFiles.length} non-component markdown files to process`);
  }

  // Process each component
  let processedCount = 0;
  for (const component of components) {
    try {
      const processedMarkdown = processComponent(component, { includeApi });
      
      if (!processedMarkdown) {
        continue;
      }

      // Use the component's demo pathname to create the output structure
      // e.g., /material-ui/react-accordion/ -> material-ui/react-accordion.md
      const outputFileName = component.demos[0] ? 
        component.demos[0].demoPathname
          .replace(/^\//, '')
          .replace(/\/$/, '') + '.md' :
        component.componentInfo.apiPathname
          .replace(/^\//, '')
          .replace(/\/$/, '') + '.md';

      const outputPath = path.join(outputDir, outputFileName);

      // Ensure the directory exists
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      fs.writeFileSync(outputPath, processedMarkdown, 'utf-8');
      console.log(`✓ Generated: ${outputFileName}`);
      processedCount++;
    } catch (error) {
      console.error(`✗ Error processing ${component.name}:`, error);
    }
  }

  // Process non-component markdown files
  for (const file of nonComponentFiles) {
    try {
      console.log(`Processing non-component file: ${path.relative(process.cwd(), file.markdownPath)}`);
      
      // Process the markdown file with demo replacement
      const processedMarkdown = processMarkdownFile(file.markdownPath);
      
      const outputPath = path.join(outputDir, file.outputPath);
      
      // Ensure the directory exists
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      
      fs.writeFileSync(outputPath, processedMarkdown, 'utf-8');
      console.log(`✓ Generated: ${file.outputPath}`);
      processedCount++;
    } catch (error) {
      console.error(`✗ Error processing ${file.markdownPath}:`, error);
    }
  }

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
        .option('includeApi', {
          description: 'Whether to include API documentation at the end of each component doc.',
          type: 'boolean',
          default: true,
        })
        .option('projectSettings', {
          description: 'Path to the project settings module that exports ProjectSettings interface.',
          type: 'string',
          demandOption: true,
        })
        .option('nonComponentFolders', {
          description: 'List of folders from docs/data/ to process non-component markdown files.',
          type: 'array',
          default: [],
        });
    },
    handler: buildLlmsDocs,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
