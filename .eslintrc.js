// fix eslint config, can't highlight ;, tabs and etc.
module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
    }
};
