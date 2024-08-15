//var triangles = 2
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
var numsInVert = 3
var numsInCoord = 2
var coords = 2
var verts = 3

export class Mesh{
    constructor(){
        this.VAO = 0
    }
    createGeometry(triangles,verts,coordsBu){
        glGenVertexArrays(1, &this.VAO)
        glBindVertexArray(this.VAO)

        vertLenght = numsInVert * vertNums * triangles
        coordLength = numsInCoord * vertNums * triangles

        printf('coordLength %i',coordLength)

        vertSize = vertLenght * bytes
        coordSize = coordLength * bytes

        vertSingleSize = vertNums * bytes
        coordSingleSize = coordNums * bytes

        CreateBuffer(0,vertNums,vertSingleSize,vertSize,verts)
        CreateBuffer(1,coordNums,coordSingleSize,coordSize,coordsBu)

        printf('after')

        glBindVertexArray(0)
    }
    render(defaultShader,projectionMatrix,cameraMatrix,modelMatrix,textureID){
        glUseProgram(defaultShader)

        MacroSetUniformMatrix(defaultShader, 'd_projection', projectionMatrix)
        MacroSetUniformMatrix(defaultShader, 'd_camera', cameraMatrix)
        MacroSetUniformMatrix(defaultShader, 'd_model', modelMatrix)
    
        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_2D, textureID)
        MacroSetUniform1i(defaultShader, 'diffuseTexture', 0)
    
        //glBindVertexArray(VAO)
        glBindVertexArray(this.VAO)
        glDrawArrays(GL_TRIANGLES, 0, 6)
    }
}

var bufferID = 0

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


var uniformLocation = 0

function MacroSetUniform1i(program,name,value){
    uniformLocation = glGetUniformLocation(program, name)
    //printf("uniformLocation=%i",uniformLocation)
    glUniform1i(uniformLocation, value)
}

function MacroSetUniformMatrix(program,name,value){
    uniformLocation = glGetUniformLocation(program, name)
    //if(uniformLocation > -1){
        glUniformMatrix4dv(uniformLocation, 1, 0, &value)
    //}
}