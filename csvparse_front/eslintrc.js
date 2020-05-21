module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    parser: "babel-eslint",
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 2016,
        sourceType: "module"
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        // 关闭console提示( Unexpected console statement)
        "no-console": "off",
        // 关闭定义了，但没调用(** is defind but never used)
        "no-unused-vars": "off"
    }
};