import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslintPluginPrettierRecommended,
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // ---tslint 规则集参考：https://typescript-eslint.io/rules---
    '@typescript-eslint/no-explicit-any': 'warn', // 允许使用any类型，但是警告（默认即使警告，可以不用声明）
    '@typescript-eslint/no-var-requires': 'warn', // 允许使用require，但是警告(默认不允许)
    '@typescript-eslint/no-empty-function': 'off', // 允许空方法，因为可能是做单例限制构造or被注解修饰的空方法（默认为error）
    '@typescript-eslint/ban-ts-comment': 'off', // 允许@ts- 指令的使用，如@ts-nocheck（默认不允许使用）
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许 非空断言操作符（默认为不允许）
    // '@typescript-eslint/explicit-module-boundary-types': 'off'  // 函数必须定义参数类型和返回类型，默认即是关闭校验
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off',
  },
);
