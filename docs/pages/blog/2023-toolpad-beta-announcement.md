---
title: Introducing Toolpad: MUI's low-code admin builder
description: Assemble admin panels and internal tools faster than ever before with Toolpad—now in beta.
date: 2023-07-03T00:00:00.000Z
authors: ['prakhargupta']
card: true
tags: ['Product', 'News']
---

It's been over a year since we released the first version of Toolpad. Today, we're excited to take the next step on that journey with the release of Toolpad Beta. If you aren't familiar with Toolpad yet, it's an admin panel builder catering to the internal tooling needs of an organization, designed for developers who want to build a functional application quickly. It harnesses the speed of a UI builder for the front-end and closely integrates into your back-end. If this excites you, then read on!

## Why did we decide to build Toolpad?

Toolpad was created to meet the needs of the MUI community. As a result of surveys we conducted, and market research we undertook, we decided to develop an internal tool builder because the idea resonates with MUI's mission of empowering developers to build app faster and more efficiently.

Internal tools are software applications that are developed and used within an organization itself. They can automate tasks, manage data, and help foster collaboration. Internal tools are a valuable asset for businesses of all sizes, as they help to improve efficiency, productivity, and communication.

We've all had our fair share of wrestling with lousy internal tools that we hoped we'd never have to use more than once. A sub-optimal tool means a waste of time and effort for everyone. Maintaining them distracts developers from solving actual business problems. In recent years, customer-facing software has moved quickly and is now flashy and sleek. It's time for internal tools to get this same upgrade.

## What is Toolpad exactly?

Toolpad is an open-source, low-code, drag-and-drop admin builder. The primary purpose of Toolpad is to create data-intensive React apps faster. Toolpad simplifies building UI, writing back-end logic, connecting to a data source, querying and mutating data. It can quickly convert an API, script, or SQL query into a web UI.

Toolpad is not ideal for building static web pages, mobile apps, or customer-facing custom-designed front-ends. It's for building admin applications, CRUD interfaces, custom internal tools, and analytics dashboards.

<img alt="Building an application on Toolpad " src="/static/blog/2023-toolpad-beta-announcement/toolpad.png" style="margin-bottom: 16px;" loading="lazy" width="2048" height="1536" />

## Who is Toolpad for?

Before the arrival of Toolpad, MUI primarily catered to the front-end needs of the development process. Our products were mostly useful for React engineers or designers, but we saw many full-stack engineers use our advanced components for data-intensive apps. These highly customizable components are well-suited for complex apps, but not all apps require the same level of customization: for example, internal tools just need basic theming.

Toolpad is for you if you're a full-stack or back-end developers who builds, manages, and integrate data pipelines, server-side logic, databases, microservices, and APIs—and knows the most about them. Sharing these endpoints with and maintaining the internal documentation for the front-end teams is a hassle that lasts forever. Toolpad empowers you to take the next step and build the UI you need using our drag-and-drop editor, without losing any part of your normal development workflow.

## What are the main features available today?

### 1. Drag-and-drop UI builder

Easily create user interfaces by dragging and dropping pre-built components onto the canvas. Utilize constraints to speed up the building process.

### 2. Query builder UI

A Postman-like query builder allows you to integrate any REST API quickly. A binding editor, which supports Javascript, allows you to wire query response directly to the components.

### 3. Bring your own components

Toolpad can import [external React components](https://mui.com/toolpad/concepts/custom-components/), ready to be used in its visual designer. Your past effort shouldn't go to waste and you shouldn't be limited by the stock component suite.

### 4. Bring your own back-end

Directly integrate with your Node.js back-end and have your data available on the page without writing any REST endpoints or fetch logic. Need that prisma model on the page? Expose it through a serverless function and Toolpad does the rest.

### 5. Own your code

Toolpad runs completely locally. You're not stuck with an online code editor or a suboptimal GitHub integration. All configuration is stored in local files which you can version-control, edit, and deploy in any way you want.

<img alt="Building an application on Toolpad " src="/static/blog/2023-toolpad-beta-announcement/code.png" style="margin-bottom: 16px;" loading="lazy" width="2048" height="1536" />

### 6. A catalogue of components powered by Material UI

MUI Core provides all modern components; a chosen few are currently available inside Toolpad, and we're adding more all the time. MUI X Pro (Data Grid and Date Picker) components are also available for free in Toolpad.

<img alt="Building an application on Toolpad " src="/static/blog/2023-toolpad-beta-announcement/library.png" style="margin-bottom: 16px;" loading="lazy" width="2048" height="1536" />

## How is Toolpad different from similar products on the market?

In this space, there are 2 categories of products. Category 1: Retool, Appsmith, Budibase and the likes. While these are great tools, they don't integrate with developer's local IDE, neither do they offer a good git version control mechanism. Providing features that could have been coded on a need basis makes the software heavy and reports of slowness from end users is common.

The other category includes airplane.dev, Interval and others. They also allow building internal tools but don't support a drag-and-drop UI builder. The components are required to be coded using their APIs and that comes with some learning curve.

Toolpad is solely focused on professional developers. As much as we are low-code, we are equally code-friendly. Providing the basic functionality that you expect from an open-source tool is non-negotiable for us—we will always prioritize your best interests over all else. With nearly a decade of experience building developer tools, we understand the long-term benefits of cultivating a close relationship with our community of users.

Lastly, Toolpad is the only product that offers a drag-and-drop UI builder closely integrated with your favorite IDE, such as VSCode. It's the best of both the worlds!

## How can I use Toolpad?

Toolpad is available as an NPM package. Follow the [Installation guide](https://mui.com/toolpad/getting-started/installation/) in the docs to get started. You can learn more about Toolpad by visiting the [home page](https://mui.com/toolpad/).

## What's next?

We plan to continue to iterate on our vision of helping you as a developer to increase the speed and efficiency of your workflow. We want to optimize for the biggest pains that you face when building admin apps. Your input is crucial to helping us shape the roadmap from here.

The best places to stay up-to-date about what we're currently working on are [GitHub issues](https://github.com/mui/mui-toolpad) and our [public roadmap](https://github.com/orgs/mui/projects/9/views/1).

If you have any questions or would like to share feedback, you can directly contact the team at toolpad@mui.com or reach us on [Twitter](https://twitter.com/MUI_Toolpad). You can also engage in conversation in our [Discord](https://discord.gg/hHqtMP9Ckc) server.

If you'd like an in-depth demo and to discuss your use case, please feel free to [schedule a meeting with me on Calendly](https://calendly.com/prakhar-mui).
