---
title: Tebra
description: How Tebra modernized their reporting capabilities with MUI X Data Grid.
image: 'https://deploy-preview-46416--material-ui.netlify.app/static/branding/companies/tebra.svg'
date: 2022-06-08T00:00:00.000Z
tags: ['MUI X']
manualCard: true
---

<style>
  #blog-responsive-image {
    height: 230px;
    @media (max-width: 600px) {
      height: 167px;
    }
  }
</style>

<img
    id="blog-responsive-image"
    src="/static/branding/companies/tebra.svg"
    alt=""
    style="width: 40%; height: auto; object-fit: cover; object-position: top left; border: 0px; margin-left: 0; margin-bottom: 20px; display: block; text-align: left;"
  />

## Overview

[Tebra](https://tebra.com/) is a healthcare technology company that has been serving the healthcare industry for over a decade.
As their platform evolved over the years, they accumulated a mix of legacy technologies including JSPs, Angular, and various React implementations, creating inconsistent user experiences across their platform.

<span class="only-light-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: #f5f5f7; border-left: 6px solid var(--muidocs-palette-primary-main); border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  The feature of searching in the grid is absolutely a killer for us... everything loads to the client the data sits in memory inside the grid and now you can search anything and the search is so fast and amazing.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #555; font-weight: 500;">
    – <a href="https://www.linkedin.com/in/ronen-akiva-2881303/" target="_blank" rel="noopener">Ronen Akiva</a>, Senior Director of Engineering
  </span>
</blockquote>
</span>
<span class="only-dark-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: var(--muidocs-palette-background-default); border-left: 6px solid var(--muidocs-palette-primary-main); color: #f5f5f7; border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  The feature of searching in the grid is absolutely a killer for us... everything loads to the client the data sits in memory inside the grid and now you can search anything and the search is so fast and amazing.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #bbb; font-weight: 500;">
    – <a href="https://www.linkedin.com/in/ronen-akiva-2881303/" target="_blank" rel="noopener">Ronen Akiva</a>, Senior Director of Engineering
  </span>
</blockquote>
</span>

Ronen leads the teams responsible for embedding MUI components into their design system and managing billing and payments infrastructure.
With nearly six years at the company, Ronen spearheaded the initiative to modernize Tebra's reporting capabilities and create a unified design system.

## Challenge

Tebra faced several critical challenges with their legacy reporting system:

- **Fragmented technology stack**: The platform consisted of multiple technology generations - JSPs, Angular, and different React implementations - all trying to maintain the same look and feel but with vastly different behaviors and codebases.
- **Static, limited reporting**: Their existing reports were largely static HTML pages or basic grids with minimal functionality. Users couldn't filter, search, sort, or group data effectively, capabilities that had been standard in desktop applications 15 years prior.
- **Maintenance overhead**: Implementing new features across multiple technology stacks required separate implementations in different places, increasing development costs and introducing more bugs.
- **Inconsistent user experience**: Users encountered dramatically different experiences depending on which part of the platform they accessed - some screens felt "old and antiquated" while others offered modern functionality.
- **Performance constraints**: The team had to implement complex throttling and pagination systems to manage large datasets, creating architectural constraints that limited reporting capabilities.

## Solution

Tebra adopted **MUI X Data Grid** as the cornerstone of their modernization strategy and solved the above challenges by:

- **Unified design system**: They built a comprehensive design system using MUI components, with the Data Grid serving as the foundation for all reporting experiences across the platform.

- **Advanced grid capabilities**: The team implemented sophisticated features including:
  - Dynamic filtering with custom external filter components
  - Fast client-side search across up to 10,000 rows
  - Grouping and summarization functionality
  - Customizable row density for improved readability
  - Advanced sorting capabilities

- **Architectural optimization**: They moved from database-heavy pagination to client-side data loading, enabling lightning-fast search and filtering while maintaining performance through strategic data limits.

- **Custom enhancements**: Tebra extended the base functionality with:
  - Reusable filter components with business logic
  - Adjustable row height controls for user preference
  - Integration with their existing style sheets and branding

## Results

The implementation improved the user experience across Tebra's entire ecosystem. Reports evolved from static displays to interactive interfaces that users expect in contemporary applications.
The unified design system enabled teams to migrate legacy experiences seamlessly, speeding up development cycles.
MUI X Data Grid served as a catalyst as the in-built client-side search and improved data loading provided instantaneous search results while maintaining system performance, eliminating the complex throttling mechanisms they had previously relied upon.

Beyond immediate technical benefits, the standardized component library created a foundation for accelerated AI-assisted development workflows.
The architecture is now future-ready for advanced features like lazy loading, which will further simplify handling of larger datasets.
Tebra is actively exploring additional features like Pivot Tables for their upcoming analytics dashboards.

## Developer Experience

**Exceptional Documentation**: Ronen praised MUI's documentation as "phenomenal," enabling teams to test and demo features without writing custom code, and helping sell the component capabilities to non-technical stakeholders.

**Seamless Integration**: Since Tebra was already using the free MUI library, adopting MUI X Data Grid was a natural progression that avoided vendor proliferation.

**Community and Support**: The team values the ongoing relationship with MUI and the ability to influence the product roadmap through feedback and potential feature requests.
