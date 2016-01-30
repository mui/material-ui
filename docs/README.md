# [Material-UI Docs](http://callemall.github.io/material-ui/)

This is the documentation website and application of Material-UI.

## Requirements

- [Node](https://nodejs.org) 4.0 or newer
- [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development
- [Xcode](https://developer.apple.com/xcode/) for iOS development (optional)
- [Android SDK](https://developer.android.com/sdk/) for Android development (optional)

## Installation
After cloning the repository, install dependencies:
```sh
cd <project folder>/material-ui
npm install
cd <project folder>/material-ui/docs
npm install
```

## Running

Once dependencies are installed, start the application with:

### Browser

```sh
npm run browser:development
```

Open `http://localhost:3000` to view the documentation site.

### iOS

```sh
npm run native:development
```

Open `ios/iosApp.xcodeproj` in Xcode, build and run the project.

### Android

```sh
npm run native:development
npm run android:setup-port
react-native run-android
```
