Demo project for `material-ui-pickers`

First of all want to thanks for taking your time to contribute 🎉
There is a little instruction of how to run the demo locally using `npm link`

Just run this command from root and you will be able to run demo.

```sh
cd lib && npm link && cd ../docs && npm link material-ui-pickers
```

Thats it, your local build is linked to demo project!
Please note that you need to start the project in both `/lib` and `/docs` folders, fist will watch and build es module of library, and demo would be reloaded by watcher.
