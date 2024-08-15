import {fs} from './file.js'
import * as matrix from './matrix.js'
import {loadTexture} from './texture.js'
import * as shader from './shader.js'
import {Mesh} from './mesh.js'

//var vertices = [1.0,0.9,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
//var vertices2 = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
//var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

//var VAO = 0
//var bufferID = 0

var projectionMatrix = Array(16)//[1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0]
var cameraMatrix = Array(16)//[1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-2.100090086,1.0]
var modelMatrix = Array(16)//[1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]

var cameraVector = [0.0,0.0,-2.1]

var fovy = 45.0
var aspect = 1.0
var near = 0.1
var far = 1000.0

var emptyMatrix = Array(16)




var textureID = 0
var texName = 'texture.jpg'


var defaultShader = 0




var meshes = new Mesh(32)












var vertexShader = 0
var fragmentShader = 0

var programID = 0



var vertsSizeBuff = 0
var cordsSizeBuff = 0

var vertsBuff = NULL
var coordsBuff = NULL

function SystemInit(){
    FreeImage_Initialise()

    InitGL()

    //fs.ReadFileSync('default.frag')
    /*fs.readFileSync('default.vert')

	//printf('shader %s', buffor)

	vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader,1, &fs.buffor, &fs.fsize);
    glCompileShader(vertexShader);

    printf('OK')

    fs.readFileSync('default.frag')

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
    glDeleteShader(fragmentShader);*/

    defaultShader = shader.load()

    //glGenVertexArrays(1, &VAO)
    //glBindVertexArray(VAO)

    //printf('before')

    meshes[0].constructor()

    fs.open('model.bin')

    vertsSizeBuff = fs.readInt()
    printf('VERTEX %i',vertsSizeBuff)

    vertsBuff = fs.read(vertsSizeBuff)
    //vertsBuff = fs.buffor
    //printf('VERTEX %f',vertsBuff[0])

    cordsSizeBuff = fs.readInt()

    coordsBuff = fs.read(cordsSizeBuff)
    //coordsBuff = fs.buffor

    meshes[0].createGeometry(vertsBuff,coordsBuff)

    fs.close()

    textureID = loadTexture(&texName)

    printf('textureID %i', textureID)

    /*glGenVertexArrays(1, &meshes[0].VAO)
    glBindVertexArray(meshes[0].VAO)

    CreateBuffer(0,3,3*8,18*8,vertices)
    CreateBuffer(1,2,2*8,12*8,coords)

    printf('after')

    glBindVertexArray(0)*/


    /*matrix.create(emptyMatrix)
    matrix.create(modelMatrix)
    matrix.create(cameraMatrix)
    matrix.create(projectionMatrix)*/

    matrix.identity(emptyMatrix)

    matrix.identity(modelMatrix)
    matrix.print('modelMatrix',modelMatrix)

    matrix.translate(cameraMatrix,emptyMatrix,cameraVector)
    matrix.print('cameraMatrix',cameraMatrix)

    matrix.identity(projectionMatrix)
    matrix.perspective(projectionMatrix,fovy,aspect,near,far)
    matrix.print('perspectiveNO',projectionMatrix)

    //glActiveTexture(GL_TEXTURE0);
    //glEnable(GL_DEPTH_TEST)
    //glDepthFunc(GL_LEQUAL)
    glEnable(GL_TEXTURE_2D)
}





function SystemRender(){
    /*MacroSetUniformMatrix(programID, 'd_projection', projectionMatrix)
    MacroSetUniformMatrix(programID, 'd_camera', cameraMatrix)
    MacroSetUniformMatrix(programID, 'd_model', modelMatrix)

    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_2D, textureID)
    MacroSetUniform1i(programID, 'diffuseTexture', 0)

    //glBindVertexArray(VAO)
    glBindVertexArray(meshes[0].VAO)
	glDrawArrays(GL_TRIANGLES, 0, 6)*/

    meshes[0].render(defaultShader,projectionMatrix,cameraMatrix,modelMatrix,textureID)
}
function SystemDestroy(){
    //FreeImage_Unload()
}