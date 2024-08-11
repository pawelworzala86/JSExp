IF ERRORLEVEL 1 GOTO koniec



ml64.exe /c %1.asm

link.exe /SUBSYSTEM:CONSOLE /MACHINE:X64 /ENTRY:entry_point /nologo /LARGEADDRESSAWARE:NO %1.obj

IF ERRORLEVEL 1 GOTO koniec


copy %1.exe .\out\%1.exe

del %1.exe
del %1.obj



cd out
%1.exe
cd ..





:koniec