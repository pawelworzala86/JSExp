import {fs} from './fstest.js'

var vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

var VAO = 0
var bufferID = 0

function CreateBuffer(posID,ssize,sssize,length,array){
	//lea rax, bufferID
	glGenBuffers(1, &bufferID)

    printf('1')

	glBindBuffer(GL_ARRAY_BUFFER, bufferID)
    printf('2')
    glBufferData(GL_ARRAY_BUFFER, length, &array,GL_STATIC_DRAW)
    
    printf('2')

    glEnableVertexAttribArray(posID)
	glVertexAttribPointer(posID,ssize,GL_DOUBLE,GL_FALSE, sssize, 0)
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
    glShaderSource(vertexShader,1, &fs.buffor, &fs.fsize);
    glCompileShader(vertexShader);

    printf('OK')

    fs.ReadFileSync('default.frag')

	fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader,1, &fs.buffor, &fs.fsize);
    glCompileShader(fragmentShader);


    programID = glCreateProgram();
    glAttachShader(programID, vertexShader);
    glAttachShader(programID, fragmentShader);
    glLinkProgram(programID);

	glUseProgram(programID);
    //gl.ValidateProgram,*programID

    glDetachShader(programID, vertexShader);
	glDetachShader(programID, fragmentShader);

    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);

    glGenVertexArrays(1, &VAO)
	printf('OK %i', VAO)
    glBindVertexArray(VAO)

    printf('before')

    CreateBuffer(0,3,3*8,18*8,vertices)
    CreateBuffer(1,2,2*8,12*8,coords)

    printf('after')

    glBindVertexArray(0)
}
function SystemRender(){
    glBindVertexArray(VAO)
	glDrawArrays(GL_TRIANGLES, 0, 6)
}
function SystemDestroy(){
    
}