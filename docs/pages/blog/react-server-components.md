---
title: Understanding React Server Components
description: Learn how RSCs relate to client-side and server-side rendering, and how component libraries like Material UI are adapting.
date: 2023-11-30T00:00:00.000Z
authors: ['samuelsycamore']
card: false
tags: ['Product']
---

## A new paradigm for React

## Client-side rendering

The "traditional" Single Page App (SPA) model.
The server sends a blank HTML file over to the client along with the JS bundle necessary for the app's functionality.
Once the JS has been downloaded, then React can render the app on the client.
UX leaves something to be desired, and it's not great for SEO—there's nothing on the page for search engines to crawl.

## Server-side rendering

SSR differs from CSR in that the page is rendered on the server before it gets sent over to the client, so the page arrives fully formed (though non-interactive) when it arrives in the user's browser.
Once it reaches the client and the JS has been downloaded, then React does its own rendering of the DOM tree and _hydrates_ its interactive pieces onto the page.
Better for UX: users have content to look at before interactivity kicks in.
And better for SEO: there's content on the page for search engines to crawl.

"Standard" SSR is "on-demand"—the content is rendered when the user makes the request.

### Static site generation

SSG is an alternative style of SSR that differs from the standard model in that the pages are rendered well ahead of time—when the app is compiled.
This method enables users to view pages almost instantly upon requesting them, because the server doesn't have to do any rendering at all before sending it over to the client.

### Incremental static regeneration

ISR is yet another form of SSR, exclusive to Next.js.
It essentially combines "standard" SSR and SSG: the first time a user requests a page, the server renders it ("on-demand"), then _caches_ that render and send it over to the client.
The next time a user requests that page, the server will send over the earlier cached version (more or less equivalent to SSG).
To prevent the cache from getting too stale, the developer sets a _revalidation_ time to let the app know when to toss out the old version and render a new one for the next users who visit.

## What are React Server Components?

### Benefits of React Server Components

## How MUI is adapting
