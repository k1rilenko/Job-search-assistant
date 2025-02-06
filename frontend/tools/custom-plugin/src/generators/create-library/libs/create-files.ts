import { Tree, generateFiles, joinPathFragments, names, offsetFromRoot } from '@nx/devkit';
import { getRootTsConfigFileName } from '@nx/js';

import type { NormalizedSchema } from './normalized-schema';
import { AngularProjectConfiguration } from '@nx/angular/src/utils/types';

export function createFiles(tree: Tree, options: NormalizedSchema, project: AngularProjectConfiguration) {
  const rootOffset = offsetFromRoot(options.libraryOptions.projectRoot);
  const libNames = names(options.libraryOptions.fileName);
  const pathToComponent = options.libraryOptions.fileName;

  const substitutions = {
    libName: options.libraryOptions.name,
    libFileName: options.libraryOptions.fileName,
    libClassName: libNames.className,
    libPropertyName: libNames.propertyName,
    unitTesting: 'none',
    rootTsConfig: joinPathFragments(rootOffset, getRootTsConfigFileName(tree)),
    skipModule: options.libraryOptions.skipModule,
    projectRoot: options.libraryOptions.projectRoot,
    routing: options.libraryOptions.routing,
    pathToComponent,
    importPath: options.libraryOptions.importPath,
    rootOffset,
    angularPeerDepVersion: `latest`,
    disableModernClassFieldsBehavior: false,
    tpl: '',
  };

  generateFiles(tree, joinPathFragments(__dirname, '../files/standalone-components'), options.libraryOptions.projectRoot, substitutions);
}
