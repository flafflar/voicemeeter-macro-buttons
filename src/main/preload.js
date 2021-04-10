const remote = require('electron').remote;

process.once('loaded', function(){
	window.remote = remote;
})
