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
 * The possible positions to get the audio level from
 *
 * @enum
 */
API.LevelTypes = {
	PreFader: 0,
	PostFader: 1,
	PostMute: 2,
	Output: 3
}

/**
 * The possible channels per Voicemeeter type
 *
 * @namespace
 */
API.Channels = {
	[API.Types.Normal]: {
		Strip1: {Left: 0, Right: 1},
		Strip2: {Left: 2, Right: 3},
		VirtualInput1: {
			Left: 4,
			Right: 5,
			Center: 6,
			LF: 7,
			SideLeft: 8,
			SideRight: 9,
			RearLeft: 10,
			RearRight: 11
		},
		Output1: {
			Left: 0,
			Right: 1,
			Center: 2,
			LF: 3,
			SideLeft: 4,
			SideRight: 5,
			RearLeft: 6,
			RearRight: 7
		},
		VirtualOutput1: {
			Left: 8,
			Right: 9,
			Center: 10,
			LF: 11,
			SideLeft: 12,
			SideRight: 13,
			RearLeft: 14,
			RearRight: 15
		}
	},
	[API.Types.Banana]: {
		Strip1: {Left: 0, Right: 1},
		Strip2: {Left: 2, Right: 3},
		Strip3: {Left: 4, Right: 5},
		VirtualInput1: {
			Left: 6,
			Right: 7,
			Center: 8,
			LF: 9,
			SideLeft: 10,
			SideRight: 11,
			RearLeft: 12,
			RearRight: 13
		},
		VirtualInput2: {
			Left: 14,
			Right: 15,
			Center: 16,
			LF: 17,
			SideLeft: 18,
			SideRight: 19,
			RearLeft: 20,
			RearRight: 21
		},
		Output1: {
			Left: 0,
			Right: 1,
			Center: 2,
			LF: 3,
			SideLeft: 4,
			SideRight: 5,
			RearLeft: 6,
			RearRight: 7
		},
		Output2: {
			Left: 8,
			Right: 9,
			Center: 10,
			LF: 11,
			SideLeft: 12,
			SideRight: 13,
			RearLeft: 14,
			RearRight: 15
		},
		Output3: {
			Left: 16,
			Right: 17,
			Center: 18,
			LF: 19,
			SideLeft: 20,
			SideRight: 21,
			RearLeft: 22,
			RearRight: 23
		},
		VirtualOutput1: {
			Left: 24,
			Right: 25,
			Center: 26,
			LF: 27,
			SideLeft: 28,
			SideRight: 29,
			RearLeft: 30,
			RearRight: 31
		},
		VirtualOutput2: {
			Left: 32,
			Right: 33,
			Center: 34,
			LF: 35,
			SideLeft: 36,
			SideRight: 37,
			RearLeft: 38,
			RearRight: 39
		}
	},
	[API.Types.Potato]: {
		Strip1: {Left: 0, Right: 1},
		Strip2: {Left: 2, Right: 3},
		Strip3: {Left: 4, Right: 5},
		Strip4: {Left: 6, Right: 7},
		Strip5: {Left: 8, Right: 9},
		VirtualInput1: {
			Left: 10,
			Right: 11,
			Center: 12,
			LF: 13,
			SideLeft: 14,
			SideRight: 15,
			RearLeft: 16,
			RearRight: 17
		},
		VirtualInput2: {
			Left: 18,
			Right: 19,
			Center: 20,
			LF: 21,
			SideLeft: 22,
			SideRight: 23,
			RearLeft: 24,
			RearRight: 25
		},
		VirtualInput3: {
			Left: 26,
			Right: 27,
			Center: 28,
			LF: 29,
			SideLeft: 30,
			SideRight: 31,
			RearLeft: 32,
			RearRight: 33
		},
		Output1: {
			Left: 0,
			Right: 1,
			Center: 2,
			LF: 3,
			SideLeft: 4,
			SideRight: 5,
			RearLeft: 6,
			RearRight: 7
		},
		Output2: {
			Left: 8,
			Right: 9,
			Center: 10,
			LF: 11,
			SideLeft: 12,
			SideRight: 13,
			RearLeft: 14,
			RearRight: 15
		},
		Output3: {
			Left: 16,
			Right: 17,
			Center: 18,
			LF: 19,
			SideLeft: 20,
			SideRight: 21,
			RearLeft: 22,
			RearRight: 23
		},
		Output4: {
			Left: 24,
			Right: 25,
			Center: 26,
			LF: 27,
			SideLeft: 28,
			SideRight: 29,
			RearLeft: 30,
			RearRight: 31
		},
		Output5: {
			Left: 32,
			Right: 33,
			Center: 34,
			LF: 35,
			SideLeft: 36,
			SideRight: 37,
			RearLeft: 38,
			RearRight: 39
		},
		VirtualOutput1: {
			Left: 40,
			Right: 41,
			Center: 42,
			LF: 43,
			SideLeft: 44,
			SideRight: 45,
			RearLeft: 46,
			RearRight: 47
		},
		VirtualOutput2: {
			Left: 48,
			Right: 49,
			Center: 50,
			LF: 51,
			SideLeft: 52,
			SideRight: 53,
			RearLeft: 54,
			RearRight: 55
		},
		VirtualOutput3: {
			Left: 56,
			Right: 57,
			Center: 58,
			LF: 59,
			SideLeft: 60,
			SideRight: 61,
			RearLeft: 62,
			RearRight: 63
		}
	},
	[API.Types.Potato64]: {
		Strip1: {Left: 0, Right: 1},
		Strip2: {Left: 2, Right: 3},
		Strip3: {Left: 4, Right: 5},
		Strip4: {Left: 6, Right: 7},
		Strip5: {Left: 8, Right: 9},
		VirtualInput1: {
			Left: 10,
			Right: 11,
			Center: 12,
			LF: 13,
			SideLeft: 14,
			SideRight: 15,
			RearLeft: 16,
			RearRight: 17
		},
		VirtualInput2: {
			Left: 18,
			Right: 19,
			Center: 20,
			LF: 21,
			SideLeft: 22,
			SideRight: 23,
			RearLeft: 24,
			RearRight: 25
		},
		VirtualInput3: {
			Left: 26,
			Right: 27,
			Center: 28,
			LF: 29,
			SideLeft: 30,
			SideRight: 31,
			RearLeft: 32,
			RearRight: 33
		},
		Output1: {
			Left: 0,
			Right: 1,
			Center: 2,
			LF: 3,
			SideLeft: 4,
			SideRight: 5,
			RearLeft: 6,
			RearRight: 7
		},
		Output2: {
			Left: 8,
			Right: 9,
			Center: 10,
			LF: 11,
			SideLeft: 12,
			SideRight: 13,
			RearLeft: 14,
			RearRight: 15
		},
		Output3: {
			Left: 16,
			Right: 17,
			Center: 18,
			LF: 19,
			SideLeft: 20,
			SideRight: 21,
			RearLeft: 22,
			RearRight: 23
		},
		Output4: {
			Left: 24,
			Right: 25,
			Center: 26,
			LF: 27,
			SideLeft: 28,
			SideRight: 29,
			RearLeft: 30,
			RearRight: 31
		},
		Output5: {
			Left: 32,
			Right: 33,
			Center: 34,
			LF: 35,
			SideLeft: 36,
			SideRight: 37,
			RearLeft: 38,
			RearRight: 39
		},
		VirtualOutput1: {
			Left: 40,
			Right: 41,
			Center: 42,
			LF: 43,
			SideLeft: 44,
			SideRight: 45,
			RearLeft: 46,
			RearRight: 47
		},
		VirtualOutput2: {
			Left: 48,
			Right: 49,
			Center: 50,
			LF: 51,
			SideLeft: 52,
			SideRight: 53,
			RearLeft: 54,
			RearRight: 55
		},
		VirtualOutput3: {
			Left: 56,
			Right: 57,
			Center: 58,
			LF: 59,
			SideLeft: 60,
			SideRight: 61,
			RearLeft: 62,
			RearRight: 63
		}
	}
}

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

