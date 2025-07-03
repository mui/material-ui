# Model Context Protocol (MCP) for MUI

<p class="description">Gain access to the official Material UI docs and code examples in your AI client.</p>

## What is MCP?

The Model Context Protocol (MCP) is a new open standard for connecting AI assistants to real, trusted sources of documentation and code.
For Material UI users, this means you get answers that are accurate, up-to-date, and directly reference the official docs.

Want to learn more about MCP?
See the [official MCP documentation](https://modelcontextprotocol.io/introduction).

## Why MCP?

Popular AI coding assistants are excellent at providing answers, especially to straightforward questions.
However, when faced with a deeper, more complex question which requires understanding concepts from multiple parts of the documentation, they often hallucinate links, cite non-existent documentation, or provide answers that are hard to verify.
MCP solves these problems by:

- Quoting **real, direct sources** in answers
- Linking to **actual documentation** - no imaginary links that lead to 404s
- Using component code from officially published registries

## Installation & Setup

The MCP is available as a separate package that runs locally and communicates via your AI client using the `stdio` transport.
Use the following command to test the MCP in the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector):

```bash
npx -y @mui/mcp@latest
```

### Cursor/Windsurf

1. Open MCP configuration in Windsurf ("Settings" -> "MCP" -> "Add Server")
2. Add a new MCP:

```json
"mcp": {
  "servers": {
    "mui-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@mui/mcp@latest"]
    }
  }
}
```

### VS Code

Apart from the setup provided above, VS Code requires the following conditions to be met for the MCP to be usable:

1. Enable Agent mode (for Copilot Chat)
2. Add the following to your `settings.json`:

```json
  "chat.mcp.enabled": true,
  "chat.mcp.discovery.enabled": true
```

### JetBrains IDEs

1. Open MCP configuration in your JetBrains IDE ("Settings" -> "Tools" -> "AI Assistant" -> "Model Context Protocol (MCP)")
2. Add a new MCP:

- Name: MUI MCP
- Command: `npx`
- Arguments: `-y @mui/mcp@latest`

3. Press "OK" and "Apply".

### Zed

There are two ways you can add the Material UI MCP server in Zed:

#### As an extension

Go to the Extensions page either via the keybinding `cmd-shift-x`/`ctrl-shift-x` (macOS/Linux), or via the Command Palette, searching for `zed: extensions`.

Then, search for "MUI MCP" and install the extension.
No configuration is required to have this server working, but you can optionally add the `preferred_theme` and `component_filter` fields.

#### As a custom server

This approach is essentially the same as adding it in VS Code and forks.

1. Search for `agent: add context server` in the Command Palette.
2. Add the following JSON in the modal:

```json
{
  "mui-mcp-server": {
    "command": {
      "path": "npx",
      "args": ["-y", "@mui/mcp@latest"]
      "env": {}
    }
  }
}
```

## Example

Here's a real-world comparison of how MCP helps you get answers that are accurate, up-to-date, and directly reference the official docs.

### Question

> I am using DataGrid Pro version and I am trying to use pinning and reordering in the same time.
> I don't want the reorder handler to disappear when I have the row pinned.
> I am using it for functionality with pagination so I can:
>
> Pin a row to the top,
>
> Move the pagination forwards or backwards,
>
> Drag into the new page row to change order on the different pages with a pinned row,
>
> However, when I'm trying to use GRID_REORDER_COL_DEF the renderCell is returning null for pinned rows.

### AI clients without MCP

> This is a known limitation in MUI DataGrid Pro: when a row is pinned, the default row reorder handler
> (provided by GRID_REORDER_COL_DEF) is hidden for pinned rows, and the renderCell returns null.
> This is by design to prevent reordering of pinned rows, but your use case requires both features together.
>
> To achieve your goal (showing the reorder handler for pinned rows and allowing cross-page drag-and-drop with pinned rows), you need to:
>
> Override the default renderCell of the reorder column to always render the reorder handler, even for pinned rows.
> Implement custom logic to handle reordering, especially across pages and with pinned rows.
>
> Here's how you can proceed:
>
> Create a custom reorder column definition
> Use your own renderCell that always renders the reorder handler, regardless of pinning
> You can copy the default reorder handler from MUI source and adjust the logic as needed
> Add this custom column to your columns array, replacing the default reorder column
> Handle the row reordering logic in your onRowOrderChange callback
>
> Would you like a code example for a custom reorder column that works with pinned rows?
> If yes, please specify if you're using TypeScript or JavaScript, and if you want the handler to be visible for both pinned and unpinned rows

### AI clients with MCP

> You are encountering this issue because, according to the official MUI DataGrid Pro documentation, row pinning and row reordering are not fully compatible.
> Specifically:
>
> > "Pinned rows do not support the following features: selection, row grouping, tree data, row reordering, master detail..."
>
> When a row is pinned, the reorder handler (the drag handle) is intentionally not rendered for those rows.
> This is why GRID_REORDER_COL_DEF's renderCell returns null for pinned rows.
>
> **Workarounds and Recommendations:**
> You can still reorder non-pinned rows as usual
> For pinned rows, implement a custom UI/UX (action buttons like "Move Up/Down" or "Unpin and Move" for example)
> To move a pinned row to a different page, first unpin it, reorder, then pin it again
>
> **Summary:**
> This is a current limitation of MUI DataGrid Pro.
> The reorder handler is hidden for pinned rows by design.
> You can upvote or comment on the related GitHub issues to help prioritize this feature.
>
> If you want a code example for a custom workaround, let me know!

<hr/>

The MCP-aided response is more coherent and directly references the documentation, building trust and enabling the user to be able to discover further details.

## FAQ

### I've installed the MCP, but there are errors in connection

Try and use the MCP inspector to debug the connection.
To do so, run:

```bash
 npx @modelcontextprotocol/inspector
```

1. Wait till the terminal says: "🔍 MCP Inspector is up and running at http://127.0.0.1:6274".

1. Navigate to this URL in your browser

1. Choose "Transport type" as "Stdio"

1. Set the "Command" to `npx`

1. Set the "Arguments" to `y @mui/mcp@latest`

1. Click on "Connect"

1. Wait for the connection to be established

The MCP should successfully connect, and you should see a list of available tools.
If not, check the logs in the terminal where you ran the MCP inspector for more details

### I've installed the MCP, but it is not being used when I ask questions

If you've installed the MCP and enabled all the necessary settings, but it is not being used when you ask questions, you might need to supply rules to your AI client to use the MCP.

Most editors allow you to specify rules for AI assistants to follow.
Depending on the editor, the rules file might be specified in different locations.
For VS Code, for instance, add the following to `.github/instructions/mui.md`:

```text
## Use the mui-mcp server to answer any MUI questions --

- 1. call the "useMuiDocs" tool to fetch the docs of the package relevant in the question
- 2. call the "fetchDocs" tool to fetch any additional docs if needed using ONLY the URLs
     present in the returned content.
- 3. repeat steps 1-2 until you have fetched all relevant docs for the given question
- 4. use the fetched content to answer the question
```

You can use the same content as rules for whichever AI-enabled IDE you're using.
