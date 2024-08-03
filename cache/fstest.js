
var P1_handle = 0
var P1_fsize = 0
var P1_buffor = 0

class FileSystem{
    constructor(){
        this.P1_handle = 0
        this.P1_fsize = 0
        this.P1_buffor = 0
    }
    ReadFileSync(fileName){
        this.P1_handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        //mov P1_handle, rax
        this.P1_fsize = GetFileSize(this.P1_handle, 0)
        //mov P1_fsize, rax
        printf('P1_fsize %i',this.P1_fsize)
        this.P1_buffor = malloc(this.P1_fsize)
        //mov P1_buffor, rax
        ReadFile(this.P1_handle, &this.P1_buffor, &this.P1_fsize, 0, 0)
        printf('%s',this.P1_buffor)
        CloseHandle(this.P1_handle)
    }
}

var P1_fs = new FileSystem()

function P1_main(){
    P1_fs.constructor()

    P1_fs.ReadFileSync('default.frag')
    P1_fs.ReadFileSync('default.vert')
}