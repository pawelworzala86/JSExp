import * as fs from './fs.js'

var vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

var VAO = 0
var bufferID = 0

function CreateBuffer(posID,ssize,length,array){
	//lea rax, bufferID
	glGenBuffers(1, &bufferID)

	glBindBuffer(GL_ARRAY_BUFFER, bufferID)
    glBufferData(GL_ARRAY_BUFFER, length*8, array,GL_STATIC_DRAW)

    glEnableVertexAttribArray(posID)
	glVertexAttribPointer(posID,ssize,GL_DOUBLE,GL_FALSE, ssize*8, 0)
}

var vertexShader = 0
var fragmentShader = 0

var programID = 0





function SystemInit(){

    InitGL()

    //fs.ReadFileSync('default.frag')
    fs.ReadFileSync('default.vert')

	//printf('shader %s', buffor)

	vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader,1, fs.buffor, fs.fsize);
    glCompileShader(vertexShader);

    printf('OK')

}
function SystemRender(){
    
}
function SystemDestroy(){
    
}