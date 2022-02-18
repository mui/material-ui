---
title: 2021 MUI Developer Survey results
description: Results for our yearly developer survey, 2021 edition.
date: 2022-02-22T00:00:00.000Z
authors: ['danilo-leal', 'samuelsycamore', 'oliviertassinari']
tags: ['Developer survey']
---

Keeping up with the tradition, a few months ago we opened the 2021 MUI Developer Survey.
Your feedback helps us to build better products, and we can't thank you enough for being a part of our community.
1,591 of you responded to this year's survey, and we take your input very seriously.
Here's what we've learned about your needs after poring over the results.

Just like the previous iterations, the survey was chopped into three sections: ["Your needs"](#your-needs), ["Your product"](#your-product), and ["About you"](#about-you).

## Your needs

### How would you feel if you could no longer use MUI?

Over 93% of you would be disappointed if you could no longer use MUI (a sum of _"Very disappointed"_ and _“Somewhat disappointed”_).
That's in keeping with 94% of you who felt the same way when we asked this question in 2019 and 2020.
We'll continue to do our best to keep you satisfied over the long term!

<img src="/static/blog/2021-survey/1.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

<p class="blog-description">1567 out of 1589 answered</p>

Interestingly, the percentage who would be _"Very disappointed"_ to stop using MUI fell by 10%, while those who would be _"Not disappointed"_ grew by 1%.
Those who chose the latter option were asked to explain why.
Here are the biggest reasons we observed:

**The number of available alternatives**

Lately, with every new sunrise, there's a new UI component library.
Because they aim to solve the same problems, these libraries often arrive at solutions that are very similar to one another.
The establishment of common industrywide patterns makes it that much more difficult to stand out from the crowd.
We're working hard to expand outward from our core products in order to provide you with tools that our competitors can't match.

**The introduction of a paid product**

A big challenge with open-source is that the proportion of value captured by maintainers is close to zero.
The MIT licensed model enabled a lot of growth but it naturally has reached a limit.
In order to push our mission as much as we believe it's possible, we needed to introduce a way to capture more value.
[Open-core](https://en.wikipedia.org/wiki/Open-core_model) allows us to still offer an MIT licensed (free) version of the X components while charging for additional features that require more attention (including support).

It’s still the early days of MUI X, though.
We introduced it at the end of 2020 and have been iterating not only on the components but on the model itself.

We still have a lot more ground to cover — only ~0.1% of our developer community has been convinced to upgrade to the Pro plan so far.
Whether or not you've taken the plunge, we'd love to hear your thoughts about this.
And if you want to understand more about our view of the MIT/open-source landscape, check our [Stewardship page](https://mui-org.notion.site/Stewardship-542a2226043d4f4a96dfb429d16cf5bd).

**The breaking changes made in v5**

Our most recent release, MUI Core v5, introduced some important breaking changes.
The main problem we wanted to tackle was customizability: unlocking more styling options without compromising on performance.

This new styling solution still has a ways to go in terms of maturity, and there's no denying that it requires a considerable amount of work to migrate.
For our part, we still have a lot of work to do to help you make the most of these new features in v5, and we welcome your feedback.

What can we do to help you succeed? If you have any ideas or suggestions, you’re always welcome to share your thoughts by opening an issue on our repository.

### How likely is it that you would recommend MUI to a friend or colleague?

This year we observed a decrease in Net Promoter Score (NPS): from 62 in 2020 to 46 in 2021.
56.4% of you were Promoters this year, down almost 6 percentage points from last year (62.2%).
We're still in a good place — an NPS score between 30 and 70 is considered great.
But we definitely have much more to do to achieve an excellent score.

<img src="/static/blog/2021-survey/2.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Detractors: 10.88%, Neutrals: 32.69%, Promoters: 56.43%, Overall NPS: 46.
Scale: -100 to 0 needs improvements, 0 to 30 is good, 30 to 70 is great, and 70 to 100 is excellent." />

<p class="blog-description">1563 out of 1589 answered</p>

### What is the main benefit you get from using MUI?

<img src="/static/blog/2021-survey/3.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="This question results in 2019 - Design: 248; Time: 193; DX: 128; Components: 89; Customizability: 53; Documentation: 25; Accessibility: 5; Typescript: 5; Community support: 4; This question results in 2021 - Time: 597; Design: 407; Components: 309; DX: 306; Customizability: 181; Documentation: 57; Community support: 26; Accessibility: 24; Performance: 17" />

<p class="blog-description">1422 out of 1589 answered this question in 2021</p>

Here's what you liked the most about the product in 2021:

- **Community (x2.9):** While appreciation for the community grew by 290%, the community itself doubled in size over that same time frame.
  It looks like we're witnessing a network effect: with twice as many users, we got three times more value from the community.
- **Accessibility (x2.2):** The community has definitely noticed the work we have put in to make our components more accessible.
  Special thanks to Sebastian Silbermann [(@eps1lon)](https://github.com/eps1lon) for his continued help!
- **Customizability (x1.6):** Developers seem to be appreciating the new capabilities introduced in v5.
  That said, we recognize that there is still more work to be done here, given the number of requests we've gotten to better solve this problem.
- **Components (x1.6):** We'll keep adding new components to the library as long as you continue to appreciate them this much!
  - Component quality (x1.0): You know that we set the bar very high for the quality of our components.
    That can be challenge as we continue to grow, because we expect nothing but the best from our team.
    Thankfully, this result shows that our new members have done an excellent job maintaining our standards.
- **Time (x1.4):** This is an interesting one, because it's not an issue that we specifically addressed.
  Could this just be a result of the growing pressure in the market to build faster? Or because we somehow made this value proposition more noticeable? It could also be related to the next item.
- **Developer experience (x1.1):**
  - Consistency (x1.75): We didn’t work on this dimension, and yet it grew.
    It's reasonable to assume that because we have more components than ever before, developers have started to notice how much more consistent their work is when they use MUI.
  - Ease of use (x1.0): This remains unchanged.
    Could it be because ease of use is mostly defined by the React API (hooks), or is it because we haven't made any major API changes to optimize for ease of use? There could be a lot of work here for our new developer experience team.

And what has decreased:

- **Design (x0.75):** We suffered from not bringing on a designer sooner.
  - Material Design (x0.4): Its selling power is clearly fading.
  - Look & feel (x1.17): This is surprising.
    It seems to be a transfer effect: people who previously cared more about Material Design now care more about the outcome than the spec itself.
    <br/>
    <br/>

<details>
  <summary>Click to see the breakdown of categories.</summary>

<table>
  <tr><th style="width: 40px;">597</th><th style="width: 700px;">time</th><tr>
  <tr><th>597</th><th>design</th><tr>
  <tr><td>148</td><td>design - look & feel</td><tr>
  <tr><td>122</td><td>design - look & feel+</td><tr>
  <tr><td>73</td><td>design - consistency</td><tr>
  <tr><td>73</td><td>design - Material Design</td><tr>
  <tr><td>6</td><td>design - ?</td><tr>
  <tr><td>4</td><td>design - easy</td><tr>
  <tr><td>2</td><td>design - responsiveness</td><tr>
  <tr><td>1</td><td>design - time</td><tr>
  <tr><th>309</th><th>components</th><tr>
  <tr><td>173</td><td>components - quantity</td><tr>
  <tr><td>124</td><td>components - quality</td><tr>
  <tr><td>5</td><td>components - advanced</td><tr>
  <tr><td>3</td><td>components - data grid</td><tr>
  <tr><td>2</td><td>components - ?</td><tr>
  <tr><td>1</td><td>components - autocomplete</td><tr>
  <tr><td>1</td><td>components - base/unstyled</td><tr>
  <tr><th>306</th><th>DX</th><tr>
  <tr><td>221</td><td>DX - easy to use</td><tr>
  <tr><td>49</td><td>DX - consistency</td><tr>
  <tr><td>32</td><td>DX - API</td><tr>
  <tr><td>4</td><td>DX - ?</td><tr>
  <tr><th>181</th><th>customizability</th><tr>
  <tr><th>57</th><th>docs</th><tr>
  <tr><td>39</td><td>docs - ?</td><tr>
  <tr><td>17</td><td>docs - quality</td><tr>
  <tr><td>1</td><td>docs - quantity</td><tr>
  <tr><th>26</th><th>community</th><tr>
  <tr><th>24</th><th>accessibility</th><tr>
  <tr><th>17</th><th>performance</th><tr>
  <tr><td>15</td><td>performance - runtime</td><tr>
  <tr><td>1</td><td>performance - bundle size</td><tr>
  <tr><td>1</td><td>performance - ?</td><tr>
  <tr><th>9</th><th>community support</th><tr>
  <tr><th>5</th><th>icons</th><tr>
  <tr><th>3</th><th>typescript</th><tr>
  <tr><th>2</th><th>animations</th><tr>
</table>
</details>

### Please rate how much you agree or disagree with the following statements

<img src="/static/blog/2021-survey/4.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="I can find most of the components I need (Strongly agree: 45.5%, Agree: 45.9%, Neutral: 6.2%, Disagree: 1.5%, Strongly Disagree 0.8%); I can easily customize the components to match the desired design (Strongly agree: 23.4%, Agree: 46.1%, Neutral: 18.6%, Disagree: 9%, Strongly Disagree 2.9%); I can find the answers to most of my questions in the documentation (Strongly agree: 24.1%, Agree: 50.1%, Neutral: 16.3%, Disagree: 7.6%, Strongly Disagree 1.9%); I find the library's performance to be great (Strongly agree: 26.4%, Agree: 44.3%, Neutral: 22.6%, Disagree: 4.7%, Strongly Disagree 2%); Whenever I needed to get help, I received helpful responses, StackOverflow or GitHub (Strongly agree: 20.9%, Agree: 36.7%, Neutral: 36%, Disagree: 4.6%, Strongly Disagree 1.8%)" />

<p class="blog-description">1534 out of 1589 answered</p>

It's definitely a good thing to have a general sense of agreement to most of the statements.
However, there's a considerably big gap between _Strongly agree_ and _Agree_ for all but the first statement, which showcases that we need to continue pushing for even more quality in each of these dimensions (customizability, customization, performance, and support).

### What are your most important criteria for choosing a UI library?

<img src="/static/blog/2021-survey/5.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Ranked list: 1. The design - look and feel; 2. Customizability; 3. Documentation quality; 4. Comprehensiveness; 5. Performance; 6. Popularity; 7. Accessibility; 8. Offered support and help; 9. Bundle size" />

<p class="blog-description">1500 out of 1589 answered - Check <a href="https://www.typeform.com/help/a/ranking-question-360052767651/">Typeform's documentation</a> to understand ranking average calculations</p>

This year we experimented with using Typeform to run the survey, which allows respondents to rank their choices.
This could've given us a richer perspective than we've been able to capture in the past, but in the end the results weren't too different from last year.

Design (look and feel) remains the most important criterion for choosing UI libraries, and customization and documentation quality are still there in the top 3.
The notable difference this year seems to be performance climbing its way up, as it has been ranked as the fifth most important aspect.

### What else can we do to improve MUI for you?

<img src="/static/blog/2021-survey/6.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Word cloud of what we can do to improve MUI" />

<p class="blog-description">1007 out of 1589 answered this question in 2021</p>

Here are the most recurring topics for improvement:

- **More components:** We continue to see requests for more advanced components such as charts, forms, and calendars, to name a few.
- **More examples:** Many of the existing learning resources out there are now outdated following the v5 upgrade, so we have a lot of work to do to show you how to make the most of our products.
- **Provide more themes:** Even with the launch of Material v3, Material Design is seen as outdated by many.
  That's why we're working on a second design system that will offer the same high standard of quality as Material, but with an alternative design direction.
- **Fewer breaking changes:** MUI Core v5 definitely introduced some important breaking changes, especially because of the new styling solution.
  Rest assured that we don’t expect to release any major updates this year—in fact, we aim to keep majors at least 12 months apart from each other.
- **Improve customization:** Common requests include making customization easier, providing more examples of common use-cases (like font-family and primary/secondary colors), and improving to theme capabilities.
  Even with the popularity of Emotion and styled-components, there continues to be an enormous need to facilitate customization.

Got ideas for improvements? Please share them with us! Here's how to make sure that your requests get top priority:

- When you create an issue to request features or components in the MUI Core or X repositories, we'll label it as `Waiting for upvotes`.
  The more votes your issue receives, the higher a priority it will become—so make sure to structure, research, and justify your request so it resonates with other community members.
- When requesting a new component, make sure to benchmark existing implementations of it in the wild so we can see what works and what we could better.
- Try to explain the problem you're having as clearly as possible — it's often the case that we already have a component to solve it.
- If you're requesting easier customization, make sure to demonstrate the desired outcome, and explain where you're having trouble in as much detail as you can.
  These requests often highlight opportunities for us to improve our documentation.

## Your product

### What were you primarily using before MUI?

<img src="/static/blog/2021-survey/7.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bootstrap: 40.6%; Started with MUI: 37.4%; Tailwind:: 4.8%; Ant Design: 4.8%; Angular Material: 4%; Semantic-UI: 4%; Other: 3.8%; Chakra UI: 0.7%" />

<p class="blog-description">1389 of 1589 answered</p>

These results are not too different from last year, with the exception that far fewer developers reported using custom systems before MUI.
It's very encouraging to know that so many of you are building your products with MUI right from the start!

### Are you using any of these in addition to MUI?

<img src="/static/blog/2021-survey/8.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Nope, just MUI: 70.7%; Tailwind: 10.3%; Bootstrap: 9.8%; Ant Design: 4%; Semantic-UI: 1.7%; Other: 1.6%; Chakra UI: 1.2%; Angular Material: 0.8%" />

<p class="blog-description">1468 out of 1589 answered</p>

We're glad to see that MUI largely covers all of your needs for a component UI library—this is a major priority for us.

### Who are you building for?

<img src="/static/blog/2021-survey/9.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="For the company I work at: 65.6%; For my personal side project: 20.8%; For a client: 12.9%; Other: 0.7%" />

<p class="blog-description">1523 out of 1589 answered</p>

When compared with last year's results, client work and personal projects have swapped places this year.
Maybe v5 got developers interested enough to try it on their own sites and apps? It's interesting to see, in any case.

### Who do you collaborate most with?

<img src="/static/blog/2021-survey/10.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Other developers: 67.2%; Designers: 34.3%; Product managers: 29.2%; No one, it's just me: 28.9%; Other: 0.9%" />

<p class="blog-description">1527 out of 1589 answered</p>

This is a new question in our annual survey, and the results highlight the fact that our documentation is not just for developers.
It's crucial for our docs—and even the code itself—to be easily understood by designers, product managers, and other less technical team members who may be stakeholders in engineering projects.

### How many web applications did you or your team deliver using MUI this year?

<img src="/static/blog/2021-survey/11.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="0-1: 494; 2-3: 381; 4-5: 122; 6-10: 26; 10+: 28" />

<p class="blog-description">1051 out of 1589 answered</p>

Efficacy is one of the toughest metrics to track—how much does MUI actually help developers in shipping their products? The number of apps delivered may vary widely between teams and industries, but it's still encouraging to see that we are enabling developers to build much faster than if they started from scratch.

### Which MUI products do you use in your application?

<img src="/static/blog/2021-survey/12.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="MUI Core: MIT licensed foundational components, right now available with Material Design: 96.6%; MUI X: collection of advanced components available under MIT and commercial licenses: 14.7%; MIT License: 126 responses; Commercial licenses: 99 responses" />

<p class="blog-description">1551 out of 1589 answered</p>

It's not surprising to find out that most of our user base is here for MUI Core.
But it is very encouraging for us to see such a high proportion of MUI X users operating with commercial licenses, and we are excited to continue expanding on our paid products for these users.

There are a lot of opportunities in the MUI X space to unpack.
Let's explore a little bit further below.

### Did you know what MUI X was prior to this survey?

<img src="/static/blog/2021-survey/13.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Yes: 54.5%; No: 45.5%" />

<p class="blog-description">1312 out of 1589 answered</p>

A large chunk of you didn’t know what MUI X is prior to the survey, which makes it clear that we still have a lot to do to expand its reach.

### Are you currently using any paid UI component library?

<img src="/static/blog/2021-survey/14.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Yes: 11.8%; No: 88.2%" />

<p class="blog-description">1584 out of 1589 answered</p>

The results are not very different from last year, aside from a slight increase of respondents saying yes.
The majority of respondents don’t use any paid libraries, but those who do are mostly using MUI X, which is great news.

### How can we improve the Data Grid for you?

<img src="/static/blog/2021-survey/15.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Customizability: 21.9%; Cheaper Pro plan: 17.2%; More features: 12.5%; Fix features: 9.4%; Improve docs: 6.3%; Look & feel: 6.3%; Maintain it: 4.7%; Bugs: 3.1%; DX: MUI Core consistency: 3.1%; Performance: 3.1%; Transition: 3.1%; SSR: 1.6%" />

<p class="blog-description">64 out of 1589 answered</p>

- **Customizability:** This is a common topic for us, and it comes up often when discussing MUI X.
  Your feedback tells us that we need to double down on our efforts to make customization easier.
  We also recognize that we are still lacking in some important documentation around theming and headless APIs.
- **Cheaper Pro plan:** We know it can be out of range for a lot of developers, and that's why the free version is already packed with many features.
  MUI mainly develops open-source software, and we deeply value the OSS ethos of freely sharing what we build so that others can use it and improve upon it.
  - The price of our Pro plan positions it as a product intended for use by teams at professional organizations.
    That said, many who left feedback on the price are individuals, so there might be an opportunity to expand our offerings for those not backed by their company.
- **More features & feature fixes:** Collapsable rows, column resizing, and features for ERP apps were some of the features requested.
  And regarding features to fix, the most common requests were pagination with REST APIs, backend filtering, and cell editor.
- **Improvements to the documentation:** The data grid docs could certainly use a major overhaul—we're working on it.
- **Improvements to the look and feel:** Data grid builders want more default design options beyond Material.
  In terms of UX, many developers mention the filtering experience specifically.

### How can we improve the Data Grid Pro for you?

<img src="/static/blog/2021-survey/16.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="More features: 39.8%; Customizability: 20.4%; Fix features: 15.1%; Performance: 5.4%; Cheaper Premium plan: 3.2%; Improve docs: 3.2%; DX - API: 2.2%; LGPL license: 2.2%; More components: 2.2%" />

<p class="blog-description">75 out of 1589 answered</p>

- **More features:** [Grouping](https://mui.com/components/data-grid/group-pivot/#row-grouping) was the most requested feature for the Data Grid Pro, followed by [master detail](https://mui.com/components/data-grid/group-pivot/#master-detail), aggregation, search, [tree data](https://mui.com/components/data-grid/group-pivot/#tree-data), and [column pinning](https://mui.com/components/data-grid/columns/#column-pinning).
  We've already released some of these in the time it took us to analyze the survey results.
  Check the links to see their docs and demos.
  Alternatively, you can follow [our public roadmap](https://github.com/mui/mui-x/projects/1) to see when the others will land.
- **Customizability:** The majority of requests about customizability were asking for possibilities to tweak data grid interactions, which we need to delve into more deeply to better understand.
  Following next were requests for more style customizability, and more documentation on customization.
- **Fix features:** Filtering got first place as the most requested feature to fix on the Data Grid Pro.
  Following next were lazy loading and server-side rendering support.
- **Performance:** Requests about performance were mostly spread out between runtime and bundle size.
  We must admit that we have put almost no effort into optimizing the bundle size so far.
  There are likely some low-hanging fruits there.

### What were you using before the data grid?

<img src="/static/blog/2021-survey/17.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="In house: 29.9%; MUI Table: 17.9%; Nothing: 7.5%; material-table: 6%; material-datatables: 6%; Sencha: 6%; Kendo UI: 4.5%; react-table: 4.5%; Bootstrap Table: 3%; AG Grid: 3%; datatables.net: 3%; JSP: 1.5%" />

<p class="blog-description">149 out of 1589 answered</p>

It's interesting to see that a lot of you are building your own in-house data grids.
We'd love to know more about why your team made this choice, especially because we know exactly how much work it can be.
Also, it's refreshing to see that the standard MUI table components are adequate for many of you.

### What are you building?

<img src="/static/blog/2021-survey/18.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Dashboard admin applications: 26.3%; Enterprise applications: 25.9%; A custom design system: 9.7%; Landing page: 8.1%; E-commerce application: 7.8%; Personal website/portfolio: 6.9%; CMS: 6.1%; Just playing with tech: 4.6%; Blog: 2.8%; Other: 1.4%" />

Enterprise, dashboard applications, and design systems continue to be in the top 3, similar to last year.
What's changed is that developers are now using MUI more to build e-commerce apps and portfolios, which is pretty cool.
We'd love to see them! Feel free to share in the ["Who's using Material UI?" issue](https://github.com/mui/material-ui/issues/22426).

### What delivery mechanisms are you using?

<img src="/static/blog/2021-survey/19.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Single-page app (Create React App, etc): 74.7%; Server-side rendered website (Next.js, Gastby, etc): 20.8%; Desktop app (Electron, etc): 3.5%; Native mobile app (Cordova, etc): 0.6%; Other: 0.4%" />

<p class="blog-description">1509 out of 1589 answered</p>

### What type system are you using?

<img src="/static/blog/2021-survey/20.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="TypeScript: 63.8%; None: 18%; prop-types: 16.6%; Flow: 1.4%; Other: 0.2%" />

<p class="blog-description">1501 out of 1589 answered</p>

These results are very different from last year—Typescript just jumped off and it's now the primary type system used out there.
It seems reasonable to expect more people to start using type systems.

### Which framework are you using, if any?

<img src="/static/blog/2021-survey/21.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Create React App: 62.4%; Next.js: 21.9%; Custom webpack: 10.7%; None: 2.6%; Gatsby: 0.9%; Other: 1.5%" />

<p class="blog-description">1497 out of 1589 answered</p>

This year we saw a considerable bump in Next.js usage, which is not surprising due to its increasing popularity and the advancements it gained in 2021.

### What styling solution are you using?

<img src="/static/blog/2021-survey/22.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="MUI Core v4 (JSS): 45%; Styled components: 37.9%; Emotion: 30.2%; SASS: 20.8%; CSS modules: 18.9%; Vanilla CSS: 17.6%; Tailwind CSS: 9.1%; Stitches: 0.4%; Other: 1.2%" />

<p class="blog-description">1492 out of 1589 answered</p>

As the MUI Core v5 release is relatively recent, we expect to see many developers still using JSS, and there will probably always be some of you who will prefer it.

But the growth of Emotion and styled-components here is noteworthy, because they are what our new styling solution is based on.
This year we'll be focusing on expanding and refining [MUI System](https://mui.com/system/basics/) to further improve upon this new styling solution.

### Did you recently migrate to MUI Core v5?

<img src="/static/blog/2021-survey/23.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Yes: 63.3%; No: 36.7%" />

<p class="blog-description">1546 out of 1589 answered</p>

Though many of you who answered the survey have already migrated, we still have a many more to convince to come along with us.
That'll be a major focus of ours for the year ahead.

### What's the statement that most defines your migration experience?

<img src="/static/blog/2021-survey/24.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="It was tricky but MUI's documentation and resources helped me to get it right: 43%; It was smooth and it is now working fine: 38.5%; It wasn't good, I had many problems and it took me a long time to finish: 14.3%; It was bad and I ended up regretting it: 2.8%; Other: 1.4%" />

<p class="blog-description">930 out of 1589 answered</p>

### What could MUI do to improve the migration experience?

<img src="/static/blog/2021-survey/25.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="General documentation improvements: 43.2%; Automation: 20.7%: Fewer breaking changes: 15.6%; Fewer styling soluiton breaking changes: 8.5%; More tutorials: 5.4%; More styling solution migration tutorial: 4.4%; Migrate Core and X together: 1%" />

<p class="blog-description">472 out of 1589 answered</p>

- **General documentation improvement:** Documentation plays a huge part in defining the developer experience.
  We definitely need to refine our copywriting, provide more examples, and offer more beginner-friendly resources.
- **Automation:** We prepared codemods to help with the v5 migration, given the number of changes.
  This has been met with positive feedback, which is encouraging since it's our first time providing tools to automate the migration process.
  However, it is becoming clear how and when the codemods weren't too effective, so we'll make sure to refine it more.

### Could you share the reason why you haven't migrated yet?

<img src="/static/blog/2021-survey/26.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="No bandwidth: 28.4%; Started in v5: 14.6%; Afraid of amount of breaking changes: 12.3%; Already planned but haven't started: 9.5%; Missing incentive: 8.5%; Not a priority: 7.3%; Don't like new styling solution: 4%; Blocked by 3rd party dependencies: 3.3%; Didn't know about it: 3.3%; Migration is in process: 3.3%; Had regressions, therefore came back to v4: 1.3%; Waiting to become stable: 1.3%" />

<p class="blog-description">441 out of 1589 answered</p>

- **No bandwidth / not a priority / blocked by third-party dependencies:** These reasons can all be lumped together as "forces beyond your control." That's to be expected, but we'll continue to do what we can to persuade your team to migrate, and to make the migration as smooth as possible when you're ready.
- **Afraid of the amount of breaking changes:** That fear is understandable, and we still have a great deal of work to do with documentation, automation, and other resources to help minimize the friction involved in migrating.
- **Don't like the new styling solution:** We believe that’s totally fair.
  Not everyone will buy every move.
  However, as with any open-source project, you always have the opportunity to weigh in and leave your thoughts about any given endeavor we're considering.
  [The issue discussing the chosen styling solution](https://github.com/mui/material-ui/issues/22342) was a big one, and every contribution made a difference in the ultimate decision.
  Please don't hesitate to participate in these open discussions—especially if you see something you disagree with.
- **Didn’t know about it:** That's something we really need to work on! We'll be exploring new ways to engage with our community in the coming months.
- **Regressions - had to go back to v4:** If this happens to you, please open an issue regarding the problems you're facing and we’ll be happy to guide you.

### Have you, or anyone from your team, used any low-code tools for helping with the development of your product?

<img src="/static/blog/2021-survey/27.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Yes: 16.1%; No: 83.9%" />

<p class="blog-description">1542 out of 1589 answered</p>

We see a lot of potential in low-code tools to reach a much wider audience beyond developers, for better collaboration and faster development.
Since our existing users are quite tech-literate people, it shouldn't be surprising that over 80% of you are not using low-code tools.
But for the 16% who said yes, we had the following questions.

### What did it help you build?

<img src="/static/blog/2021-survey/28.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="An internal tool: 22.5%; Landing pages: 22.1%; Analytics dashboard: 17.6%; A design system: 15.6%; E-commerce storefront: 8.6%; A simple customer-facing mobile app: 6.6%; Other: 7%" />

<p class="blog-description">244 out of 1589 answered</p>

MUI users are mainly working with low-code tools to build internal tools, landing pages, and analytics dashboards.
These findings align with what the rest of our users are building as well.
But it is great to see that there are low-code tools in the market that developers trust.

### If MUI considered building a low-code tool, what primary use-case would match your needs?

<img src="/static/blog/2021-survey/29.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Deliver a React design system: 22.2%; Generate high-quality React codebase after visual building: 19.2%; Building dashboards for rapid data visualization: 18.3%; Higher fidelity prototyping and demoing for accurate design handoff: 13.6%; Building internal apps when pro-code is overkill: 11.4%; Shipping landing pages with my existing React design system: 7.3%; Shipping production simple apps before moving to pro-code: 6.2%; Other: 1.8%" />

<p class="blog-description">1200 out of 1589 answered</p>

Developers are mostly interested in React design systems, codebase generators, tools for internal needs, data visualization, and prototyping.
These needs are both for internal and customer-facing use-cases.

## About you

### How did you first hear about MUI?

<img src="/static/blog/2021-survey/30.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Organic search: 57.8%; Word of mouth: 25.8%; Social media: 8.4%; Blog: 4.4%; Other: 3.5%" />

<p class="blog-description">1417 out of 1589 answered</p>

### Which of the following best describes your current job role?

<img src="/static/blog/2021-survey/31.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Full-stack developer: 52.6%; Front-end developer: 30.5%; Entrepreneur (I do it all!): 7.5%; Beginner learning web development: 2.6%; Engineering Manager: 2.6%; Back-end developer: 1.1%; Designer: 1%; Product Manager: 0.7%; Other: 1.3%" />

<p class="blog-description">1497 out of 1589 answered</p>

### How many total employees work at your current place of employment?

<img src="/static/blog/2021-survey/32.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="0-1: 187; 2-10: 358; 11-20: 136; 21-50: 139; 51-100: 97; 100+: 305" />

<p class="blog-description">1222 out of 1589 answered</p>

### How long have you been developing with JavaScript?

<img src="/static/blog/2021-survey/33.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Just getting started: 4.8%; 1 year +: 22.2%; 3 years +: 27.9%; 5 years +: 28.2%; 10 years +: 11.1%; 15 years +: 5.9%" />

<p class="blog-description">1520 out of 1589 answered</p>

### How long have you been developing with React?

<img src="/static/blog/2021-survey/34.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Just getting started: 7%; 6 months +: 11%; 1 year +: 20.6%; 2 years +: 21.2%; 3 years +: 27.1%; 5 years +: 11.5%; Bleeding edge baby! 6 years +: 1.6%" />

<p class="blog-description">1523 out of 1589 answered</p>

### How long have you been developing with MUI?

<img src="/static/blog/2021-survey/35.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Just getting started: 16.6%; 6 months +: 19.4%; 1 year +: 24.4%; 2 years +: 21.2%; 3 years +: 15.6%; I'm a pioneer! 5 years +: 2.8%" />

<p class="blog-description">1519 out of 1589 answered</p>

## Conclusion

The annual survey is one of the most important resources we have for deciding on our next steps.
We appreciate all the time you invested in answering our questions, and we can't stress enough how much we value your input.

In 2021, we released the largest update that MUI has ever seen.
We also began investing in complementary products, such as [MUI X](https://mui.com/x/), our [design kits](https://mui.com/design-kits/), and [premium templates](https://mui.com/templates/).

Your feedback from this survey helped us to better understand the areas where we need to improve:

- **Documentation:** You've asked for more examples, more tutorials, more learning materials, and more comprehensive docs.
  Most third-party content about MUI became outdated with the release of v5, so we have that much more work to do ourselves to pick up the slack.
- **Customization:** A new styling tool was an important step in the right direction for more customizability.
  We recognize that there are still many more opportunities to improve the experience of customizing MUI components.
- **Design quality:** Design continues to be the main driving aspect that guides a decision towards a given component library.
  A growing number of developers are moving away from MUI because of Material Design being the default design direction, and that’s a huge warning sign for us to explore other roads.
- **Breaking changes:** The need for fewer breaking changes does highlight one very positive point: numerous applications depend on MUI as their component library of choice.
  To continue supporting your products, we'll definitely look for ways to minimize the number of breaking changes in future updates.
  We’ll also continue exploring automation tools to ease the pain of any breaking changes that do come up.
- **Commercial vs.
  MIT balance:** MUI will always be an OSS project first and foremost, but we are getting a lot of positive feedback from our paid products and support services, which tells us that we're heading in the right direction.
  We are rapidly expanding our team to better address the needs of all of our users, and we look forward to making both our MIT-licensed and commercial offerings even more robust and compelling.
- **Performance:** We're still looking for the most effective ways to optimize performance.
  TypeScript has potential, and MUI System's speed needs work.
  We welcome your suggestions!

If you want to continue to influence our roadmap, you can visit the [MUI Core](https://github.com/mui/material-ui) and [MUI X](https://github.com/mui/mui-x) repositories, open issues, upvoting the ones you’re most interested in, or leave your comments and impressions about anything else you want to be improved, we'll be happy to hear from you.

Thanks again and until the next survey!
