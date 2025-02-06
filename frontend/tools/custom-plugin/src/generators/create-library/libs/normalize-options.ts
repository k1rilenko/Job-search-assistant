import { names, Tree } from '@nx/devkit';
import { determineProjectNameAndRootOptions, ensureProjectName } from '@nx/devkit/src/generators/project-name-and-root-utils';
import { Linter } from '@nx/eslint';
import { CreateLibraryGeneratorSchema } from '../schema';
import { NormalizedSchema } from './normalized-schema';

export async function normalizeOptions(host: Tree, schema: CreateLibraryGeneratorSchema): Promise<NormalizedSchema> {
  schema.standalone = schema.standalone ?? true;
  // Create a schema with populated default values
  const options: CreateLibraryGeneratorSchema = {
    buildable: false,
    linter: Linter.None,
    publishable: false,
    simpleName: false,
    skipFormat: false,
    unitTestRunner: 'none',
    compilationMode: 'partial',
    skipModule: schema.skipModule || schema.standalone,
    ...schema,
  };

  await ensureProjectName(host, options, 'library');
  const {
    projectName,
    names: projectNames,
    projectRoot,
    importPath,
  } = await determineProjectNameAndRootOptions(host, {
    name: options.name,
    projectType: 'library',
    directory: options.directory,
    importPath: options.importPath,
  });

  const fileName = projectNames.projectFileName;

  const moduleName = `${names(fileName).className}Module`;
  const parsedTags = options.tags ? options.tags.split(',').map(tag => `type:${tag}`.trim()) : [];
  const modulePath = `${projectRoot}/src/lib/${fileName}.module.ts`;

  const ngCliSchematicLibRoot = projectName;
  const allNormalizedOptions = {
    ...options,
    linter: options.linter ?? Linter.EsLint,
    unitTestRunner: 'none',
    prefix: options.prefix ?? 'lib',
    name: projectName,
    projectRoot,
    entryFile: 'index',
    moduleName,
    modulePath,
    parsedTags,
    fileName,
    importPath,
    ngCliSchematicLibRoot,
    skipTests: true,
    standaloneComponentName: `${names(projectNames.projectSimpleName).className}Component`,
    selectedTag: schema.tags,
    projectPrefix: importPath.split('/')[0],
  };

  allNormalizedOptions.importPath = `${allNormalizedOptions.projectPrefix}/${allNormalizedOptions.selectedTag}-${allNormalizedOptions.name}`;

  const {
    displayBlock,
    inlineStyle,
    inlineTemplate,
    viewEncapsulation,
    changeDetection,
    style,
    skipTests,
    selector,
    skipSelector,
    flat,
    ...libraryOptions
  } = allNormalizedOptions;

  return {
    libraryOptions,
    componentOptions: {
      name: fileName,
      standalone: libraryOptions.standalone,
      displayBlock,
      inlineStyle,
      inlineTemplate,
      viewEncapsulation,
      changeDetection,
      style,
      skipTests,
      selector,
      skipSelector,
      flat,
    },
  };
}
