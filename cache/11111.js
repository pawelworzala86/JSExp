




var P1_fsize = 0









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

    :2
    endm

    .code
    FileSystem_ReadFileSync macro self,fileName
    





        CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
mov self.handle, rax

        

        GetFileSize(self.handle, 0)
mov self.fsize, rax

        

        printf('P1_fsize %i',self.fsize)

        malloc(self.fsize)
mov self.buffor, rax

        

        ReadFile(self.handle, self.buffor, self.fsize, 0, 0)

        printf('%s',self.buffor)

        CloseHandle(self.handle)

    :2
    endm



.data?

    P1_fs FileSystem 2 dup\\({}\\)



.code
    P1_main macro 
    





    FileSystem_constructor(P1_fs[0])



    FileSystem_ReadFileSync(P1_fs[0],'default.frag')

    FileSystem_ReadFileSync(P1_fs[0],'default.vert')

:1
    endm