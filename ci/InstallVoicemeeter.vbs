' Used in AppVeyor to automatically install Voicemeeter

Function IsInstallerRunning()
	Set WMIService = GetObject("winmgmts:{impersonationLevel=impersonate}!\\" & "." & "\root\cimv2")
	Set ProcessList = WMIService.ExecQuery("Select Name from Win32_Process WHERE Name LIKE 'Voicemeeter8Setup%'")
	If ProcessList.Count > 0 then
		IsInstallerRunning = True
	else
    	IsInstallerRunning = False
	End If
End Function

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "Voicemeeter8Setup.exe"
WshShell.AppActivate "VB-AUDIO Voicemeeeter Installation"
WScript.Sleep(2000)
WshShell.SendKeys "{ENTER}"
