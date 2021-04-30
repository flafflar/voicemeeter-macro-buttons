const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');
const assert = require('assert');

describe('Application launch', function(){

	this.timeout(10000);

	/** @type {Application} */
	let app = null;

	beforeEach(function(){
		app = new Application({
			path: electronPath,
			args: [path.join(__dirname, '../app')]
		})
		return app.start();
	})

	afterEach(function(){
		if (app && app.isRunning()){
			return app.stop();
		}
	})

	it('Should show a window', function(){
		return app.client.getWindowCount().then(function(count){
			assert.equal(count, 1);
		})
	})

	it('Should contain the app container element', function(){
		return app.client.$('#app').then(function(appElem){
			appElem.isExisting().then(function(isExisting){
				assert.ok(isExisting);
			})
		})
	});

})
