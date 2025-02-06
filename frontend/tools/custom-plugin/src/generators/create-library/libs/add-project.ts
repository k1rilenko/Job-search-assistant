import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';

import type { NormalizedSchema } from './normalized-schema';
import { AngularProjectConfiguration } from '@nx/angular/src/utils/types';

export function addProject(tree: Tree, libraryOptions: NormalizedSchema['libraryOptions']) {
  const project: AngularProjectConfiguration = {
    name: `${libraryOptions.projectPrefix}/${libraryOptions.selectedTag}-${libraryOptions.name}`,
    root: libraryOptions.projectRoot,
    sourceRoot: libraryOptions.projectRoot,
    prefix: libraryOptions.prefix,
    tags: libraryOptions.parsedTags,
    projectType: 'library',
    targets: {},
  };

  addProjectConfiguration(tree, libraryOptions.name, project);
  return project;
}
