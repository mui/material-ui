import { mkdirSync } from 'fs';
import path from 'path';
import * as fse from 'fs-extra';
import kebabCase from 'lodash/kebabCase';
import findComponents from './utils/findComponents';
import findHooks from './utils/findHooks';
import { ComponentInfo, HookInfo, writePrettifiedFile } from './buildApiUtils';
import generateComponentApi, { ReactApi } from './ApiBuilders/ComponentApiBuilder';
import generateHookApi from './ApiBuilders/HookApiBuilder';
import {
  CreateTypeScriptProjectOptions,
  TypeScriptProjectBuilder,
  createTypeScriptProjectBuilder,
} from './utils/createTypeScriptProject';

const apiDocsTranslationsDirectory = path.resolve('docs', 'translations', 'api-docs');

async function removeOutdatedApiDocsTranslations(components: readonly ReactApi[]): Promise<void> {
  const componentDirectories = new Set<string>();
  const files = await fse.readdir(apiDocsTranslationsDirectory);
  await Promise.all(
    files.map(async (filename) => {
      const filepath = path.join(apiDocsTranslationsDirectory, filename);
      const stats = await fse.stat(filepath);
      if (stats.isDirectory()) {
        componentDirectories.add(filepath);
      }
    }),
  );

  const currentComponentDirectories = new Set(
    components.map((component) => {
      return path.resolve(apiDocsTranslationsDirectory, kebabCase(component.name));
    }),
  );

  const outdatedComponentDirectories = new Set(componentDirectories);
  currentComponentDirectories.forEach((componentDirectory) => {
    outdatedComponentDirectories.delete(componentDirectory);
  });

  await Promise.all(
    Array.from(outdatedComponentDirectories, (outdatedComponentDirectory) => {
      return fse.remove(outdatedComponentDirectory);
    }),
  );
}

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
   * Languages to which the API docs will be generated
   */
  languages: string[];
  /**
   * Fuction called to detemine whether to skip the generation of a particular component's API docs
   */
  skipComponent: (filename: string) => boolean;
}

export async function buildApi(projectsSettings: ProjectSettings[], grep: RegExp | null = null) {
  const allTypeScriptProjects = projectsSettings
    .flatMap((setting) => setting.typeScriptProjects)
    .reduce((acc, project) => {
      acc[project.name] = project;
      return acc;
    }, {} as Record<string, CreateTypeScriptProjectOptions>);

  const buildTypeScriptProject = createTypeScriptProjectBuilder(allTypeScriptProjects);

  let allBuilds: Array<PromiseSettledResult<ReactApi | null>> = [];
  for (let i = 0; i < projectsSettings.length; i += 1) {
    const setting = projectsSettings[i];
    // eslint-disable-next-line no-await-in-loop
    const projectBuilds = await buildSingleProject(setting, buildTypeScriptProject, grep);

    // @ts-ignore ignore hooks builds for now
    allBuilds = [...allBuilds, ...projectBuilds];
  }

  if (grep === null) {
    const componentApis = allBuilds
      .filter((build): build is PromiseFulfilledResult<ReactApi> => {
        return build.status === 'fulfilled' && build.value !== null;
      })
      .map((build) => {
        return build.value;
      });

    await removeOutdatedApiDocsTranslations(componentApis);
  }
}

async function buildSingleProject(
  projectSettings: ProjectSettings,
  buildTypeScriptProject: TypeScriptProjectBuilder,
  grep: RegExp | null,
) {
  const tsProjects = projectSettings.typeScriptProjects.map((project) =>
    buildTypeScriptProject(project.name),
  );
  const apiPagesManifestPath = projectSettings.output.apiManifestPath;

  const manifestDir = apiPagesManifestPath.match(/(.*)\/[^/]+\./)?.[1];
  if (manifestDir) {
    mkdirSync(manifestDir, { recursive: true });
  }

  const apiBuilds = tsProjects.flatMap((project) => {
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

    const projectHooks = findHooks(path.join(project.rootPath, 'src')).filter((hook) => {
      if (grep === null) {
        return true;
      }
      return grep.test(hook.filename);
    });

    const componentsBuilds = projectComponents.map(async (component) => {
      try {
        const { filename } = component;
        const componentInfo = projectSettings.getComponentInfo(filename);

        mkdirSync(componentInfo.apiPagesDirectory, { mode: 0o777, recursive: true });

        return generateComponentApi(componentInfo, project, projectSettings);
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
    });

    const hooksBuilds = projectHooks.map(async (hook) => {
      if (!projectSettings.getHookInfo) {
        return [];
      }
      try {
        const { filename } = hook;
        const hookInfo = projectSettings.getHookInfo(filename);

        mkdirSync(hookInfo.apiPagesDirectory, { mode: 0o777, recursive: true });
        return generateHookApi(hookInfo, project, projectSettings);
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), hook.filename)}: ${error.message}`;
        throw error;
      }
    });

    return [...componentsBuilds, ...hooksBuilds];
  });

  const builds = await Promise.allSettled(apiBuilds);

  const fails = builds.filter(
    (promise): promise is PromiseRejectedResult => promise.status === 'rejected',
  );

  fails.forEach((build) => {
    console.error(build.reason);
  });

  if (fails.length > 0) {
    process.exit(1);
  }

  const apiLinks: { pathname: string; title: string }[] = [];

  // Generate the api links, in a format that would point to the appropriate API tab
  // @ts-ignore there are no failed builds at this point
  const baseBuilds = builds.filter((build) => build?.value?.filename?.indexOf('mui-base') >= 0);

  if (baseBuilds.length >= 0) {
    baseBuilds.forEach((build) => {
      // @ts-ignore
      const { value } = build;
      const { name, demos } = value;
      // find a potential # in the pathname
      const hashIdx = demos.length > 0 ? demos[0].demoPathname.indexOf('#') : -1;

      let pathname = null;

      if (demos.length > 0) {
        // make sure the pathname doesn't contain #
        pathname = hashIdx >= 0 ? demos[0].demoPathname.substr(0, hashIdx) : demos[0].demoPathname;
      }

      if (pathname !== null) {
        // add the new apiLink, where pathame is in format of /react-component/components-api
        apiLinks.push({
          pathname: `${pathname}${
            name.startsWith('use') ? 'hooks-api' : 'components-api'
          }/#${kebabCase(name)}`,
          title: name,
        });
      }
    });
  }

  apiLinks.sort((a, b) => (a.title > b.title ? 1 : -1));
  let source = `module.exports = ${JSON.stringify(projectSettings.getApiPages())}`;
  if (apiLinks.length > 0) {
    // @ts-ignore
    source = `module.exports = ${JSON.stringify(apiLinks)}`;
  }

  writePrettifiedFile(apiPagesManifestPath, source);

  projectSettings.onCompleted?.();
  return builds;
}
