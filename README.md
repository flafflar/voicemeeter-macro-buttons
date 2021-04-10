# Electron boilerplate
A boilerplate for making Electron applications, with preconfigured tools and utilities.

It includes the following tools:
- [electron-builder](https://github.com/electron-userland/electron-builder) for building and releasing the application
- [webpack](https://webpack.js.org/) for transpiling, bundling and minifying the code before building
- [react](https://reactjs.org/) for the renderer process
- [babel](https://babeljs.io/) for transpiling the JSX syntax of react (integrated in webpack)
- [spectron](https://www.electronjs.org/spectron) for testing the application (using the [mocha](https://mochajs.org/) testiong framework)

Also, it includes configuration for [AppVeyor](https://www.appveyor.com/).

## Installation
```console
> git clone https://github.com/the-wulv/electron-boilerplate.git
> cd electron-boilerplate
> npm install
```

## Scripts
The following NPM scripts are defined:

|   Command   |                                Function                                 |
|:------------|:------------------------------------------------------------------------|
| test        | Tests the application                                                   |
| start       | Starts the application                                                  |
| bundle:dev  | Bundles the source code (for development)                               |
| bundle:prod | Bundles the source code (for production)                                |
| bundle:live | Activates the webpack watcher, bundles code automatically when you save |
| build       | Builds the application                                                  |
| publish     | Builds the application and publishes it as a GitHub release             |

## Directories
This is the directory structure of the project:
<!--```
electron-boilerplate
├── .vscode
│   └── launch.json
├── app
│   └── package.json
├── build
│   ├── icons
│   │   ├── icon.ico
│   │   ├── icon-installer.ico
│   │   └── icon-uninstaller.ico
│   ├── VisualElements
│   │   ├── VisualElements_70x70.png
│   │   └── ViualElements_150x150.png
│   └── VisualElementsManifest.xml
├── dist
├── src
│   ├── main
│   │   ├── main.js
│   │   └── preload.js
│   └── renderer
│       ├── index.html
│       ├── style.css
│       └── renderer.jsx
├── .editorconfig
├── .gitignore
├── build-config.json
├── webpack.js
├── README.md
└── LICENSE
```-->
```
electron-boilerplate
├── .vscode
├── app
├── build
│   ├── icons
│   └── VisualElements
├── dist
└── src
    ├── main
    └── renderer
```
Each directory is further analyzed below:

### src
This is where your source code should be located. This directory has two subdirectories: `main` and `renderer`, each containing the code for the respective processes. This directory already contains some basic files that can help you during development.

For the main process, there is already a main and a preload script (`main.js` and `preload.js` respectively). For the renderer process, there is alreday an HTML file, a CSS stylesheet and a Javascript script that renders the page (called `renderer.jsx`).

***Important note:*** The three Javascript files already provided (`main.js`, `preload.js` and `renderer.jsx`) should not be moved or renamed, as they all are entry points for webpack. If you must move them, remember to modify the webpack settings (see [below]()).

### app
This is where the bundled code is output.

In this directory, there is also a `package.json` file. This file is used *only by the builder*, and its only purpose is to provide the builder with information about your project (such as name, version etc.). See more [below]().

### build
This directory contains all the build resources (icons etc) needed by the builder.

### dist
This directory contains the binaries output by the compiler.

### .vscode
Workspace settings for Visual Studio Code.

