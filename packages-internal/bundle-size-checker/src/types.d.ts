// WebpackEntry type
interface WebpackEntry {
  import: string;
  importName?: string;
}

// Webpack stats types
interface StatsAsset {
  name: string;
  size: number;
  related?: {
    find: (predicate: (asset: any) => boolean) => { size: number; type: string };
  };
}

interface StatsChunkGroup {
  name: string;
  assets: Array<{ name: string; size: number }>;
}

interface WebpackStats {
  hasErrors(): boolean;
  toJson(options: any): {
    assets?: StatsAsset[];
    entrypoints?: Record<string, StatsChunkGroup>;
    errors?: any[];
  };
}

// Upload configuration
interface UploadConfig {
  project: string;   // The project name (e.g., "mui/material-ui")
  branch?: string;   // Optional branch name (defaults to current Git branch)
  isPullRequest?: boolean; // Whether this is a pull request build (defaults to false)
}

// Bundle size checker config
interface BundleSizeCheckerConfig {
  entrypoints: string[];
  upload?: UploadConfig;
}

// Command line argument types
interface CommandLineArgs {
  analyze?: boolean;
  accurateBundles?: boolean;
  output?: string;
}
