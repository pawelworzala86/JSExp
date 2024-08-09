var matA = NULL

var matrixZero = 0.0
var matrixOne = 1.0

//var matIndex = 0

function mat4_create(){
    rax = malloc(16*8)
    //return out
}
function mat4_identity(out){
    /*for(matIndex = 0;matIndex<16;matIndex++){
        out[matIndex] = matrixZero
    }*/
    out[0] = matrixOne
    out[1] = matrixZero
    out[2] = matrixZero
    out[3] = matrixZero

    out[4] = matrixZero
    out[5] = matrixOne
    out[6] = matrixZero
    out[7] = matrixZero

    out[8] = matrixZero
    out[9] = matrixZero
    out[10] = matrixOne
    out[11] = matrixZero

    out[12] = matrixZero
    out[13] = matrixZero
    out[14] = matrixZero
    out[15] = matrixOne
}


function main(){

    matA = mat4_create()

    mat4_identity(matA)

    printf('ok')
}