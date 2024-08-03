; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include ..\include\extern.inc

    .code

	


.data
P1_handle dq 0
.code

.data
P1_fsize dq 0
.code

.data
P1_buffor dq 0
.code



FileSystem_P1_handle equ 0

FileSystem_P1_fsize equ 1

FileSystem_P1_buffor equ 2





FileSystem STRUCT

P1_handle QWORD ?

P1_fsize QWORD ?

P1_buffor QWORD ?

FileSystem ENDS





    .code
    FileSystem_constructor macro self
    





mov rax, 0
mov qword ptr self[FileSystem_P1_handle], rax

mov rax, 0
mov qword ptr self[FileSystem_P1_fsize], rax

mov rax, 0
mov qword ptr self[FileSystem_P1_buffor], rax

    
    endm

    .code
    FileSystem_ReadFileSync macro self,fileName
    





invoke CreateFileA, fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0
mov qword ptr qword ptr self[FileSystem_P1_handle], rax


        

        invoke GetFileSize, qword ptr self[FileSystem_P1_handle], 0
mov P1_fsize, rax

        

        invoke printf, "P1_fsize %i",P1_fsize

        invoke malloc, P1_fsize
mov P1_buffor, rax

        

        invoke ReadFile, qword ptr self[FileSystem_P1_handle], P1_buffor, P1_fsize, 0, 0

        invoke printf, "%s",P1_buffor

        invoke CloseHandle, qword ptr self[FileSystem_P1_handle]

    
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
