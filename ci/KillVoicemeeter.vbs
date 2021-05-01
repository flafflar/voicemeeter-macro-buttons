Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "taskkill /fi ""imagename eq voicemeeter*"""
' Give Voicemeeter time to close
WshShell.Sleep(1000)
