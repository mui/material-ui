# Contributing
:raised_hands::tada: First off all, thanks for taking the time to contribute! :tada::raised_hands:

The following is a set of guidelines for contributing to material-ui-pickers. The purpose of these 
guidelines is to maintain a high quality of code *and* traceability. Please respect these 
guidelines.

## General
This repository use tests and a linter as automatic tools to maintain the quality of the code. 
These two tasks are run locally on your machine before every commit (as a pre-commit git hook), 
if any test fail or the linter gives an error the commit will not be created. They are also run on 
a Travis CI machine when you create a pull request, and the PR will not be merged unless Travis 
says all tests and the linting pass.

## Git Commit Messages
* Use the imperative mood ("Move pointer to..." not "Moves pointer to...")
  * Think of it as you are *commanding* what your commit is doing
  * Git itself uses the imperative whenever it creates a commit on your behalf, so it makes sense 
   for you to use it too
* Use the body to explain *what* and *why*
  * If the commit is non-trivial, please provide more detailed information in the commit body 
   message
  * *How* you made the change is visible in the code and is therefore rarely necessary to include 
   in the commit body message, but *why* you made the change is often harder to guess and is 
   therefore useful to include in the commit body message

[Here's a nice blog post on how to write great git messages.](http://chris.beams.io/posts/git-commit/)

## Pull Requests
* Follow the current code style
* Write tests for your changes
* Document your changes in the README if it's needed
* End files with a newline
* There's no need to create a new build for each pull request, we (the maintainers) do this when we
 release a new version

## Issues
* Please be descriptive when you fill in the issue template, this will greatly help us maintainers
 in helping you which will lead to your issue being resolved faster
* Feature requests are very welcomed, but not every feature that is requested can be guaranteed 
 to be implemented
