import path from 'path'
import ffi from 'ffi-napi'
import Registry from 'winreg'

/**
 * Callback for the getDLLPath method
 *
 * @callback getDLLPathCallback
 * @param {Error|null} err The error that occured during the call of the
 * function, or `null` if no errors occured
 * @param {string} path The path of the VoicemeeterRemote.dll
 */

/**
 * Locates the VoicemeeterRemote.dll file and returns its path
 *
 * @async
 * @param {getDLLPathCallback} callback
 */
function getDLLPath(callback){
	let key = new Registry({
		hive: Registry.HKLM,
		key: '\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VB:Voicemeeter {17359A74-1236-5467}'
	})
	key.get('UninstallString', (err, item) => {
		if (err) return callback(err);
		return callback(null, path.join(path.dirname(item.value), 'VoicemeeterRemote.dll'));
	})
}
