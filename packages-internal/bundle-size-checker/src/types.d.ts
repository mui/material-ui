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

// Command line argument types
interface CommandLineArgs {
  analyze?: boolean;
  accurateBundles?: boolean;
  output?: string;
}
