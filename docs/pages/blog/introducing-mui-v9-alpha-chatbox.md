---
title: 'MUI X v9 Chat (alpha)'
description: 'MUI X Chat in v9 (alpha): ChatBox, adapters and streaming, and how it fits AI-native workflows across the stack.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

In v9 we're laying the groundwork for AI-native conversational experiences in MUI X.
MUI X Chat (documented as [MUI X Chat](/x/react-chat/)) centers on `ChatBox`, with adapters and streaming designed for real product workflows.

This post is an orientation, not an API reference: how the layers stack, why adapters and streams sit at the center, and how early work connects to Data Grid, Scheduler, and the v9 overview.
For ecosystem context, see [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).

## Table of contents

- [Quick start](#quick-start)
- [What alpha means](#what-alpha-means)
- [When to expect the stable](#when-to-expect-the-stable)
- [Chat showcase](#chat-showcase)
- [State, adapters, and streaming](#state-adapters-and-streaming)
- [Message parts beyond plain text](#message-parts-beyond-plain-text)
- [Roadmap](#roadmap)
- [Where to go next](#where-to-go-next)

## Quick start

Install the package and render your first chat surface in minutes: start from [MUI X Chat](/x/react-chat/) and follow Quickstart for the first working `ChatBox`.
Then wire your adapter and streaming path so users see tokens and tool output progressively as responses arrive.

## What alpha means

MUI X Chat is deliberately early: install from the docs, follow Quickstart and examples, and expect hooks and slot props to evolve while we harden contracts.
The goal is a foundation you can theme, swap providers on, and extend, not a frozen UI kit on day one.

If you're experimenting with tools, agents, or assistant UX beside your product surface, this is the layer where we want feedback and real integrations.

## When to expect the stable

We're targeting a stable Chat release in early June, based on the feedback and adoption patterns we see during alpha.
That target is expectation-setting, not a quality trade-off: we ship stable only when the product is ready.

Keeping Chat in alpha is intentional, because this is the phase where we can still make breaking changes before the next major while the API surface is being stress-tested.

## Chat showcase

<figure>
  <video
    autoplay
    muted
    loop
    playsinline
    width="1600"
    height="900"
    controls
    style="border: 0; width: 100%; max-width: 800px; height: auto"
  >
    <source
      src="/static/blog/introducing-mui-v9/introducing-mui-v9-alpha-chatbox/stub_ghost_chat-showcase.mov"
      type="video/quicktime"
    />
  </video>
  <figcaption>ChatBox showcase in MUI X v9 alpha.</figcaption>
</figure>

## State, adapters, and streaming

ChatBox work centers on entity types and a normalized store so conversations, threads, messages, participants, tool calls, and results don't turn into duplicated, fragile state as histories grow.

An adapter sits between that state and your backend: same UI whether you call OpenAI, an in‑house model, HTTP, WebSockets, or SSE, and the same boundary when orchestration lives outside React.

A stream processor coordinates token streams, partial parts, tool starts, and tool results so the UI can stay streaming‑first: partial text, progress, and mid‑stream tool UI without ad‑hoc race handling in every app.

Core chat hooks wire store, processor, and adapter together; tests lock those flows so we can iterate without regressing send/stream/tool behavior across tiers.

## Message parts beyond plain text

Modeling messages as parts (tool calls, tool results, sources, optional reasoning traces, file attachments) keeps assistant UX inspectable: users and developers can see what ran, on what data, and in what order.

Streaming treats responses as sequences of parts and tokens, not one immutable blob, which matters when Chat works alongside Data Grid transforms, Scheduler mutations, or other multi‑step automations where results arrive gradually.

## Roadmap

Phase 0-1 (v9) is delivered as one milestone: package APIs, core hooks, themed `ChatBox`, docs and examples, opinionated layouts (conversation surface, input, history, threads), and first-class wiring to other MUI X components.

Phase 2 expands workflow patterns ("chat with your data", "chat with your schedule", mixed chart and grid flows), with production-ready docs that help teams ship without reinventing glue code.

Phase 3 ships templates and tighter ecosystem combinations (advanced components + Material UI primitives + Console where licensing applies), aligned with the v9 direction of clear intents and reversible state.

We will roll these milestones through the v9 cycle in regular releases; follow [MUI X releases](https://github.com/mui/mui-x/releases) for packaged updates.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Data Grid](/blog/introducing-mui-v9-data-grid/)
- [Charts](/blog/introducing-mui-v9-charts/)
- [Tree View and Date and Time Pickers](/blog/introducing-mui-v9-tree-view-and-pickers/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)

To share feedback or report issues, visit [mui/mui-x on GitHub](https://github.com/mui/mui-x).
