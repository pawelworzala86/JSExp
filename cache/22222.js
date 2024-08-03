


var P1_handle = 0

var P1_fsize = 0

var P1_buffor = 0



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
    





        self[FileSystem_P1_handle] = 0

        self[FileSystem_P1_fsize] = 0

        self[FileSystem_P1_buffor] = 0

    :2
    endm

    .code
    FileSystem_ReadFileSync macro self,fileName
    





CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
mov qword ptr self[FileSystem_P1_handle], rax


        

GetFileSize(self[FileSystem_P1_handle], 0)
mov qword ptr self[FileSystem_P1_fsize], rax


        

        printf('P1_fsize %i',self[FileSystem_P1_fsize])

malloc(self[FileSystem_P1_fsize])
mov qword ptr self[FileSystem_P1_buffor], rax


        

        ReadFile(self[FileSystem_P1_handle], &self[FileSystem_P1_buffor], &self[FileSystem_P1_fsize], 0, 0)

        printf('%s',self[FileSystem_P1_buffor])

        CloseHandle(self[FileSystem_P1_handle])

    :2
    endm



.data?

P1_fs label FileSystem



.code
    P1_main macro 
    





    FileSystem_constructor(P1_fs)



    FileSystem_ReadFileSync(P1_fs,'default.frag')

    FileSystem_ReadFileSync(P1_fs,'default.vert')

:1
    endm