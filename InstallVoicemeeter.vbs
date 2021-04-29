' Used in AppVeyor to automatically install Voicemeeter

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "Voicemeeter8Setup.exe"
WshShell.AppActivate "VB-AUDIO Voicemeeeter Installation"
WScript.Sleep(2000)
WshShell.SendKeys "{ENTER}"
