import path from 'path'
import {execSync} from 'child_process'
import ffi from 'ffi-napi'

/**
 * Locates the VoicemeeterRemote.dll file and returns its path
 */
function getDLLPath(){
	let out = execSync('reg query "HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VB:Voicemeeter {17359A74-1236-5467}" /v UninstallString');
	let re = /UninstallString\s+REG_SZ\s+(?<value>.+)\r\n/;
	let value = re.exec(out).groups.value;
	return value;
}

import functions from './voicemeeter-remote-functions'

/**
 * The interface to the VoicemeeterRemote.dll
 */
const Remote = ffi.Library(getDLLPath(), functions);
