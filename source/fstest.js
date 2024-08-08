
//var handle = 0
var fsize = 0
//var buffor = 0

class FileSystem{
    constructor(){
        this.handle = 0
        this.fsize = 0
        this.buffor = 0
    }
    ReadFileSync(fileName){
        this.handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        //mov handle, rax
        this.fsize = GetFileSize(this.handle, 0)
        //mov fsize, rax
        printf('fsize %i',this.fsize)
        this.buffor = malloc(this.fsize)
        //mov buffor, rax
        ReadFile(this.handle, this.buffor, this.fsize, 0, 0)
        printf('%s',this.buffor)
        CloseHandle(this.handle)
    }
}

var fs = new FileSystem()

function main(){
    fs.constructor()

    fs.ReadFileSync('default.frag')
    fs.ReadFileSync('default.vert')
}