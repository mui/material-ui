# nextFonts

Font loading for the documentation site. `<body>` carries every `className` from `fontClasses`
to activate the faces; the families are applied per element by the branding theme.

Roboto comes from `next/font/google` and is already subset to latin by the loader. General Sans
and IBM Plex Sans are local files, and `next/font/local` does no subsetting, so the `.woff2`
files in `fonts/` are subset ahead of time.

## Regenerating the local fonts

The files in `fonts/` are subsets of the upstream releases, cut to the ranges the docs render.
Greek, Cyrillic and the IPA/modifier blocks are dropped: the site ships an English locale only
and nothing renders them.

```sh
pip install fonttools brotli

pyftsubset <upstream>.woff2 \
  --output-file=fonts/<name>.woff2 \
  --flavor=woff2 \
  --layout-features='*' \
  --name-IDs='*' \
  --unicodes='U+0000-00FF,U+0100-024F,U+0E3F,U+2000-206F,U+20A0-20BF,U+2100-214F,U+2190-21FF,U+2200-22FF,U+2300-23FF,U+2700-27BF,U+FEFF,U+FFFD'
```

`--layout-features='*'` keeps kerning and ligatures, so advance widths are unchanged.

Ranges worth knowing about, because a narrower set silently falls back per glyph:

| range         | needed for                                                          |
| ------------- | ------------------------------------------------------------------- |
| `U+0100-024F` | accented names, including `ș` in `docs/data/about/teamMembers.json` |
| `U+2000-206F` | curly quotes, en and em dashes, the ellipsis, the bullet            |
| `U+2190-21FF` | `→`, which appears a few hundred times in the docs prose            |
| `U+2200-22FF` | `∞`, `≈`                                                            |
| `U+2300-23FF` | `⌘` in the keyboard shortcuts                                       |
| `U+2700-27BF` | `✓`, `❌` in the support and migration tables                       |
| `U+0E3F`      | `฿` in a text field demo                                            |

After changing the ranges, check that no codepoint the docs render was dropped: collect the
codepoints appearing under `docs/data`, `docs/pages`, `docs/public`, `docs/src` and
`packages-internal/core-docs/src`, and confirm none of them is in the upstream file's `cmap`
but missing from the subset.
