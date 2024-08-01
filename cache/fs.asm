


.data
P2_handle dq 0
.code

.data
P2_fsize dq 0
.code

.data
P2_buffor dq 0
.code



.code
    P2_ReadFileSync macro fileName
    





    invoke CreateFileA, fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0

    mov P2_handle, rax

    invoke GetFileSize, P2_handle, 0

    mov P2_fsize, rax

    invoke printf, "P2_fsize %i",P2_fsize

    invoke malloc, P2_fsize
mov P2_buffor, rax

    

    invoke ReadFile, P2_handle, P2_buffor, P2_fsize, 0, 0

    invoke printf, "%s",P2_buffor

    invoke CloseHandle, P2_handle


    endm

.code
    P2_main macro 
    





    P2_ReadFileSync "default.frag"

    P2_ReadFileSync "default.vert"


    endm