fs = require('fs')


var vertices = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]

console.log('coords',coords.length*8)

var array = []
function addF64A(arr){
    var array64 = new Float64Array(arr)
    var array8 = new Uint8Array(array64.buffer)
    //array8.map(f=>{array.push(f)})
    for(let i=0;i<array8.length;i++){
        array.push(array8[i])
    }
}
function addI64(arr){
    var array64 = new BigUint64Array(arr)
    var array8 = new Uint8Array(array64.buffer)
    //array8.map(f=>{array.push(f)})
    for(let i=0;i<array8.length;i++){
        array.push(array8[i])
    }
}

addI64([BigInt(vertices.length/3/3)])//triangles
//addI64([BigInt(vertices.length*8)])
addF64A(vertices)
//addI64([BigInt(coords.length*8)])
addF64A(coords)


var out = new Uint8Array(array)

fs.writeFileSync('./out/model.bin',out)

console.log(array)