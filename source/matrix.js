var matA = NULL

var matrixZero = 0.0
var matrixTwo = 2.0
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
var mtan = 0.0
var mfv = 0.0
var fff = 0.0
function mat4_perspectiveNO(out,fovy,aspect,near,far){
    mfv = fovy / matrixTwo
    Macro_Math_tan(mfv, mtan)
    fff = matrixOne / mtan
    /*out[0] = fff / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;*/
    //if (far != null && far !== Infinity) {
      //var nf = 1 / (near - far);
      //out[10] = (far + near) * nf;
      //out[14] = 2 * far * near * nf;
    //} else {
    //  out[10] = -1;
    //  out[14] = -2 * near;
    //}
    //return out;
  }


function main(){

    mat4_create(matA)

    mat4_identity(matA)

    mat4_print('mat4_identity',matA)

    printf('ok')
}