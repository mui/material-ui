# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Always use `pnpm --filter <pkg> <cmd>` to run pnpm commands in package context.

- **Build**: `pnpm release:build` (builds all packages excluding docs). `pnpm --filter <pkg> build` for individual packages.
- **Lint**: `pnpm eslint` (with caching), `pnpm prettier` (changed files)
- **Test**: `pnpm test` (runs ESLint, TypeScript check, and unit tests)
- **Single Test**: `pnpm tc [test name]` (runs a specific test)
- **TypeScript**: `pnpm typescript` (type checking)

## Code Style

- Use Prettier for formatting (100 char width, single quotes, trailing commas)
- Prefer `function Component()` over `React.FC`
- Name render functions in `React.forwardRef` for devtools
- Follow TypeScript conventions in TYPESCRIPT_CONVENTION.md
- Component props interfaces should be exported with name `{ComponentName}Props`
- For styled components, follow naming pattern `{ComponentName}{Slot}`
- Use proper JSDoc comments for public API components

## Imports

- Import from workspace with direct imports (e.g., from '@mui/material')
- Import test utilities from @mui/internal-test-utils

## Whitelisted Domains

- mui.com
- github.com
- npmjs.com
- react.dev
- developer.mozilla.org
