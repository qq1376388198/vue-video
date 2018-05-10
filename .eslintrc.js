// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    /*// enable arrow use
    'arrow-parens': ['off'], // 箭头函数用小括号括起来
    // enable unused vars
    'no-unused-vars': ['off'], // 不能有声明后未被使用的变量或参数
    // enable reassign param
    'no-param-reassign': ['off'],  // 禁止给参数重新赋值
    'spaced-comment': 2, // 注释风格要不要有空格什么的
    'semi': [2, 'always'], // 语句强制分号结尾
    'space-in-parens': [0, 'never'], // 小括号里面要不要有空格
    'eqeqeq': 2, // 必须使用全等
    'no-var': 2, // 禁用var，用let和const代替
    'no-use-before-define': 2, // 未定义前不能使用
    "no-unreachable": 0, //不能有无法执行的代码
    'no-plusplus': 2, // 禁止使用++，--
    'no-tabs': 0, // no-tabs
    'no-multiple-empty-lines': [1, { 'max': 2 }], // 空行最多不能超过2行*/
    'indent': 0, // 2空格缩进
    'space-before-function-paren': ['error', 'never'], // 函数名字后边不能有空格
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
