
var handle = 0
var fsize = 0
var buffor = 0

class FileSystem{
    constructor(){
        this.handle = 0
        this.fsize = 0
        this.buffor = 0
    }
    ReadFileSync(fileName){
        this.handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        //mov handle, rax
        fsize = GetFileSize(this.handle, 0)
        //mov fsize, rax
        printf('fsize %i',fsize)
        buffor = malloc(fsize)
        //mov buffor, rax
        ReadFile(this.handle, buffor, fsize, 0, 0)
        printf('%s',buffor)
        CloseHandle(this.handle)
    }
}

var fs = new FileSystem()

function main(){
    fs.constructor()

    fs.ReadFileSync('default.frag')
    fs.ReadFileSync('default.vert')
}