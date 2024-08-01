
export var P2_handle = 0
export var P2_fsize = 0
export var P2_buffor = 0

export function P2_ReadFileSync(fileName){
    CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    mov P2_handle, rax
    GetFileSize(P2_handle, 0)
    mov P2_fsize, rax
    printf('P2_fsize %i',P2_fsize)
    P2_buffor = malloc(P2_fsize)
    //mov P2_buffor, rax
    ReadFile(P2_handle, P2_buffor, P2_fsize, 0, 0)
    printf('%s',P2_buffor)
    CloseHandle(P2_handle)
}
function P2_main(){
    P2_ReadFileSync('default.frag')
    P2_ReadFileSync('default.vert')
}