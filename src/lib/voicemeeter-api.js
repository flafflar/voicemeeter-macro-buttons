import path from 'path'
import {execSync} from 'child_process'
import ffi from 'ffi-napi'
import ref from 'ref-napi'

/**
 * Locates the VoicemeeterRemote.dll file and returns its path
 */
function getDLLPath(){
	let out = execSync('reg query "HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VB:Voicemeeter {17359A74-1236-5467}" /v UninstallString');
	let re = /UninstallString\s+REG_SZ\s+(?<value>.+)\r\n/;
	let value = re.exec(out).groups.value;
	let dllPath = path.join(path.dirname(value), 'VoicemeeterRemote64.dll');
	return dllPath;
}

import functions from './voicemeeter-remote-functions'
import {func} from 'prop-types';

/**
 * The interface to the VoicemeeterRemote.dll
 */
const Remote = ffi.Library(getDLLPath(), functions);

/** A custom error class for errors in Voicemeeter */
class VoicemeeterError extends Error {
	constructor(message){
		super(message);
		this.name = 'VoicemeeterError';
	}
}

const API = {};

/**
 * The possible types of Voicemeeter applications
 *
 * @enum
 */
API.Types = {
	Normal: 1,
	Banana: 2,
	Potato: 3,
	Potato64: 6
};

/**
 * Opens a communication pipe with Voicemeeter
 *
 * Typically called on software startup
 *
 * @returns {boolean} Whether the Voicemeeter application is launched
 * @throws {VoicemeeterError}
 */
API.login = function login(){
	let result = Remote.VBVMR_Login();
	if (result === -1) throw new VoicemeeterError('Cannot get client (unexpected)');
	if (result === -2) throw new VoicemeeterError('Unexpected login (logout was expected before)');
	if (result === 0) return true;
	return false;
}

/**
 * Closes the communication pipe with Voicemeeter
 *
 * Typically called on software end
 *
 * @returns {boolean} Whether the logout was successful
 */
API.logout = function logout(){
	let result = Remote.VBVMR_Logout();
	return result === 0;
}

/**
 * Runs the Voicemeeter application
 *
 * @param {API.Types} type The Voicemeeter type to run (@see API.Types)
 */
API.runVoicemeeter = function runVoicemeeter(type){
	let result = Remote.VBVMR_RunVoicemeeter(type);
	if (result === -1) throw new VoicemeeterError('Voicemeeter not installed');
	if (result === -2) throw new VoicemeeterError('Unknown Voicemeeter type');
}

/**
 * Gets the type of the currently running Voicemeeter application
 *
 * @returns {API.Types} The type of the Voicemeeter application
 * @throws {VoicemeeterError} If no Voicemeeter application is running
 * @throws {VoicemeeterError} On unexpected errors
 */
API.getVoicemeeterType = function getVoicemeeterType(){
	let type = ref.alloc('long');
	let result = Remote.VBVMR_GetVoicemeeterType(type);
	if (result === -1) throw new VoicemeeterError('Cannot get client (unexpected)');
	if (result === -2) throw new VoicemeeterError('No server');
	return type.deref();
}


export default API
