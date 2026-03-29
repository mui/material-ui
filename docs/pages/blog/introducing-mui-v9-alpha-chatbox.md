---
title: MUI X v9 Chat (alpha)
description: MUI X Chat in v9 (alpha): headless, unstyled, and themed packages, adapters and streaming, and how it fits AI-native workflows across the stack.
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

In v9 we’re laying the groundwork for AI‑native conversational experiences in MUI X.
The `@mui/x-chat` family (documented as [MUI X Chat](/x/react-chat/)) starts from headless hooks and state, adds structural unstyled primitives, and tops out in a Material UI‑styled `ChatBox` that picks up `palette`, typography, spacing, and shape from your theme.

This post is an orientation, not an API reference: how the layers stack, why adapters and streams sit at the center, and how early work connects to Data Grid, Scheduler, and the v9 overview.
For ecosystem context, see [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).

## Table of contents

- [Early but usable](#early-but-usable)
- [Package layers](#package-layers)
- [State, adapters, and streaming](#state-adapters-and-streaming)
- [Message parts beyond plain text](#message-parts-beyond-plain-text)
- [Roadmap sketch](#roadmap-sketch)
- [Where to go next](#where-to-go-next)

## Early but usable

MUI X Chat is deliberately early: install from the docs, follow Quickstart and examples, and expect hooks and slot props to evolve while we harden contracts.
The goal is a foundation you can theme, swap providers on, and extend, not a frozen UI kit on day one.

If you’re experimenting with tools, agents, or assistant UX beside your product surface, this is the layer where we want feedback and real integrations.

## Package layers

<!-- feature-media:img Chatbox layers -->

Dependencies flow downhill: `@mui/x-chat` (themed) builds on `@mui/x-chat/unstyled` (slots and DOM structure, no Material `styled()` output), which builds on `@mui/x-chat/headless` (store, streaming, adapters, hooks).

Headless is for teams that already own layout and styling.
Unstyled fits Tailwind and non‑Material systems.
Themed `@mui/x-chat` is the fastest “drop in `ChatBox`, wire an adapter” path, including examples where `sendMessage` returns a streaming body such as `ReadableStream<ChatMessageChunk>`.

That mirrors how we think about Base UI vs themed Material UI elsewhere, tuned for long conversations and tool‑heavy flows.

Installation, `ChatBox`, examples, headless and unstyled guides, customization, and API reference are on [MUI X Chat](/x/react-chat/).

## State, adapters, and streaming

Phase‑0 work centers on entity types and a normalized store so conversations, threads, messages, participants, tool calls, and results don’t turn into duplicated, fragile state as histories grow.

An adapter sits between that state and your backend: same UI whether you call OpenAI, an in‑house model, HTTP, WebSockets, or SSE, and the same boundary when orchestration lives outside React.

A stream processor coordinates token streams, partial parts, tool starts, and tool results so the UI can stay streaming‑first: partial text, progress, and mid‑stream tool UI without ad‑hoc race handling in every app.

Headless hooks wire store, processor, and adapter together; tests lock those flows so we can iterate without regressing send/stream/tool behavior across tiers.

## Message parts beyond plain text

Modeling messages as parts (tool calls, tool results, sources, optional reasoning traces, file attachments) keeps assistant UX inspectable: users and developers can see what ran, on what data, and in what order.

Streaming treats responses as sequences of parts and tokens, not one immutable blob, which matters when Chat works alongside Data Grid transforms, Scheduler mutations, or other multi‑step automations where results arrive gradually.

## Roadmap sketch

Phase 0 (v9) ships the foundation: packages, headless hooks, themed `ChatBox`, docs and examples, and the adapter contract that makes provider swaps realistic.

Phase 1 moves toward opinionated layouts (conversation surface, input, history, threads) and starter wiring toward other MUI X components.

Phase 2 pushes workflow patterns (“chat with your data”, “chat with your schedule”, mixed chart and grid flows) with docs that show how to build agentic experiences without reinventing glue code.

Phase 3 looks at templates and ecosystem combinations (advanced components + Material UI primitives + Console where licensing applies), always aligned with the v9 idea that components expose clear intents and reversible state.

Timings will follow adoption and release cadence; watch [MUI X releases](https://github.com/mui/mui-x/releases) for packaged changes.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Data Grid](/blog/introducing-mui-v9-data-grid/)
- [Charts](/blog/introducing-mui-v9-charts/)
- [Tree View and Date and Time Pickers](/blog/introducing-mui-v9-tree-view-and-pickers/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)

To share feedback or report issues, use [How to get involved](/blog/introducing-mui-v9/#how-to-get-involved) on the v9 overview.
