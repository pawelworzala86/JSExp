




var P1_fsize = 0









FileSystem STRUCT

P1_handle QWORD ?

P1_fsize QWORD ?

P1_buffor QWORD ?

FileSystem ENDS





    .code
    FileSystem_constructor macro self
    





        mov rax, 0
mov self.P1_handle,rax

        mov rax, 0
mov self.P1_fsize,rax

        mov rax, 0
mov self.P1_buffor,rax

    :2
    endm

    .code
    FileSystem_ReadFileSync macro self,fileName
    





        CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
mov self.P1_handle, rax

        

        GetFileSize(self.P1_handle, 0)
mov self.P1_fsize, rax

        

        printf('P1_fsize %i',self.P1_fsize)

        malloc(self.P1_fsize)
mov self.P1_buffor, rax

        

        ReadFile(self.P1_handle, self.P1_buffor, self.P1_fsize, 0, 0)

        printf('%s',self.P1_buffor)

        CloseHandle(self.P1_handle)

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