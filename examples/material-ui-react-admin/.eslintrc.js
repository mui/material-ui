module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
