import { builtinPresets } from 'unimport';

export default {
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    [
      'unplugin-auto-import/nuxt',
      {
        dts: true,
        eslintrc: {
          enabled: true, // .eslintrc.js
        },
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          {
            from: 'vue',
            // https://github.com/unjs/unimport/blob/main/src/presets/vue.ts#L76
            imports: Array.from(builtinPresets.vue.imports).filter(
              (module) =>
                ![
                  // useMeta requires @nuxtjs/composition-api.defineComponent
                  // https://composition-api.nuxtjs.org/packages/useMeta
                  'defineComponent',

                  // exclude vue 3 apis
                  // https://github.com/unjs/unimport/blob/main/src/presets/vue.ts#L84
                  'onRenderTracked',
                  'onRenderTriggered',
                  'resolveComponent',
                  'useCssVars',
                ].includes(module)
            ),
          },
          {
            from: '@nuxtjs/composition-api',
            imports: [
              'defineComponent',
              'defineNuxtMiddleware',
              'defineNuxtPlugin',
              'globalPlugin',
              'onGlobalSetup',
              'reqRef',
              'reqSsrRef',
              'setMetaPlugin',
              'setSSRContext',
              'shallowSsrRef',
              'ssrPromise',
              'ssrRef',
              'useAsync',
              'useContext',
              'useFetch',
              'useMeta',
              'useRoute',
              'useRouter',
              'useStatic',
              'useStore',
              'withContext',
              'wrapProperty',

              // vue 2.7 not exists
              // https://github.com/nuxt-community/composition-api/blob/main/src/runtime/composables/vue.ts#L137
              // "warn",
              // "createApp",
              // "createRef",
              // "defineAsyncComponent",
              // "isRaw",
            ],
          },
        ],
        vueTemplate: true,
        cache: true,
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { loaders }) {
      config.plugins = [
        ...config.plugins,
        require('unplugin-vue-macros/webpack')({}),
      ];

      // devtools sourcemap
      // config.output.devtoolModuleFilenameTemplate = (info) => {
      //   if (
      //     info.resourcePath.match(/\.vue$/) &&
      //     !info.identifier.match(/type=script/)
      //   ) {
      //     return `webpack-generated:///${info.resourcePath}?${info.hash}`;
      //   } else {
      //     return `sources:///${info.resourcePath}`;
      //   }
      // };
      // config.output.devtoolFallbackModuleFilenameTemplate =
      //   'webpack:///[resource-path]?[hash]';
    },
  },
};
