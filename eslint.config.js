import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
  pluginJs.configs.recommended,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
    // подсказка для eslint, что мы открываем проект в браузере- объект'document' бывает только в браузере при этом необходимо сделать import globals from 'globals'
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
  },
]
