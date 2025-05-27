# Model Context Protocol (MCP) for MUI

<p class="description">Support the development of the open-source projects of the MUI organization through crowdfunding.</p>

## Introduction & What is MCP?

The Model Context Protocol (MCP) is a new open standard for connecting AI assistants to real, trusted sources of documentation and code. For Material UI users, this means you get answers that are accurate, up-to-date, and directly reference the official docs.

Want to learn more about MCP? See the [official MCP documentation](https://modelcontextprotocol.io/introduction).

## Why the Model Context Protocol?

Traditional AI coding assistants often hallucinate links, cite non-existent documentation, or provide answers that are hard to verify. MCP solves these problems by:

- Quoting **real, direct sources** in answers
- Linking to **actual documentation** _(no more 404s)_
- Making responses easier to follow and trust

## Getting Started: Installation & Setup

The MCP is available as a separate package and runs locally, communicate via your AI client using the `stdio` transport. Use the following command to test the MCP in the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector):

```bash
npx -y @mui/mcp-docs@latest
```

### Cursor/ Windsurf/Others

1. Open MCP configuration in Windsurf
2. Add a new stdio MCP:

```json
"mcp": {
  "servers": {
    "mui-mcp-docs": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@mui/mcp-docs@latest"]
    }
  }
}

### VS Code

Apart from the setup provided above, VS Code requires the following conditions to be met for the MCP to be usable:

1. Enable Agent mode (if required by your extension)
2. Add the following to your `settings.json`:
```
