---
title: Toolpad is now in Beta!
description: After working on it for more than a year, Toolpad is now in the next stage. Read more about it in this announcement.
date: 2023-07-03T00:00:00.000Z
authors: ['prakhargupta']
card: true
tags: ['Product', 'News']
---

It's been over a year since we released the first version of Toolpad. Today, we're excited to take the next step on that journey with the release of Toolpad Beta. If you aren't familiar with Toolpad yet, it's an admin panel builder catering to the internal tooling needs of an organization. It's for developers who want to build a functional application quickly. It harnesses the speed of a UI builder for the front-end and closely integrates with your normal development workflow. If this excites you, then read on!

## Why did we decide to build Toolpad?

Toolpad was created to meet the needs of the MUI community. We conducted a few surveys, did our market research, and concluded to make an internal tool builder as it resonates with MUI's mission of 'Building applications fast.'

Internal tools are software applications that are developed and used within an organization. They can be used to automate tasks, manage data, and collaborate with other employees. Internal tools can be a valuable asset for businesses of all sizes, as they can help to improve efficiency, productivity, and communication.

A sub-optimal tool means a waste of time and effort for everyone, maintaining them distracts developers from solving actual business problems. We've all had our fair share of wrestling with lousy internal tools that we hoped we'd never have to use more than once. Lately, customer-side software has moved fast and is now flashy and sleek. It's time for internal tools to see this change.

## What is Toolpad exactly?

Toolpad is an open-source, low-code drag-drop admin builder framework. The primary purpose of Toolpad is to create data-intensive React apps faster. Toolpad simplifies writing back-end logic, connecting to a data source, querying or mutating the data, and deploying an app. It can quickly convert an API, script, or SQL query to a web UI.

Toolpad is not ideal for building static web pages, mobile apps, or customer-facing custom-designed frontends. It's for building admin applications, CRUD interfaces, custom internal tools, and analytics dashboards.

<img alt="Building an application on Toolpad " src="/static/blog/2023-toolpad-beta-announcement/toolpad.png" style="margin-bottom: 16px;" loading="lazy" width="2048" height="1536" />

## Who is Toolpad for?

Before the arrival of Toolpad, MUI primarily catered to the front-end needs of the development process. Our products were mostly useful for React engineers or designers. We saw many full-stack engineers use our advanced components for data-intensive apps. These highly customizable components are well-suited for complex apps but not all apps require the same level of customization: for example, internal tools just need basic theming.

Toolpad is for full-stack and back-end developers. They build/manage/integrate data pipelines, server-side logic, database, microservices, APIs—and know the most about them. Sharing these endpoints and maintaining the internal documentation with the front-end teams is a hassle that lasts forever. Toolpad empowers you to take the next step and build a UI using our drag-and-drop editor.

## What are the top-features available today?

### Use MUI Core and MUI X Pro components

MUI Core provides all modern components; a chosen few are available inside Toolpad. MUI X Pro (Data Grid and Date Picker) components are also available for free in Toolpad.

### Bring your own components

Toolpad supports bringing your [external components](https://mui.com/toolpad/concepts/custom-components/) to the project. Your past effort should not go to waste—we don't believe in a walled garden approach. In the future, we'll also support importing from Storybook and GitHub.

### Bring your own backend

Directly integrate with your node.js backend and have your data available on the page without writing any REST endpoints or fetch logic.

### Write custom functions in your IDE

Toolpad works with your code editor and lets you write [custom functions](https://mui.com/toolpad/concepts/connecting-to-data/#custom-functions). These functions:

- run on the backend.
- return the data that is made available on the page without requiring you to set up any endpoints, or data fetching logic.
- support arguments can be bound directly to page state.
- can be integrate not only with any node module, but also with your backend code, such as prisma models or database connections

### Own your code

Toolpad runs fully locally, all configuration is stored in local files which you can version control, edit and deploy any way you want.

## How is Toolpad different from similar products on the market?

Toolpad follows an open-core approach, meaning that the base version is open source. You can build an unlimited number of apps, and the basic service will be free forever. There exist some amazing tools like Retool, Appsmith, Budibase, Airplane, Interval but only some of them are open source.

Another major area of difference is being only developer focused. As much as we are low-code, we are equally code-friendly. Providing basic functionalities that a developer expects from an open-source tool is non-negotiable for us—we will always prioritize the developer's best interests over all else. With nearly a decade of history building developer tools, we know the long-term benefits of cultivating a close relationship with our community of users.

Lastly, Toolpad is the only product that offers a drag-and-drop UI builder closely integrated with your favourite IDEs like VS Code. Best of both the worlds!

## What's next?

We'll continue to build on the vision that doesn't pull you out of your pro-code workflows, instead we want to nest ourselves in areas where we can meaningfully improve the maintainability or speed of development.

In terms of upcoming features, you can check out our [public roadmap](https://github.com/orgs/mui/projects/9/views/1). Overall, we want to improve the UI building experience, simplify connecting to data sources, add more components, improve SQL writing experience and more.

Come up with a paid plan that offers roles, granular permissions, audit logs, authentication for teams that need support in further scaling and growth.

## How can I use Toolpad?

Toolpad is available as an NPM package and can be installed from [here](https://mui.com/toolpad/getting-started/installation/). You can learn more about Toolpad by visiting the [home page](https://mui.com/toolpad/).

The best places to stay up-to-date about what we're currently working on are [GitHub issues](https://github.com/mui/mui-toolpad) and our public roadmap.

If you have any questions or would like to share feedback, you can directly contact the team at toolpad@mui.com. You can also engage in conversations in our [Discord](https://discord.gg/hHqtMP9Ckc) server.
