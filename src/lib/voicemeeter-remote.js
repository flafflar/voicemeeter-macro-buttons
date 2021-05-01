/**
 * Wrapper around the VoicemeeterRemote.dll
 *
 * @module lib/voicemeeter-remote
 */

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
	let dllName = process.arch === 'x64' ? 'VoicemeeterRemote64.dll' : 'VoicemeeterRemote.dll';
	let dllPath = path.join(path.dirname(value), dllName);
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

/**
 * The possible types of Voicemeeter applications
 *
 * @enum {number}
 */
export const Types = {
	Normal: 1,
	Banana: 2,
	Potato: 3,
	Potato64: 6
};

/**
 * The possible positions to get the audio level from
 *
 * @enum {number}
 */
export const LevelTypes = {
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
export const Channels = {
	[Types.Normal]: {
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
	[Types.Banana]: {
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
	[Types.Potato]: {
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
	[Types.Potato64]: {
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
 * The possible device types
 *
 * @enum {string}
 */
const DeviceTypes = {
	1: 'MME',
	3: 'WDM',
	4: 'KS',
	5: 'ASIO'
}

/**
 * Opens a communication pipe with Voicemeeter
 *
 * Typically called on software startup
 *
 * @returns {boolean} Whether the Voicemeeter application is launched
 * @throws {VoicemeeterError}
 */
export function login(){
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
export function logout(){
	let result = Remote.VBVMR_Logout();
	return result === 0;
}

/**
 * Runs the Voicemeeter application
 *
 * @param {Types} type The Voicemeeter type to run (@see Types)
 */
export function runVoicemeeter(type){
	let result = Remote.VBVMR_RunVoicemeeter(type);
	if (result === -1) throw new VoicemeeterError('Voicemeeter not installed');
	if (result === -2) throw new VoicemeeterError('Unknown Voicemeeter type');
}

/**
 * Gets the type of the currently running Voicemeeter application
 *
 * @returns {Types} The type of the Voicemeeter application
 * @throws {VoicemeeterError} If no Voicemeeter application is running
 * @throws {VoicemeeterError} On unexpected errors
 */
export function getVoicemeeterType(){
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
export function getVoicemeeterVersion(){
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
export function isParametersDirty(){
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
export function getParameter(name){

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
 * @param {LevelTypes} type The type of level to get (@see LevelTypes)
 * @param {Channels} channel The targeted channel (depends on the type of
 * the application, @see Channels)
 * @returns {number} The level of the channel
 * @throws {VoicemeeterError} If no level is available for the channel
 * @throws {VoicemeeterError} If the selected channel is out of range
 * @throws {VoicemeeterError} If no Voicemeeter application is running
 * @throws {VoicemeeterError} On unexpected errors
 */
export function getLevel(type, channel){
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
export function setParameter(name, value){
	let szParamName = ref.allocCString(name);
	let result;
	if (typeof value === 'number'){
		result = Remote.VBVMR_SetParameterFloat(szParamName, value);
	} else if (typeof value === 'string'){
		let szString = ref.allocCString(value);
		result = Remote.VBVMR_SetParameterStringA(szParamName, szString);
	}
}

/**
 * Holds the info about a device
 * @typedef {Object} DeviceInfo
 * @property {string} type The type of the device
 * @property {string} name The name of the device
 * @property {string} hardwareId The hardware ID of the device
 */

/**
 * Returns a list with info for the input devices
 *
 * @returns {DeviceInfo[]} The list of devices
 */
export function getInputDeviceInfo(){
	let deviceNumber = Remote.VBVMR_Input_GetDeviceNumber();
	let deviceInfo = new Array(deviceNumber);
	for (let index = 0; index < deviceNumber; index++){
		let nType = ref.alloc('long');
		let szDeviceName = Buffer.alloc(1024);
		let szHardwareId = Buffer.alloc(1024);
		Remote.VBVMR_Input_GetDeviceDescA(index, nType, szDeviceName, szHardwareId);
		deviceInfo[index] = {
			type: DeviceTypes[nType.deref()],
			name: szDeviceName.readCString(),
			hardwareId: szHardwareId.readCString()
		};
	}
	return deviceInfo;
}

/**
 * Returns a list with info for the output devices
 *
 * @returns {DeviceInfo[]} The list of devices
 */
export function getOutputDeviceInfo(){
	let deviceNumber = Remote.VBVMR_Output_GetDeviceNumber();
	let deviceInfo = new Array(deviceNumber);
	for (let index = 0; index < deviceNumber; index++){
		let nType = ref.alloc('long');
		let szDeviceName = Buffer.alloc(512);
		let szHardwareId = Buffer.alloc(512);
		Remote.VBVMR_Output_GetDeviceDescA(index, nType, szDeviceName, szHardwareId);
		deviceInfo[index] = {
			type: DeviceTypes[nType.deref()],
			name: szDeviceName.readCString(),
			hardwareId: szHardwareId.readCString()
		};
	}
	return deviceInfo;
}

// TODO: Implement VB-Audio Callback

// Automatically log in
login();

// Automatically log out on exit
process.on('exit', code => {
	logout();
})
