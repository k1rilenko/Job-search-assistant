import { formatFiles, GeneratorCallback, installPackagesTask, joinPathFragments, Tree } from '@nx/devkit';
import { addTsConfigPath, initGenerator as jsInitGenerator } from '@nx/js';

import { CreateLibraryGeneratorSchema } from './schema';

import { logShowProjectCommand } from '@nx/devkit/src/utils/log-show-project-command';
import { assertNotUsingTsSolutionSetup } from '@nx/js/src/utils/typescript/ts-solution-setup';
import { addStandaloneComponent } from './libs/add-standalone-component';
import { normalizeOptions } from './libs/normalize-options';
import { createFiles } from './libs/create-files';
import { addProject } from './libs/add-project';

export async function createLibraryGenerator(tree: Tree, schema: CreateLibraryGeneratorSchema): Promise<GeneratorCallback> {
  assertNotUsingTsSolutionSetup(tree, 'angular', 'custom-library');

  const options = await normalizeOptions(tree, schema);
  const { libraryOptions } = options;

  await jsInitGenerator(tree, {
    ...libraryOptions,
    js: false,
    skipFormat: true,
  });

  const project = addProject(tree, libraryOptions);

  createFiles(tree, options, project);

  await addStandaloneComponent(tree, options);

  addTsConfigPath(tree, libraryOptions.importPath, [joinPathFragments(libraryOptions.projectRoot, 'index.ts')]);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
    logShowProjectCommand(libraryOptions.name);
  };
}

export default createLibraryGenerator;
