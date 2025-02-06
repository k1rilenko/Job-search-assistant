## Описание

Этот генератор предназначен для создания библиотеки с определенной структурой. После выполнения генератора создается следующая файловая структура:

```
libFolder
├── index.ts
├── project.json
├── lib.component.html
├── lib.component.*ss
└── lib.component.ts
```

## Структура создаваемых файлов

- **`index.ts`**: файл экспорта, автоматически генерирует пути для экспорта.
- **`project.json`**: конфигурационный файл для библиотеки.
- **`lib.component.html`**: HTML-шаблон компонента.
- **`lib.component.*ss`**: файл стилей компонента.
- **`lib.component.ts`**: файл TypeScript с реализацией компонента.

## Конфигурация

Для удобства использования нужно задать значения по умолчанию некоторым свойствам в файле `schema.json`

- `properties.prefix.default` - префикс для компонентов | (_app_ по умолчанию)
- `properties.style.default` - расширение стилевого файла компонента | (_scss_ по умолчанию)
- `properties.changeDetection.default` - механизм обнаружения изменений компонента | (_OnPush_ по умолчанию)

## Установка

- Если нет локальных плагинов - нужно выполнить следующие команды

```
nx add @nx/plugin
nx g @nx/plugin:plugin tools/{my-plugin-name}
```

- Используйте Nx CLI для создания исходных файлов, необходимых для вашего генератора (для удобства назовите его `create-library`)

```
nx generate @nx/plugin:generator tools/{my-plugin-name}/src/generators/{my-generator-name}
```

- после Выполнения предыдущего действия получится следующая структура

```
root-folder/
  ...
  ├── tools/
  │   ├── {my-plugin-name}
  │   │   ├── src
  │   │   │   ├── generators
  │   │   │   |   └── {my-generator-name}/
  │   │   │   |   |    ├── generator.spec.ts
  │   │   │   |   |    ├── generator.ts
  │   │   │   |   |    ├── schema.d.ts
  │   │   │   |   |    └── schema.json
  ├── nx.json
  ├── package.json
  └── tsconfig.base.json
```

- поместите файлы скаченного генератора в папку {my-generator-name} (`create-library`) и перезапустите IDE.
  В Nx console должен появится генератор
