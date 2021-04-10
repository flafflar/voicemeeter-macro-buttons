const fs = require('fs');
const path = require('path');
const package = require('./package.json');

// Change this if you have changed the bundler output directory
const secondPackageDir = 'app';

const secondPackage = {
	name: package.name,
	version: package.version,
	description: package.description,
	author: package.author,
	main: path.relative(secondPackageDir, package.main)
};
fs.writeFileSync(
	path.join(secondPackageDir, 'package.json'), // Path of the second package.json
	JSON.stringify(secondPackage) // The data of the package
);

/****************************
  Configuration begins here
****************************/
module.exports = {
	appId: `com.electron.${package.name}`,
	productName: package.fullname,
	copyright: `Copyright © 2020 ${package.author}`,
	directories: {
		buildResources: 'build',
		output: 'dist',
		app: 'app'
	},
	files: [
		'**/*',
		'!**/._*',
		'!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
		'!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
		'!**/node_modules/*.d.ts',
		'!**/node_modules/.bin',
		'!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
		'!.editorconfig',
		'!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
		'!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}',
		'!**/{appveyor.yml,.travis.yml,circle.yml}',
		'!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}',
		'!**/*.js.map'
	],
	win: {
		target: 'nsis',
		icon: 'build/icons/icon.ico',
		extraResources: [
			{
				from: 'build/VisualElements',
				to: 'VisualElements'
			}
		],
		extraFiles: [
			{
				from: 'build/VisualElementsManifest.xml',
				to: `${package.name}.VisualElementsManifest.xml`
			}
		]
	},
	nsis: {
		oneClick: false,
		perMachine: false,
		allowElevation: true,
		allowToChangeInstallationDirectory: true,
		installerIcon: 'build/icons/icon-installer.ico',
		uninstallerIcon: 'build/icons/icon.ico',
		license: 'LICENSE'
	},
	mac: {
		category: 'public.app-category.utilities',
		target: 'default',
		icon: 'build/icons/icon.png'
	},
	compression: 'normal',
	extraResources: [],
	extraFiles: [],
	asar: true,
	publish: process.argv.includes('--publish') || process.argv.includes('-p') ? {
		provider: 'github',
		releaseType: 'draft',
		publishAutoUpdate: true
	} : undefined
}
