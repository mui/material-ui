# Frequently asked questions

Stuck on a particular problem?
Check some of these common gotchas first.

If you still cannot find what you are looking for, you can ask the community in [gitter](https://gitter.im/callemall/material-ui).
For how-to questions and other non-issues, please use [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) instead of Github issues. There is a StackOverflow tag called `material-ui` that you can use to tag your questions.

## Fixed positioned elements move when a modal is opened

We block the scroll as soon as a modal is opened.
It prevents interacting with the background when the modal should be the only interactive content.
However, removing the scrollbar can make your **fixed positioned elements** move.
In this situation, you can apply a global `.mui-fixed` class name to tell Material-UI to handle those elements.