/**
 * Returns the version of the Voicemeeter application
 *
 * @returns {string} The version of the Voicemeeter application
 * @throws {VoicemeeterError} If no Voicemeeter application is running
 * @throws {VoicemeeterError} On unexpected errors
 */
API.getVoicemeeterVersion = function getVoicemeeterVersion(){
	let pVersion = ref.alloc('long');
	let result = Remote.VBVMR_GetVoicemeeterVersion(pVersion);
	if (result === -1) throw new VoicemeeterError('Cannot get client (unexpected)');
	if (result === -2) throw new VoicemeeterError('No server');
	let version = pVersion.deref();
	let v1 = (version & 0xFF000000)>>24,
		v2 = (version & 0x00FF0000)>>16,
		v3 = (version & 0x0000FF00)>>8,
		v4 = version & 0x000000FF;
	return v1 + '.' + v2 + '.' + v3 + '.' + v4;
}

/**
 * Checks if any parameters have changed
 *
 * @returns {boolean} Whether any parameters have changed
 * @throws {VoicemeeterError} If no Voicemeeter application is running
 * @throws {VoicemeeterError} On unexpected errors
 */
API.isParametersDirty = function isParametersDirty(){
	let result = Remote.VBVMR_IsParametersDirty();
	if (result === -1) throw new VoicemeeterError('Cannot get client (unexpected)');
	if (result === -2) throw new VoicemeeterError('No server');
	return result === 1;
}

