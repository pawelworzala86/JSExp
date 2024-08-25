IFNDEF _FILE_INC_
_FILE_INC_ EQU 1

//var handle = 0
//var fsize = 0
//.data?
//    buffStr db 1024 dup (0)

class FileSystem{
    constructor(){
        this.handle = 0
        this.fsize = 0
        this.buffor = 0
        this.bufforInt = 0
        this.bufforStr = ''
    }
    readFileSync(fileName){
        this.handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        this.fsize = GetFileSize(this.handle, 0)
        this.buffor = malloc(this.fsize)
        ReadFile(this.handle, this.buffor, this.fsize, 0, 0)
        CloseHandle(this.handle)
    }
    open(fileName){
        this.handle = CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        this.fsize = GetFileSize(this.handle, 0)
        this.buffor = malloc(this.fsize)
    }
    read(ssize){
        this.buffor = malloc(ssize)
        ReadFile(this.handle, this.buffor, ssize, 0, 0)
        return this.buffor
    }
    readInt(){
        //this.bufforInt = malloc(8)
        ReadFile(this.handle, addr this.bufforInt, 8, 0, 0)
        return this.bufforInt
    }
    readString(ssize){
        inc ssize
        this.bufforStr = malloc(ssize)
        //dec ssize
        ReadFile(this.handle, this.bufforStr, ssize, 0, 0)
        printf('READSTR %s', this.bufforStr)
        return this.bufforStr
    }
    close(){
        CloseHandle(this.handle)
    }
}

var fs = new FileSystem()

export fs

function main(){
    fs.constructor()

    fs.readFileSync('default.frag')
    fs.readFileSync('default.vert')
}

ENDIF