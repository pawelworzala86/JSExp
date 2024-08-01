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



.code
    P1_ReadFileSync macro fileName
    





    invoke CreateFileA, fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0

    mov P1_handle, rax

    invoke GetFileSize, P1_handle, 0

    mov P1_fsize, rax

    invoke printf, "P1_fsize %i",P1_fsize

    invoke malloc, P1_fsize
mov P1_buffor, rax

    

    invoke ReadFile, P1_handle, P1_buffor, P1_fsize, 0, 0

    invoke printf, "%s",P1_buffor

    invoke CloseHandle, P1_handle


    endm

.code
    P1_main macro 
    





    P1_ReadFileSync "default.frag"

    P1_ReadFileSync "default.vert"


    endm

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

entry_point proc

    P1_main

    ;waitkey "  Press any key to continue ..."

    invoke ExitProcess,0

    ret

entry_point endp


    end
