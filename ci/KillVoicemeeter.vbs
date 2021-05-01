Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "taskkill /fi ""imagename eq voicemeeter*"""
' Give Voicemeeter time to close
WScript.Sleep(1000)
