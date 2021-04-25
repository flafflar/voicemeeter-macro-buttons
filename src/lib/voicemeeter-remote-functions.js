import ref from 'ref-napi'

const
	char = ref.types.char,
	uChar = ref.types.uchar,
	uShort = ref.types.ushort,
	long = ref.types.long,
	float = ref.types.float,
	charPtr = ref.refType(char),
	uCharPtr = ref.refType(uChar),
	uShortPtr = ref.refType(uShort),
	longPtr = ref.refType(long),
	floatPtr = ref.refType(float)
;


const functions = {
	VBVMR_Login: [long, []],
	VBVMR_Logout: [long, []],
	VBVMR_RunVoicemeeter: [long, [longPtr]],
	VBVMR_GetVoicemeeterType: [long, [longPtr]],
	VBVMR_GetVoicemeeterVersion: [long, [longPtr]],
	VBVMR_IsParametersDirty: [long, []],
	VBVMR_GetParameterFloat: [long, [charPtr, floatPtr]],
	VBVMR_GetParameterStringA: [long, [charPtr, charPtr]],
	VBVMR_GetParameterStringW: [long, [charPtr, uShortPtr]],
	VBVMR_GetLevel: [long, [long, long, floatPtr]],
	VBVMR_GetMidiMessage: [long, [uCharPtr, long]],
	VBVMR_SetParameterFloat: [long, [charPtr, float]],
	VBVMR_SetParameterStringA: [long, [charPtr, charPtr]],
	VBVMR_SetParameterStringW: [long, [charPtr, uShortPtr]],
	VBVMR_SetParameters: [long, [charPtr]],
	VBVMR_SetParametersW: [long, [uShortPtr]],
	VBVMR_Output_GetDeviceNumber: [long, []],
	VBVMR_Output_GetDeviceDescA: [long, [long, longPtr, charPtr, charPtr]],
	VBVMR_Output_GetDeviceDescW: [long, [long, longPtr, uShortPtr, uShortPtr]],
	VBVMR_Input_GetDeviceNumber: [long, []],
	VBVMR_Input_GetDeviceDescA: [long, [long, longPtr, charPtr, charPtr]],
	VBVMR_Input_GetDeviceDescW: [long, [long, longPtr, uShortPtr, uShortPtr]]
}

export default functions;
