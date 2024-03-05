# Adding new fixtures

Create a new file name with `[name].input.js` and add `styled`, `css` or other zero-runtime calls into the file. Also add equivalent `[name].output.js` and `[name].output.css` and run the test. After the new test fails, get the results from the received output and add it to the equivalent js and css files. This is equivalent to snapshot testing and will make sure any change in internal css generation logic does not fail any other existing tests.
