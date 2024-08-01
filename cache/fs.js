
var P1_handle = 0
var P1_fsize = 0
var P1_buffor = 0

function P1_ReadFileSync(fileName){
    CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    mov P1_handle, rax
    GetFileSize(P1_handle, 0)
    mov P1_fsize, rax
    printf('P1_fsize %i',P1_fsize)
    P1_buffor = malloc(P1_fsize)
    //mov P1_buffor, rax
    ReadFile(P1_handle, P1_buffor, P1_fsize, 0, 0)
    printf('%s',P1_buffor)
    CloseHandle(P1_handle)
}
function P1_main(){
    P1_ReadFileSync('default.frag')
    P1_ReadFileSync('default.vert')
}