
//var P1_handle = 0
var P1_fsize = 0
//var P1_buffor = 0



FileSystem STRUCT
P1_handle QWORD ?
P1_fsize QWORD ?
P1_buffor QWORD ?
FileSystem ENDS


    function FileSystem_constructor(self):2{
        self.P1_handle = 0
        self.P1_fsize = 0
        self.P1_buffor = 0
    :2}
    function FileSystem_ReadFileSync(self,fileName):2{
        self.P1_handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        //mov P1_handle, rax
        self.P1_fsize = GetFileSize(self.P1_handle, 0)
        //mov P1_fsize, rax
        printf('P1_fsize %i',self.P1_fsize)
        self.P1_buffor = malloc(self.P1_fsize)
        //mov P1_buffor, rax
        ReadFile(self.P1_handle, self.P1_buffor, self.P1_fsize, 0, 0)
        printf('%s',self.P1_buffor)
        CloseHandle(self.P1_handle)
    :2}

.data?
P1_fs label FileSystem

function P1_main():1{
    FileSystem_constructor(P1_fs)

    FileSystem_ReadFileSync(P1_fs,'default.frag')
    FileSystem_ReadFileSync(P1_fs,'default.vert')
:1}