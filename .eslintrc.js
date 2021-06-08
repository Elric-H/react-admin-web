module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'react/prop-types': 0,
    'compat/compat': 0,
    'jsx-a11y/anchor-is-valid': 'off',
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
  },
};
