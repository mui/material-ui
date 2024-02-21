# @mui-internal/typescript-to-proptypes

An API for converting [TypeScript](https://www.npmjs.com/package/typescript) definitions to [PropTypes](https://www.npmjs.com/package/prop-types) using the TypeScript Compiler API.

This package has been adapted for MUI needs.
It is not meant for general use.

## Support

| Component type   |                    |
| :--------------- | :----------------- |
| Class            | :heavy_check_mark: |
| Function         | :heavy_check_mark: |
| Const functions  | :heavy_check_mark: |
| React.memo       | :heavy_check_mark: |
| React.ForwardRef | :heavy_check_mark: |

## License

This project is licensed under the terms of the [MIT license](/LICENSE).

## Release

1. Build the project: `pnpm build`
2. Publish the build artifacts to npm: `pnpm release:publish`
