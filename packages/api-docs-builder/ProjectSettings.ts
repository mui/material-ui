import { ComponentInfo, HookInfo } from './buildApiUtils';
import { CreateTypeScriptProjectOptions } from './utils/createTypeScriptProject';
import { ReactApi as ComponentReactApi } from './ApiBuilders/ComponentApiBuilder';
import { ReactApi as HookReactApi } from './ApiBuilders/HookApiBuilder';

export interface ProjectSettings {
  output: {
    /**
     * The output path of `pagesApi` generated from `input.pageDirectory`
     */
    apiManifestPath: string;
  };
  /**
   * Component directories to be used to generate API
   */
  typeScriptProjects: CreateTypeScriptProjectOptions[];
  getApiPages: () => Array<{ pathname: string }>;
  getComponentInfo: (filename: string) => ComponentInfo;
  getHookInfo?: (filename: string) => HookInfo;
  /**
   * Callback function to be called when the API generation is completed
   */
  onCompleted?: () => void;
  /**
   * Callback to customize the manifest file before it's written to the disk
   */
  onWritingManifestFile?: (
    builds: PromiseSettledResult<ComponentReactApi | HookReactApi | null | never[]>[],
    source: string,
  ) => string;
  /**
   * Languages to which the API docs will be generated
   */
  translationLanguages: string[];
  /**
   * Fuction called to detemine whether to skip the generation of a particular component's API docs
   */
  skipComponent: (filename: string) => boolean;
  /**
   * Function called to generate the class name for a component (or its slot)
   */
  generateClassName: (componentName: string, slotOrState: string) => string;
  /**
   * Determines if a given slot or state is a global state
   */
  isGlobalClassName: (slotOrState: string) => boolean;
}
