
//var handle = 0
//var fsize = 0
//var buffor = 0

class FileSystem{
    constructor(){
        this.handle = 0
        this.fsize = 0
        this.buffor = 0
    }
    ReadFileSync(fileName){
        this.handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        this.fsize = GetFileSize(this.handle, 0)
        this.buffor = malloc(this.fsize)
        ReadFile(this.handle, this.buffor, this.fsize, 0, 0)
        CloseHandle(this.handle)
    }
    Open(fileName){
        this.handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        this.fsize = GetFileSize(this.handle, 0)
        this.buffor = malloc(this.fsize)
    }
    Read(ssize){
        this.buffor = malloc(ssize)
        ReadFile(this.handle, this.buffor, ssize, 0, 0)
    }
    Close(){
        CloseHandle(this.handle)
    }
}

var fs = new FileSystem()

export fs

function main(){
    fs.constructor()

    fs.ReadFileSync('default.frag')
    fs.ReadFileSync('default.vert')
}