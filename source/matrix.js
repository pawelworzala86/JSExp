var matA = NULL

var matrixZero = 0.0
var matrixOne = 1.0

var matIndex = 0

function mat4_create(out){
    out = malloc(16*8)
}
function mat4_identity(out){
    for(matIndex = 0;matIndex<16;matIndex++){
        out[matIndex] = matrixZero
    }
    out[0] = matrixOne
    out[5] = matrixOne
    out[10] = matrixOne
    out[15] = matrixOne
}
function mat4_print(caption,mat){
    printf('%s %s',caption, lf)
    printf('%f', mat[0])
    printf(', %f', mat[1])
    printf(', %f', mat[2])
    printf(', %f', mat[3])
    printf(lf)
    printf('%f', mat[4])
    printf(', %f', mat[5])
    printf(', %f', mat[6])
    printf(', %f', mat[7])
    printf(lf)
    printf('%f', mat[8])
    printf(', %f', mat[9])
    printf(', %f', mat[10])
    printf(', %f', mat[11])
    printf(lf)
    printf('%f', mat[12])
    printf(', %f', mat[13])
    printf(', %f', mat[14])
    printf(', %f', mat[15])
    printf(lf)
}


function main(){

    mat4_create(matA)

    mat4_identity(matA)

    mat4_print('mat4_identity',matA)

    printf('ok')
}