---
title: Chatbox foundations in MUI X v9 – building AI‑ready conversations
description: Introducing Chatbox foundations in MUI X v9, powered by the `@mui/x-chat` package family and a streaming-first, AI-ready architecture.
date: 2026-03-16T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
---

In v9, we’re laying the groundwork for **AI‑native conversational experiences**.
The new **Chatbox foundations**, delivered through the `@mui/x-chat` package family, are **early‑stage (draft PR / foundations)** work—but they define the architecture we’ll build on for the long term.

This post introduces:

- The **three‑layer architecture** of `@mui/x-chat`.
- The **Phase 0 foundations** we’re shipping in v9.
- How Chatbox is **AI‑ready by design**, including message parts and streaming.
- A **phased roadmap** and how this fits into the broader v9, AI‑native direction.

For the full picture of the v9 major version across Material UI and MUI X, see the [v9 shared major version overview](/blog/introducing-mui-v9/).

## Table of contents

- [Early-stage status](#early-stage-status)
- [The @mui/x-chat package family](#the-mui-x-chat-package-family-three-layers)
- [Phase 0 foundations](#phase-0-foundations)
- [AI-ready message parts and streaming-first design](#ai-ready-message-parts-and-streaming-first-design)
- [Phased roadmap](#phased-roadmap-and-how-chatbox-fits-the-ai-native-direction)
- [Where to go next](#where-to-go-next)

## Early‑stage status

The Chatbox work is deliberately **early‑stage**:

- The core architecture is being implemented in a **draft PR**.
- APIs and implementation details are expected to **evolve as we gather feedback**.
- The intent is to provide a **solid foundation** that we, and you, can extend—rather than a finished, polished product.

If you’re exploring how to bring **AI chat, tools, and agents** into your product, this is the layer where we want to collaborate and iterate.

## The @mui/x-chat package family: three layers

<!-- feature-media:img Chatbox layers -->

To keep chat experiences both flexible and ergonomic, we’re shipping `@mui/x-chat` as a **three‑layer architecture**:

1. **`@mui/x-chat-headless`**
   - Encapsulates the **core chat logic, state, and side‑effects**, with no assumptions about UI.
   - Manages:
     - Conversations and threads.
     - Messages and message parts.
     - Tool calls and tool results.
     - Streaming state and lifecycle.
   - Ideal if you want to build a **fully custom UI** while reusing a robust, tested chat engine.

2. **`@mui/x-chat-unstyled`**
   - Provides **unstyled, structure‑only components** on top of the headless layer.
   - Focuses on DOM structure, slots, and accessibility, but leaves actual styling to you.
   - Gives you a fast path to wire up your own design system (including non‑Material themes) while benefiting from a consistent component skeleton.

3. **`@mui/x-chat`**
   - The **fully themed Chatbox experience**, integrated with the Material UI design language.
   - Includes sensible defaults for:
     - Layout (conversation panel, input area, sidebars).
     - Message bubbles and system messages.
     - Tool call and result displays.
   - Ideal if you want to **drop in a ready‑to‑use Chatbox**, then progressively customize.

This layered approach mirrors patterns like **Base UI vs themed components** across the ecosystem, while being fine‑tuned for **conversational and AI‑heavy use cases**.

## Phase 0 foundations

The v9 foundations focus on **Phase 0**—the internal building blocks that will support more advanced features later.

### Entity types and normalized store

Chat experiences involve more than just a flat list of messages.
Phase 0 defines **entity types** and a **normalized store** for:

- Conversations and threads.
- Messages and their parts.
- Participants and roles (user, assistant, system, tools).
- Tool invocations and results.

By normalizing this data, we can:

- Avoid unnecessary duplication.
- Make updates performant, even with **long histories**.
- Expose clear selectors for building custom UIs.

### Adapter contract

The Chatbox is designed to integrate with **many different backends** and AI providers.
To make this feasible, Phase 0 defines an **adapter contract** that:

- Specifies **how messages and tool calls flow** between the UI and your backend.
- Decouples the **UI and state management** from:
  - Model providers.
  - Transport mechanisms (HTTP, WebSockets, server‑sent events, etc.).
  - Tooling layers and orchestration logic.

This contract is what allows you to:

- Plug in your own **LLM provider**.
- Integrate with a **custom tools / agents framework**.
- Swap providers without rewriting your UI.

### Selectors and stream processor

The normalized store is paired with a set of **selectors** and a **stream processor**:

- **Selectors** expose:
  - Views over the conversation (e.g., “visible messages in this thread”).
  - Derived state (e.g., “is the assistant currently streaming?”).
  - Aggregated metadata (e.g., “active tools for this conversation”).
- The **stream processor**:
  - Handles **token streams**, **partial results**, and **state transitions** as responses arrive.
  - Coordinates **tool calls**, **tool results**, and **final messages** in a predictable way.

This combination makes it possible to build UIs that are:

- **Streaming‑first**—updating as tokens arrive.
- **Tool‑aware**—reacting to tool call states and results.
- **Easy to test**—because the state changes are well defined and predictable.

### `useChatInstance` hook and tests

At the integration point, Phase 0 includes:

- A **`useChatInstance` hook**:
  - Creates or connects to a chat instance.
  - Wires together the store, stream processor, and adapter.
  - Exposes a clean interface for React components to subscribe to state and dispatch actions.
- A **test suite**:
  - Covers core flows (sending messages, streaming replies, tool calls and results).
  - Ensures the internal model remains stable as we iterate.

This is the hook most apps will touch directly, whether they’re using `@mui/x-chat-headless`, `@mui/x-chat-unstyled`, or the fully themed `@mui/x-chat`.

## AI‑ready message parts and streaming‑first design

From day one, Chatbox is designed to be **AI‑ready**, not just “chat‑like”.

### Message parts for tools, sources, and reasoning

Messages are modeled as **structured entities with distinct parts**, including:

- **Tool calls** – requests for the assistant to invoke a tool (for example, a database query or scheduler action).
- **Tool results** – the outputs of those tool calls, which may be:
  - Displayed to the user.
  - Used internally as context for later messages.
- **Sources** – references to underlying documents, rows, or entities used to answer a question.
- **Reasoning** – optional explanatory text or chains of thought that can be:
  - Shown to the user (when appropriate), or
  - Logged for observability and debugging.
- **File parts** – attachments and references to files used as context or outputs.

By representing these explicitly, we make it easier to:

- Build **transparent UIs** that show what the assistant did and why.
- Implement **tool‑driven workflows** that go beyond pure text.
- Integrate with observability systems for **safety and debugging**.

### Streaming‑first

The Chatbox is also **streaming‑first**:

- Responses are modeled as **streams of tokens and parts**, not single atomic messages.
- UI components can:
  - Render **partial content** as it arrives.
  - Update **progress indicators** or sidebars in real time.
  - React to **tool call initiations** and **tool results** mid‑stream.

This matters especially when Chatbox is used to orchestrate **long‑running operations**, such as:

- Complex Data Grid transformations.
- Multi‑step scheduler operations.
- Cross‑component AI workflows where results arrive in stages.

## Phased roadmap and how Chatbox fits the AI‑native direction

The Chatbox foundations are just **Phase 0**.
Looking ahead, we envision several phases:

1. **Phase 0 – Foundations (v9)**
   - Core entity types, normalized store, selectors, stream processor.
   - `useChatInstance` hook and basic integrations.
   - `@mui/x-chat-headless`, `@mui/x-chat-unstyled`, and initial `@mui/x-chat` building blocks.

2. **Phase 1 – Opinionated Chatbox components**
   - Ready‑to‑use **Chatbox layouts** with:
     - Conversation panel and input area.
     - History, thread switching, and sidepanels.
   - Starter integrations with **Data Grid AI Assistant** and other MUI X components.

3. **Phase 2 – Deep workflow integrations**
   - Opinionated patterns for:
     - “Chat with your data” via Data Grid.
     - “Chat with your schedule” via Scheduler.
     - Hybrid flows that blend **charts, grids, and chat**.
   - Tooling and docs for building **custom agentic workflows** with MUI X.

4. **Phase 3 – Ecosystem patterns and templates**
   - Templates that combine **Chatbox + advanced components + Material UI primitives** into full experiences.
   - Deeper integrations with **Console** and licensing where relevant.

All of this supports the **AI‑native direction** described in the [v9 shared major version overview](/blog/introducing-mui-v9/): components that expose **clear intents and state**, with reusable UI building blocks for AI‑driven workflows.

## Where to go next

- Read the [v9 shared major version overview](/blog/introducing-mui-v9/) for the big‑picture story across Material UI and MUI X.
- Explore how Chatbox relates to other v9 work:
  - [Material UI v9 primitives](/blog/introducing-mui-v9-primitives/)
  - [Data Grid v9 highlights](/blog/introducing-mui-v9-data-grid/)
  - [Charts v9 highlights](/blog/introducing-mui-v9-charts/)
  - [Scheduler alpha overview](/blog/introducing-mui-v9-alpha-scheduler/)
- To follow along as Chatbox matures, keep an eye on the **Chatbox docs**:
  - [Chatbox overview](/x/react-chat/)

