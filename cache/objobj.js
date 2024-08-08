
//var P1_handle = 0
var P1_fsize = 0
//var P1_buffor = 0



FileSystem STRUCT
handle QWORD ?
fsize QWORD ?
buffor QWORD ?
FileSystem ENDS


    function FileSystem_constructor(self):2{
        self.handle = 0
        self.fsize = 0
        self.buffor = 0
    :2}
    function FileSystem_ReadFileSync(self,fileName):2{
        self.handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        //mov P1_handle, rax
        self.fsize = GetFileSize(self.handle, 0)
        //mov P1_fsize, rax
        printf('P1_fsize %i',self.fsize)
        self.buffor = malloc(self.fsize)
        //mov P1_buffor, rax
        ReadFile(self.handle, self.buffor, self.fsize, 0, 0)
        printf('%s',self.buffor)
        CloseHandle(self.handle)
    :2}

.data?
    P1_fs FileSystem 2 dup\\({}\\)

function P1_main():1{
    FileSystem_constructor(P1_fs[0])

    FileSystem_ReadFileSync(P1_fs[0],'default.frag')
    FileSystem_ReadFileSync(P1_fs[0],'default.vert')
:1}