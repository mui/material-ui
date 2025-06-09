import * as fs from 'fs';
import * as path from 'path';
import yargs, { ArgumentsCamelCase } from 'yargs';
import { processMarkdownFile, processApiFile } from '@mui/internal-scripts/generate-llms-txt';
import { getMaterialUiComponentInfo } from '../../packages/api-docs-builder-core/materialUi/getMaterialUiComponentInfo';
import { projectSettings } from '../../packages/api-docs-builder-core/materialUi/projectSettings';

interface ComponentDocInfo {
  name: string;
  markdownPath: string;
  apiJsonPath?: string;
}

type CommandOptions = { 
  grep?: string; 
  outputDir?: string;
  includeApi?: boolean;
};

/**
 * Find all component markdown files and map them to API files using the API docs builder
 */
function findComponentMarkdownFiles(baseDir: string, grep?: RegExp): ComponentDocInfo[] {
  const componentsDir = path.join(baseDir, 'docs/data/material/components');
  const components: ComponentDocInfo[] = [];
  
  if (!fs.existsSync(componentsDir)) {
    throw new Error(`Components directory not found: ${componentsDir}`);
  }
  
  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // Get all API pages to create a reverse mapping
  const apiPages = projectSettings.getApiPages();
  const componentToApiMap = new Map<string, string>();
  
  for (const apiPage of apiPages) {
    try {
      // Extract component name from API filename
      const apiFilename = path.basename(apiPage.pathname, '.json');
      const jsonPath = path.join(baseDir, `docs/pages/material-ui/api/${apiFilename}.json`);
      
      if (fs.existsSync(jsonPath)) {
        const apiContent = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const componentName = apiContent.name;
        
        // Find markdown files that might reference this component
        for (const componentDir of componentDirs) {
          // Direct match
          if (componentDir === apiFilename) {
            componentToApiMap.set(componentDir, jsonPath);
            continue;
          }
          
          // Check if this component matches with the API
          // For plurals like "buttons" -> "button", "chips" -> "chip" etc.
          if (componentDir === componentName?.toLowerCase() + 's' || 
              componentDir.replace(/s$/, '') === apiFilename ||
              componentDir.replace(/-/g, '') === apiFilename.replace(/-/g, '')) {
            componentToApiMap.set(componentDir, jsonPath);
          }
        }
      }
    } catch (error) {
      // Skip invalid API files
      continue;
    }
  }
  
  for (const componentName of componentDirs) {
    // Skip if grep pattern doesn't match
    if (grep && !grep.test(componentName)) {
      continue;
    }
    
    // Skip special files
    if (componentName === 'about-the-lab') {
      continue;
    }
    
    const markdownPath = path.join(componentsDir, componentName, `${componentName}.md`);
    
    // Skip if markdown file doesn't exist
    if (!fs.existsSync(markdownPath)) {
      console.warn(`Warning: Markdown file not found for component: ${componentName}`);
      continue;
    }
    
    const component: ComponentDocInfo = {
      name: componentName,
      markdownPath,
    };
    
    // Use the mapped API path if available
    const apiJsonPath = componentToApiMap.get(componentName);
    if (apiJsonPath) {
      component.apiJsonPath = apiJsonPath;
    }
    
    components.push(component);
  }
  
  return components;
}

/**
 * Process a single component
 */
function processComponent(component: ComponentDocInfo, options: { includeApi: boolean }): string {
  console.log(`Processing component: ${component.name}`);
  
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
  const grep = argv.grep ? new RegExp(argv.grep) : undefined;
  const outputDir = argv.outputDir || path.join(process.cwd(), 'llms-docs');
  const includeApi = argv.includeApi !== false; // Default to true
  
  console.log(`Building LLMs docs...`);
  console.log(`Output directory: ${outputDir}`);
  console.log(`Include API: ${includeApi}`);
  if (grep) {
    console.log(`Filter pattern: ${grep}`);
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Find all components
  const baseDir = process.cwd();
  const components = findComponentMarkdownFiles(baseDir, grep);
  
  console.log(`Found ${components.length} components to process`);
  
  // Process each component
  for (const component of components) {
    try {
      const processedMarkdown = processComponent(component, { includeApi });
      
      // Write to output file
      const outputFileName = `${component.name}.md`;
      const outputPath = path.join(outputDir, outputFileName);
      
      fs.writeFileSync(outputPath, processedMarkdown, 'utf-8');
      console.log(`✓ Generated: ${outputFileName}`);
    } catch (error) {
      console.error(`✗ Error processing ${component.name}:`, error);
    }
  }
  
  console.log(`\nCompleted! Generated ${components.length} files in ${outputDir}`);
}

/**
 * CLI setup
 */
yargs(process.argv.slice(2))
  .command({
    command: '$0',
    describe: 'Generates LLM-optimized documentation for MUI components.',
    builder: (command) => {
      return command
        .option('grep', {
          description:
            'Only generate files for components matching the pattern. The string is treated as a RegExp.',
          type: 'string',
        })
        .option('outputDir', {
          description: 'Output directory for generated markdown files.',
          type: 'string',
          default: './llms-docs',
        })
        .option('includeApi', {
          description: 'Whether to include API documentation at the end of each component doc.',
          type: 'boolean',
          default: true,
        });
    },
    handler: buildLlmsDocs,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();