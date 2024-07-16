import { mkdirSync } from 'fs';
import path from 'path';
import * as fse from 'fs-extra';
import findComponents from './utils/findComponents';
import findHooks from './utils/findHooks';
import { writePrettifiedFile } from './buildApiUtils';
import generateComponentApi from './ApiBuilders/ComponentApiBuilder';
import generateHookApi from './ApiBuilders/HookApiBuilder';
import {
  CreateTypeScriptProjectOptions,
  TypeScriptProjectBuilder,
  createTypeScriptProjectBuilder,
} from './utils/createTypeScriptProject';
import { ProjectSettings } from './ProjectSettings';
import { ComponentReactApi } from './types/ApiBuilder.types';

async function removeOutdatedApiDocsTranslations(
  components: readonly ComponentReactApi[],
  apiDocsTranslationsDirectories: string[],
): Promise<void> {
  const componentDirectories = new Set<string>();
  const projectFiles = await Promise.all(
    apiDocsTranslationsDirectories.map(async (directory) => ({
      directory: path.resolve(directory),
      files: await fse.readdir(directory),
    })),
  );

  await Promise.all(
    projectFiles.map(async ({ directory, files }) => {
      await Promise.all(
        files.map(async (filename) => {
          const filepath = path.join(directory, filename);
          const stats = await fse.stat(filepath);
          if (stats.isDirectory()) {
            componentDirectories.add(filepath);
          }
        }),
      );
    }),
  );

  const currentComponentDirectories = new Set(
    components
      .map((component) => {
        if (component.apiDocsTranslationFolder) {
          return path.resolve(component.apiDocsTranslationFolder);
        }
        console.warn(`Component ${component.name} did not generate an API translation file.`);
        return null;
      })
      .filter((filename): filename is string => filename !== null),
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

export async function buildApi(projectsSettings: ProjectSettings[], grep: RegExp | null = null) {
  const allTypeScriptProjects = projectsSettings
    .flatMap((setting) => setting.typeScriptProjects)
    .reduce(
      (acc, project) => {
        acc[project.name] = project;
        return acc;
      },
      {} as Record<string, CreateTypeScriptProjectOptions>,
    );

  const buildTypeScriptProject = createTypeScriptProjectBuilder(allTypeScriptProjects);

  let allBuilds: Array<PromiseSettledResult<ComponentReactApi | null | never[]>> = [];
  for (let i = 0; i < projectsSettings.length; i += 1) {
    const setting = projectsSettings[i];
    // eslint-disable-next-line no-await-in-loop
    const projectBuilds = await buildSingleProject(setting, buildTypeScriptProject, grep);

    // @ts-ignore ignore hooks builds for now
    allBuilds = [...allBuilds, ...projectBuilds];
  }

  if (grep === null) {
    const componentApis = allBuilds
      .filter((build): build is PromiseFulfilledResult<ComponentReactApi> => {
        return build.status === 'fulfilled' && build.value !== null && !Array.isArray(build.value);
      })
      .map((build) => {
        return build.value;
      });

    const apiTranslationFolders = projectsSettings.map(
      (setting) => setting.translationPagesDirectory,
    );
    await removeOutdatedApiDocsTranslations(componentApis, apiTranslationFolders);
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
      if (projectSettings.skipHook?.(hook.filename)) {
        return false;
      }
      if (grep === null) {
        return true;
      }
      return grep.test(hook.filename);
    });

    const componentsBuilds = projectComponents.map(async (component) => {
      try {
        const componentInfo = projectSettings.getComponentInfo(component.filename);

        mkdirSync(componentInfo.apiPagesDirectory, { mode: 0o777, recursive: true });

        return await generateComponentApi(componentInfo, project, projectSettings);
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

  let source = `module.exports = ${JSON.stringify(projectSettings.getApiPages())}`;
  if (projectSettings.onWritingManifestFile) {
    source = projectSettings.onWritingManifestFile(builds, source);
  }

  await writePrettifiedFile(apiPagesManifestPath, source);

  await projectSettings.onCompleted?.();
  return builds;
}
