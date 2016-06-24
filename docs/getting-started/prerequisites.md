## Prerequisites

We recommend that you get to know [React](http://facebook.github.io/react/)
before diving into Material-UI.
Material-UI is a set of React components,
so understanding how React fits into web development is important.

If you're already familiar with single page applications (SPAs) and Node,
feel free to skip the prerequisites and
head straight to the [installation](#/get-started/installation) part.

Otherwise, what follows is a quick and brief introduction to SPAs and Node.
You'll find this helpful, especially if you have limited prior experience
with web development,
or if your experience only consists of "traditional" websites built using
HTML, CSS and some JavaScript.

### Single Page Applications

A long(?) time ago, websites were built using static pages in HTML, with CSS used for styling,
and JavaScript used to support user interactions or for animations.
Most client interactions, especially those that acted on data,
involved complete server round-trips:
data from the client was sent to the server where it was processed,
and then the result was sent back to the client.
Moreover, most of this communication was "blocking".
That is, during these round-trips, the client was busy and could not be interacted with.

With the advent of asynchronous server calls (AJAX),
the client could now do other things while
it sent data to the server and awaited a response.
However, most client interactions still needed server round-trips,
and websites just didn’t
feel as fluid and responsive as, say, native desktop apps. That's why SPAs came into being.

An SPA is a "website" that essentially consists of a single page.
That is, the whole website lives in a single file (usually a JavaScript file)
that is sent from the server to the client once.
Most of the logic to handle client interactions lives in that single file.
Hence, everything that's necessary to provide a fluid, responsive, and fast web
experience is present in the browser’s memory.
This web programming architecture has gained tremendous traction in the last decade,
with many popular JavaScript presentation frameworks geared towards SPAs
- [Angular](https://angularjs.org)
- [Ember](http://emberjs.com/)
- [Backbone](http://backbonejs.org)
- [React](http://facebook.github.io/react/).

Including all of the code for a website in a single file creates significant code organization
challenges.
Thankfully, there are several tools that allow us to break up our code into smaller
modules (similar to breaking down an object-oriented application into different classes
and interfaces) that can be bundled together later.
This is where Node comes into play.

### Node

At its core, [Node](https://nodejs.org) is a program written in C that allows us
to run JavaScript in the shell (yes, your terminal, not the browser).
To do this, It uses Chrome’s V8 JavaScript engine.
Hence, Node is essentially a runtime environment.

When it was first created, Node was primarily targeted towards developing web servers in
JavaScript.
This was somewhat radical since JavaScript has traditionally been restricted to the client.
However, over time, web developers recognized the benefits of using Node for tooling and
dependency management, and created projects like
- [Grunt](http://gruntjs.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org)
- [Webpack](http://webpack.github.io)

As Node became popular, independent developers and organizations wrote scripts
(that ran using Node) to do almost everything web apps-related.
Of course, the whole community could benefit from these "custom Node scripts.""
This called for some kind of package repository where anybody could upload their Node scripts, and other developers
could use these scripts in their own projects.

[Node Package Manager](https://www.npmjs.com/), better known as “npm,” does exactly that.
npm is a command line tool that, among other things, can be used to incorporate external JavaScript into one's own project.
Material-UI, for instance, is available as a package through npm.
This means that you can include Material-UI in your project by simply running
`npm install material-ui` from your project’s directory,
and then using the components of Material-UI that you need.

That's it for a quick introduction!
If you feel like you need more of Node, we recommend that you consult
some quick tutorials online before jumping into Material-UI.
This [blog post](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) and
[video](https://www.youtube.com/watch?v=pU9Q6oiQNd0) are good starting points.
