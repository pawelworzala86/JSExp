; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include ..\include\extern.inc

    .code

	




.data
P1_fsize dq 0
.code









FileSystem STRUCT

handle QWORD ?

fsize QWORD ?

buffor QWORD ?

FileSystem ENDS





    .code
    FileSystem_constructor macro self
    





        mov rax, 0
mov self.handle,rax

        mov rax, 0
mov self.fsize,rax

        mov rax, 0
mov self.buffor,rax

    
    endm

    .code
    FileSystem_ReadFileSync macro self,fileName
    





        invoke CreateFileA, fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0
mov self.handle, rax

        

        invoke GetFileSize, self.handle, 0
mov self.fsize, rax

        

        invoke printf, "P1_fsize %i",self.fsize

        invoke malloc, self.fsize
mov self.buffor, rax

        

        invoke ReadFile, self.handle, self.buffor, self.fsize, 0, 0

        invoke printf, "%s",self.buffor

        invoke CloseHandle, self.handle

    
    endm



.data?

P1_fs label FileSystem



.code
    P1_main macro 
    





    FileSystem_constructor P1_fs



    FileSystem_ReadFileSync P1_fs,"default.frag"

    FileSystem_ReadFileSync P1_fs,"default.vert"


    endm

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

entry_point proc

    P1_main

    ;waitkey "  Press any key to continue ..."

    invoke ExitProcess,0

    ret

entry_point endp


    end
