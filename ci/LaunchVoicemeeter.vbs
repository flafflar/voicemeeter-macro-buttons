Set WshShell = WScript.CreateObject("WScript.Shell")
Dim exeName
If WScript.Arguments.Named.Exists("name") Then
	exeName = WScript.Arguments.Named.Item("name")
Else
	exeName = "voicemeeter8"
End IF
WshShell.Run """C:\Program Files (x86)\VB\Voicemeeter\" & exeName & ".exe"""
' Wait 1 second for the program to launch
WScript.Sleep(1000)
' Wait 5 seconds for Voicemeeter's engine to start
WScript.Sleep(5000)
