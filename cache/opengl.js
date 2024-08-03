include fs.asm


var P1_vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var P1_vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var P1_coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

var P1_VAO = 0
var P1_bufferID = 0

function P1_CreateBuffer(posID,ssize,sssize,length,array){
	//lea rax, P1_bufferID
	glGenBuffers(1, &P1_bufferID)

    printf('1')

	glBindBuffer(GL_ARRAY_BUFFER, P1_bufferID)
    printf('2')
    glBufferData(GL_ARRAY_BUFFER, length, array,GL_STATIC_DRAW)
    
    printf('2')

    glEnableVertexAttribArray(posID)
	glVertexAttribPointer(posID,ssize,GL_DOUBLE,GL_FALSE, sssize, 0)
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
    glShaderSource(P1_vertexShader,1, &P2_buffor, &P2_fsize);
    glCompileShader(P1_vertexShader);

    printf('OK')

    P2_ReadFileSync('default.frag')

	P1_fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(P1_fragmentShader,1, &P2_buffor, &P2_fsize);
    glCompileShader(P1_fragmentShader);


    P1_programID = glCreateProgram();
    glAttachShader(P1_programID, P1_vertexShader);
    glAttachShader(P1_programID, P1_fragmentShader);
    glLinkProgram(P1_programID);

	glUseProgram(P1_programID);
    //gl.ValidateProgram,*P1_programID

    glDetachShader(P1_programID, P1_vertexShader);
	glDetachShader(P1_programID, P1_fragmentShader);

    glDeleteShader(P1_vertexShader);
    glDeleteShader(P1_fragmentShader);

    glGenVertexArrays(1, &P1_VAO)
	printf('OK %i', P1_VAO)
    glBindVertexArray(P1_VAO)

    printf('before')

    P1_CreateBuffer(0,3,3*8,18*8,P1_vertices)
    P1_CreateBuffer(1,2,2*8,12*8,P1_coords)

    glBindVertexArray(0)
}
function P1_SystemRender(){
    
}
function P1_SystemDestroy(){
    
}