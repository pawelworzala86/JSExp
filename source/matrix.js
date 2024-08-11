var matA = Array(16)
var matB = Array(16)

var matrixZero = 0.0
var matrixTwo = 2.0
var matrixOne = 1.0
var matrixOneMinus = -1.0

var matIndex = 0

export function create(out){
    out = malloc(16*8)
}
export function identity(out){
    for(matIndex = 0;matIndex<16;matIndex++){
        out[matIndex] = matrixZero
    }
    out[0] = matrixOne
    out[5] = matrixOne
    out[10] = matrixOne
    out[15] = matrixOne
}
export function print(caption,mat){
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
var nf = 0.0
var nfA = 0.0
export function perspective(out,fovy,aspect,near,far){
    mfv = fovy / matrixTwo
    Macro_Math_tan(mfv, mtan)
    fff = matrixOne / mtan
    out[0] = fff / aspect;
    out[1] = matrixZero;
    out[2] = matrixZero;
    out[3] = matrixZero
    out[4] = matrixZero
    out[5] = fff;
    out[6] = matrixZero
    out[7] = matrixZero
    out[8] = matrixZero
    out[9] = matrixZero
    out[11] = matrixOneMinus;
    out[12] = matrixZero
    out[13] = matrixZero
    out[15] = matrixZero
    //if (far != null && far !== Infinity) {
        nfA = near - far
      nf = matrixOne / nfA;
      nfA = far + near
      out[10] = nfA * nf;
      out[14] = matrixTwo * far * near * nf;
    //} else {
    //  out[10] = -1;
    //  out[14] = -2 * near;
    //}
    //return out;
}
var x = 0.0
var y = 0.0
var z = 0.0
var a00 = 0.0
var a01 = 0.0 
var a02 = 0.0 
var a03 = 0.0
var a10 = 0.0 
var a11 = 0.0 
var a12 = 0.0 
var a13 = 0.0
var a20 = 0.0 
var a21 = 0.0 
var a22 = 0.0 
var a23 = 0.0
export function translate(out, a, v) {
    x = v[0]
    y = v[1]
    z = v[2]

    /*if (a == out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {*/
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
  
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
  
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    //}
  
    //return out;
  }


var fovy = 45.0
var aspect = 1.0
var near = 0.1
var far = 1000.0

var translateVector = [0.0,0.0,-2.1]

function main(){

    create(matA)
    create(matB)

    identity(matA)
    print('identity',matA)

    perspective(matA,fovy,aspect,near,far)
    print('perspectiveNO',matA)

    identity(matA)
    identity(matB)
    translate(matA,matB,translateVector)
    print('translate',matA)

    printf('ok')
}