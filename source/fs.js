
export var handle = 0
export var fsize = 0
export var buffor = 0

export function ReadFileSync(fileName){
    CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    mov handle, rax
    GetFileSize(handle, 0)
    mov fsize, rax
    printf('fsize %i',fsize)
    buffor = malloc(fsize)
    //mov buffor, rax
    ReadFile(handle, buffor, fsize, 0, 0)
    printf('%s',buffor)
    CloseHandle(handle)
}
function main(){
    ReadFileSync('default.frag')
    ReadFileSync('default.vert')
}