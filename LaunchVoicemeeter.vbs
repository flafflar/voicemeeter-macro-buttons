Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "C:\Program Files (x86)\VB\Voicemeeter\voicemeeter8.exe"
' Wait 1 second for the program to launch
WScript.Sleep(1000)
' Wait 5 seconds for Voicemeeter's engine to start
WScript.Sleep(5000)
