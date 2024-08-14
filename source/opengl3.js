import {fs} from './file.js'
import * as matrix from './matrix.js'

var vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

var VAO = 0
var bufferID = 0

var projectionMatrix = Array(16)//[1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0]
var cameraMatrix = Array(16)//[1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-2.100090086,1.0]
var modelMatrix = Array(16)//[1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]

var cameraVector = [0.0,0.0,-2.1]

var fovy = 45.0
var aspect = 1.0
var near = 0.1
var far = 1000.0

var emptyMatrix = Array(16)

var triangles = 2
var points = 3
var vertNums = 3
var coordNums = 2
var vertSingleSize = 3*8
var coordSingleSize = 2*8
var bytes = 8
var vertLenght = 18
var coordLength = 12
var vertSize = 0
var coordSize = 0

class Mesh{
    constructor(){
        this.VAO = 0
    }
    createGeometry(verts,coordsBu){
        glGenVertexArrays(1, &this.VAO)
        glBindVertexArray(this.VAO)

        vertSize = vertLenght * bytes
        coordSize = coordLength * bytes

        CreateBuffer(0,vertNums,vertSingleSize,vertSize,verts)
        CreateBuffer(1,coordNums,coordSingleSize,coordSize,coordsBu)

        printf('after')

        glBindVertexArray(0)
    }
}

var meshes = new Mesh(32)










function CreateBuffer(posID,ssize,sssize,length,array){
	//lea rax, bufferID
	glGenBuffers(1, &bufferID)

    printf('1')

	glBindBuffer(GL_ARRAY_BUFFER, bufferID)
    printf('2')
    glBufferData(GL_ARRAY_BUFFER, length, array,GL_STATIC_DRAW)
    
    printf('2')

    glEnableVertexAttribArray(posID)
	glVertexAttribPointer(posID,ssize,GL_DOUBLE,GL_FALSE, sssize, 0)
}

var vertexShader = 0
var fragmentShader = 0

var programID = 0



var vertsSizeBuff = NULL
var cordsSizeBuff = NULL

var vertsBuff = NULL
var coordsBuff = NULL

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

    //glGenVertexArrays(1, &VAO)
    //glBindVertexArray(VAO)

    //printf('before')

    meshes[0].constructor()

    fs.Open('model.bin')

    fs.Read(8)
    vertsSizeBuff = fs.buffor

    fs.Read(vertsSizeBuff)
    vertsBuff = fs.buffor

    fs.Read(8)
    cordsSizeBuff = fs.buffor

    fs.Read(cordsSizeBuff)
    coordsBuff = fs.buffor

    meshes[0].createGeometry(vertsBuff,coordsBuff)

    fs.Close()

    /*glGenVertexArrays(1, &meshes[0].VAO)
    glBindVertexArray(meshes[0].VAO)

    CreateBuffer(0,3,3*8,18*8,vertices)
    CreateBuffer(1,2,2*8,12*8,coords)

    printf('after')

    glBindVertexArray(0)*/


    //matrix.create(emptyMatrix)
    matrix.identity(emptyMatrix)

    //matrix.create(modelMatrix)
    matrix.identity(modelMatrix)
    matrix.print('modelMatrix',modelMatrix)

    matrix.translate(cameraMatrix,emptyMatrix,cameraVector)
    matrix.print('cameraMatrix',cameraMatrix)

    ///matrix.create(modelMatrix)
    matrix.identity(projectionMatrix)
    matrix.perspective(projectionMatrix,fovy,aspect,near,far)
    matrix.print('perspectiveNO',projectionMatrix)
}



var uniformLocation = 0

function MacroSetUniform1i(program,name,value){
    uniformLocation = gl.GetUniformLocation(program, name)
        //printf("uniformLocation=%i",uniformLocation)
    gl.Uniform1i(uniformLocation, value)
}

function MacroSetUniformMatrix(program,name,value){
    uniformLocation = gl.GetUniformLocation(program, name)
    //if(uniformLocation > -1){
        gl.UniformMatrix4dv(uniformLocation, 1, 0, &value)
    //}
}


function SystemRender(){
    MacroSetUniformMatrix(programID, 'd_projection', projectionMatrix)
    MacroSetUniformMatrix(programID, 'd_camera', cameraMatrix)
    MacroSetUniformMatrix(programID, 'd_model', modelMatrix)

    //glBindVertexArray(VAO)
    glBindVertexArray(meshes[0].VAO)
	glDrawArrays(GL_TRIANGLES, 0, 6)
}
function SystemDestroy(){
    
}