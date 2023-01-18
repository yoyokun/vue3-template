const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        dirs: ['src/components'],
        // valid file extensions for components.
        extensions: ['vue'],
        // search for subdirectories
        deep: true,
        // resolvers for custom components
        resolvers: [],
        // generate `components.d.ts` global declarations,
        // also accepts a path for custom filename
        // default: `true` if package typescript is installed
        dts: true,
        // Allow subdirectories as namespace prefix for components.
        directoryAsNamespace: false,
        // Collapse same prefixes (camel-sensitive) of folders and components
        // to prevent duplication inside namespaced component name.
        // works when `directoryAsNamespace: true`
        collapseSamePrefixes: false,
        // Subdirectory paths for ignoring namespace prefixes.
        // works when `directoryAsNamespace: true`
        globalNamespaces: [],
        // auto import for directives
        // default: `true` for Vue 3, `false` for Vue 2
        // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
        // To install Babel, run: `npm install -D @babel/parser`
        directives: true,
        // Transform path before resolving
        importPathTransform: v => v,
        // Allow for components to override other components with the same name
        allowOverrides: false,
        // filters for transforming targets
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        // Vue version of project. It will detect automatically if not specified.
        // Acceptable value: 2 | 2.7 | 3
        version: 3
      }),
      require('unplugin-auto-import/webpack')({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          // custom
          {
            '@vueuse/core': [
              // named imports
              'useMouse', // import { useMouse } from '@vueuse/core',
              // alias
              ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
            ],
            'axios': [
              // default imports
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
            '[package-name]': [
              '[import-names]',
              // alias
              ['[from]', '[alias]'],
            ],
          },
        ],
        // Enable auto import by filename for default module exports under directories
        defaultExportByFilename: false,
        // Auto import for module exports under directories
        // by default it only scan one level of modules under the directory
        dirs: [
          // './hooks',
          // './composables' // only root modules
          // './composables/**', // all nested modules
          // ...
        ],
        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: true,
        // Auto import inside Vue template
        // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
        vueTemplate: false,
        // Custom resolvers, compatible with `unplugin-vue-components`
        // see https://github.com/antfu/unplugin-auto-import/pull/23/
        resolvers: [
          /* ... */
        ],
        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ],
  },
})
