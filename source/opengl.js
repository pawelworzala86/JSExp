import * as fs from './fs.js'

var vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

var VAO = 0
var bufferID = 0




function SystemInit(){

    InitGL()

    fs.ReadFileSync('default.frag')

    printf('OK')

}
function SystemRender(){
    
}
function SystemDestroy(){
    
}