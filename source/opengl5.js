import {fs} from './file.js'
import * as matrix from './matrix.js'
import {loadTexture} from './texture.js'
import * as shader from './shader.js'
import {Mesh} from './mesh.js'






var projectionMatrix = Array(16)
var cameraMatrix = Array(16)
var modelMatrix = Array(16)

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











var vertsSizeBuff = 0
var cordsSizeBuff = 0

var vertsBuff = NULL
var coordsBuff = NULL

function SystemInit(){
    FreeImage_Initialise()

    InitGL()

    

    defaultShader = shader.load()

    
    

    meshes[0].constructor()

    fs.open('model.bin')

    vertsSizeBuff = fs.readInt()
    vertsBuff = fs.read(vertsSizeBuff)

    cordsSizeBuff = fs.readInt()
    coordsBuff = fs.read(cordsSizeBuff)

    meshes[0].createGeometry(vertsBuff,coordsBuff)

    fs.close()



    textureID = loadTexture(&texName)

    
    


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
    meshes[0].render(defaultShader,projectionMatrix,cameraMatrix,modelMatrix,textureID)
}
function SystemDestroy(){
}