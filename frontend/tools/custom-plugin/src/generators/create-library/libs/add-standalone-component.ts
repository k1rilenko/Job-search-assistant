import { joinPathFragments, type Tree } from '@nx/devkit';

import type { NormalizedSchema } from './normalized-schema';
import { componentGenerator } from '@nx/angular/generators';

export async function addStandaloneComponent(tree: Tree, { libraryOptions, componentOptions }: NormalizedSchema) {
  await componentGenerator(tree, {
    ...componentOptions,
    name: componentOptions.name,
    path: joinPathFragments(libraryOptions.projectRoot, componentOptions.name),
    standalone: true,
    export: true,
    skipFormat: true,
  });
}
