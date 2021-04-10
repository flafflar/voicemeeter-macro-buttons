import {app, BrowserWindow, ipcMain} from 'electron';
import index from '../renderer/index.html';

import path from 'path';

app.on('ready', function(){
	let win = new BrowserWindow({
		backgroundColor: '#ffffff',
		show: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});
	win.loadFile(index);
	win.on('ready-to-show', () => win.show());
})

