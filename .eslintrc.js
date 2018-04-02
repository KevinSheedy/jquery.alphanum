module.exports = {
  'env': {
    'browser': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  'globals': {
    'jQuery': true,
    '$': true,
    'QUnit': true,
    'describe': true,
    'require': true,
    'process': true,
    'module': true,
    'it': true
  }
};
