include fs.asm


var P1_vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var P1_vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var P1_coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

var P1_VAO = 0
var P1_bufferID = 0




function P1_SystemInit(){

    InitGL()

    P2_ReadFileSync('default.frag')

    printf('OK')

}
function P1_SystemRender(){
    
}
function P1_SystemDestroy(){
    
}