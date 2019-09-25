module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // 'airbnb',
    // 'plugin:@typescript-eslint/recommended',
    // 'prettier',
    // 'prettier/@typescript-eslint',
    // 'prettier/react',
    'react-app',
  ],
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': 2,
    'react/prop-types': 0, // not useful with Typescript
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
};