/**
 * Returns a parameter's value
 *
 * @param {string} name The name of the parameter
 * @returns {number|string} The value of the parameter
 */
API.getParameter = function getParameter(name){

	// First, try to get the parameter as a float
	let szParamName = ref.allocCString(name);
	let pValue = ref.alloc('float');
	let result = Remote.VBVMR_GetParameterFloat(szParamName, pValue);
	if (result === 0) return pValue.deref();

	// Now, try to get the parameter as a string
	let szString = Buffer.alloc(512);
	result = Remote.VBVMR_GetParameterStringA(szParamName, szString);
	if (result === 0) return ref.readCString(szString);

	switch (result){
		case -2: throw new VoicemeeterError('No server');
		case -3: throw new VoicemeeterError('Unknown parameter');
		case -5: throw new VoicemeeterError('Structure mismatch')
	}
}

/**
 * Returns the current audio level of a specific channel
 *
 * @param {API.LevelTypes} type The type of level to get (@see API.LevelTypes)
 * @param {API.Channels} channel The targeted channel (depends on the type of
 * the application, @see API.Channels)
 * @returns {number} The level of the channel
 * @throws {VoicemeeterError} If no level is available for the channel
 * @throws {VoicemeeterError} If the selected channel is out of range
 * @throws {VoicemeeterError} If no Voicemeeter application is running
 * @throws {VoicemeeterError} On unexpected errors
 */
API.getLevel = function getLevel(type, channel){
	let pValue = ref.alloc('float');
	let result = Remote.VBVMR_GetLevel(type, channel, pValue);
	switch (result) {
		case 0: return pValue.deref();
		case -1: throw new VoicemeeterError('Unspecified error');
		case -2: throw new VoicemeeterError('No server');
		case -3: throw new VoicemeeterError('No lever available');
		case -4: throw new VoicemeeterError('Out of range');
	}
}

// TODO: Implement wrapper for VBVMR_GetMidiMessage

/**
 * Sets a parameter's value
 *
 * @param {string} name The name of the parameter
 * @param {number|string} value The value to give to the parameter
 * @throws {VoicemeeterError} If the parameter is not recognised
 * @throws {VoicemeeterError} If no Voicemeeter application is running
 * @throws {VoicemeeterError} On unexpected errors
 */
API.setParameter = function setParameter(name, value){
	let szParamName = ref.allocCString(name);
	let result;
	if (typeof value === 'number'){
		result = Remote.VBVMR_SetParameterFloat(szParamName, value);
	} else if (typeof value === 'string'){
		let szString = ref.allocCString(value);
		result = Remote.VBVMR_SetParameterStringA(szParamName, szString);
	}
}

export default API
