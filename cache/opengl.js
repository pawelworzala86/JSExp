include fs.asm


var P1_vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var P1_vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var P1_coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

var P1_VAO = 0
var P1_bufferID = 0

function P1_CreateBuffer(posID,ssize,length,array){
	//lea rax, P1_bufferID
	glGenBuffers(1, &P1_bufferID)

	glBindBuffer(GL_ARRAY_BUFFER, P1_bufferID)
    glBufferData(GL_ARRAY_BUFFER, length*8, array,GL_STATIC_DRAW)

    glEnableVertexAttribArray(posID)
	glVertexAttribPointer(posID,ssize,GL_DOUBLE,GL_FALSE, ssize*8, 0)
}

var P1_vertexShader = 0
var P1_fragmentShader = 0

var P1_programID = 0





function P1_SystemInit(){

    InitGL()

    //P2_ReadFileSync('default.frag')
    P2_ReadFileSync('default.vert')

	//printf('shader %s', buffor)

	P1_vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(P1_vertexShader,1, fs.buffor, fs.fsize);
    glCompileShader(P1_vertexShader);

    printf('OK')

}
function P1_SystemRender(){
    
}
function P1_SystemDestroy(){
    
}