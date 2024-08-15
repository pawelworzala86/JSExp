fs = require('fs')



var OBJCACHE = {}

function loadOBJ(path){
    if(OBJCACHE[path]){
        return OBJCACHE[path]
    }
    const obj = fs.readFileSync(path).toString()

    const lines = obj.split('\n')

    var meshes = []
    var model = {position:[],normal:[],coord:[],indices:[],}
    var outmodel
    function newMesh(){
        //model = {position:[],normal:[],coord:[],indices:[],}
        outmodel = {position:[],normal:[],coord:[]}
        meshes.push(outmodel)
    }

    //console.log(lines[0])
    var FUNCS = {
        o(params){
            newMesh()
        },
        v(params){
            model.position.push(params.map(parseFloat))
        },
        vn(params){
        model.normal.push(params.map(parseFloat))
        },
        vt(params){
        model.coord.push(params.map(parseFloat))
        },
        f(params){
            params=params.map(f=>{
                var arr = f.split('/')
                arr = arr.map(a=>parseInt(a))
                //model.indices.push(...arr)
                return arr
            })
            outmodel.position.push(
                ...model.position[params[0][0]-1],
                ...model.position[params[1][0]-1],
                ...model.position[params[2][0]-1]
            )
            outmodel.coord.push(
                ...model.coord[params[0][1]-1],
                ...model.coord[params[1][1]-1],
                ...model.coord[params[2][1]-1]
            )
            outmodel.normal.push(
                ...model.normal[params[0][2]-1],
                ...model.normal[params[1][2]-1],
                ...model.normal[params[2][2]-1]
            )
            //model.indices.push(params[0][1],params[1][1],params[2][1])
            //model.indices.push(params[0][2],params[1][2],params[2][2])
        },
    }

    

    for(const line of lines){

        var key = line.split(' ')[0]
        var params = line.split(' ').map(a=>a.trim())
        params.splice(0,1)
        
        if(FUNCS[key]!==undefined){
            FUNCS[key](params)
        }

    }

    OBJCACHE[path] = meshes

    return meshes
}


  var data = []
function addF64A(arr){
    var array64 = new Float64Array(arr)
    var array8 = new Uint8Array(array64.buffer)
    //array8.map(f=>{array.push(f)})
    for(let i=0;i<array8.length;i++){
        data.push(array8[i])
    }
}
function addI64(arr){
    var array64 = new BigUint64Array(arr)
    var array8 = new Uint8Array(array64.buffer)
    //array8.map(f=>{array.push(f)})
    for(let i=0;i<array8.length;i++){
        data.push(array8[i])
    }
}
function addString(arr){
    for(let i=0;i<arr.length;i++){
        data.push(arr.charCodeAt(i))
    }
}

async function loadModel(path, modelName, destiny, nsize=undefined){



    obj = loadOBJ('./out/worzala.obj')
    console.log(obj)


    for(const mesh of obj){

        //coords,positions,indices

        //console.log(mesh.geometry.positions)

        addI64([BigInt(mesh.position.length/3/3)])

        //addI64([BigInt(mesh.geometry.positions.length*8)])
        addF64A([...mesh.position])
        //addI64([BigInt(mesh.geometry.coords.length*8)])
        addF64A([...mesh.coord])
        //addI64([BigInt(mesh.geometry.indices.length*8)])
        //addF64A([...mesh.geometry.indices].map(BigInt))

    }

    var array8 = new Uint8Array(data)
    fs.writeFileSync('./out/worzala.bin',array8)

}

loadModel()