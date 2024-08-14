const fs = require('fs')

const Danger = require('./danger.js')
const Obj = require('./object.js')

// code of clousure scope


function Blocks(source){
    let newSource = ''
    var tab = 1
    for(let index=0;index<source.length;index++){
        if(source[index]=='{'){
            newSource += tab+':'
            tab++
        }
        if(source[index]=='}'){
            newSource += (tab-1)+':'
            tab--
        }
        newSource += source[index]
    }
    return newSource
}

var DATA = []
var FILE_INDEX = 1

var FILES = {}
var SOURCES = {}
var EXPORTS = {}

var GLFuncs = []

function getFI(file){
    if(FILES[file]){
        return FILES[file]
    }else{
        FILES[file] = FILE_INDEX
        FILE_INDEX++
    }
    console.log('getFI',file)
    return FILES[file]
}

function Prepare(source){
    function r(reg,func){
        source = source.replace(reg,func)
    }

    r(/\)[\ ]*\{/gm,'){')
    r(/[\ ]*\=[\ ]*/gm,' = ')
    r(/[\ ]*\*[\ ]*/gm,' * ')
    r(/[\ ]*\/[\ ]*/gm,' / ')
    r(/[\ ]*\-[\ ]*/gm,' - ')
    r(/[\ ]*\+[\ ]*/gm,' + ')
    r(/\}[\ ]*\{/gm,'}else{')

    return source
}

function Parse(file){

    const prefix = 'P'+getFI(file)
    //FILES[file] = FILE_INDEX
    //FILE_INDEX++

    let source = fs.readFileSync('./source/'+file).toString()


    //source = Obj(source)


    
    source = Prepare(source)



    

    source = Blocks(source)

    function r(reg,func){
        source = source.replace(reg,func)
    }






    ///                    fix NAMES

    var LOCAL_DATA = []
    var LOCAL_FUNCTIONS = []

    r(/function\ ([a-zA-Z0-9\_]+)/gm,match=>{
        var name = match.replace('function ','')
        LOCAL_FUNCTIONS.push(name)
        return match
    })
    r(/function\ /gm,'function '+prefix+'_')

    r(/var\ ([a-zA-Z0-9\_]+)/gm,match=>{
        var name = match.split(' ')[1]
        LOCAL_DATA.push(name)
        return match
    })

    console.log('LOCAL_DATA',LOCAL_DATA)

    LOCAL_DATA.map(name=>{
        r(new RegExp('(\\b)'+name+'(\\b)','gm'),'$1'+prefix+'_'+name+'$2')
    })
    LOCAL_FUNCTIONS.map(name=>{
        r(new RegExp('(\\b)'+name+'(\\b)','gm'),'$1'+prefix+'_'+name+'$2')
    })

    for(let i=1;i<32;i++){
        var bidx = i
        r(new RegExp(bidx+'\\:\\{([\\s\\S]+?)'+bidx+'\\:\\}','gm'), match=>{
            var BLOCK_LOCAL_DATA = []
            var prfx = match.split(':')[0]

            match=match.replace(/var\ ([a-zA-Z0-9\_]+)/gm,match2=>{
                var name = match2.split(' ')[1]
                BLOCK_LOCAL_DATA.push(name)
                return match2
            })
        
            console.log('BLOCK_LOCAL_DATA',BLOCK_LOCAL_DATA)
        
            BLOCK_LOCAL_DATA.map(name=>{
                match=match.replace(new RegExp('(\\b)'+name+'(\\b|\\(|\\ )','gm'),'$1B'+prfx+'_'+name+'$2')
            })

            return match
        })
    }


    //exports
    function Exports(fileImp){
        console.log('Exports',fileImp)
        console.log('getFI(fileImp)',getFI(fileImp))
        var exp = EXPORTS[getFI(fileImp)]
        console.log('Exports',exp)
        return exp
    }

    //                      imports

    var IMP = {}
    r(/import\ (.*)/gm, match=>{
        var fileImp = match.split('\'')[1].split('\'')[0].trim()
        fileImp = fileImp.replace('./','')
        console.log('file',fileImp)

        Parse(fileImp)

        match=match.replace(/[0-9]+\:/gm,'')
        console.log('IMPORT', match)
        if(match.indexOf('{')>-1){
            var IMPORTS = match.split('{')[1].split('}')[0].split(',')
        }else{
            var scope = match.split('as')[1].split('from')[0].trim()
            IMPORTS = Exports(fileImp).map(name=>{
                var nameFRom=name.replace('P'+getFI(fileImp)+'_','')
                name=name.replace('P'+getFI(fileImp)+'_',scope+'.')
                return {from:nameFRom,target:name}
            })
        }
        console.log('IMPORTS',IMPORTS)
        


        IMPORTS = IMPORTS.map(imp=>{
            var impp
            if(!imp.from){
                impp = {from:imp,target:imp}
                if(imp.indexOf('as')>-1){
                    var params= imp.split(' as ')
                    impp.from = params[0]
                    impp.target = params[1]
                }
            }else{
                impp = imp
            }
            return impp
        })
        console.log('IMPORTS',IMPORTS)

        IMP[getFI(fileImp)] = IMPORTS
        
        //IMPORTS.map(name=>{
        //    match=match.replace(new RegExp('(\\b)'+name+'(\\b|\\(|\\ )','gm'),'$1P'+FILE_INDEX+'_'+name+'$2')
        //})

        //Parse(fileImp)

        return 'include '+fileImp.replace('.js','.asm')+'\n'
    })

    for(let key of Object.keys(IMP)){
        console.log('IMP',IMP)
        var IMPl = IMP[key]
        IMPl.map(name=>{
            r(new RegExp('(\\b)'+name.target+'(\\b)','gm'),'$1P'+key+'_'+name.from+'$2')
        })
    }




    //              rest of compiler



    r(/[0-9]+\:(\{|\})/gm,'$1')

    fs.writeFileSync('./cache/'+file, source)

    //var src = SOURCES[getFI(fileImp)]
    source = source.replace(/export .*/gm,match=>{
        console.log('EXPORT', match)
        var mm = match
        if(match.indexOf('function')>-1){
            mm = match.replace('export function','')
            mm = mm.split('(')[0].trim()
        }else if(match.indexOf('class')>-1){
            mm = match.replace('export class','')
            mm = mm.split('{')[0].trim()
        }else if(match.indexOf('var')>-1){
            mm = match.replace('export var','')
            mm = mm.split('{')[0].trim()
        }else{
            mm = match.replace('export','')
            mm = mm.split('=')[0].trim()
        }
        if(!EXPORTS[getFI(file)]){
            EXPORTS[getFI(file)] = []
        }
        mm = mm.split('=')[0].trim()
        EXPORTS[getFI(file)].push(mm)
        var ret = match.replace('export ','')
        if(ret.split(' ').length==1){
            return ''
        }
        return ret
    })

    source = Obj(source)

    fs.writeFileSync('./cache/'+file.replace('.js','.2.asm'), source)

    source = Danger(source)

    fs.writeFileSync('./cache/'+file.replace('.js','.asm'), source)

    //var GLFuncs = []
    r(/(gl[a-zA-Z0-9\_]+)/gm,match=>{
        GLFuncs.push(match)
        return match
    })
    console.log('GLF',GLFuncs)

    SOURCES[getFI(file)] = source

    return source
}


var fileName = process.argv[2]

const src = Parse(fileName+'.js')

var frameName = process.argv[3]??'cmd'

if(src.indexOf('P1_main')>-1){
    frameName = 'cmd'
}else{
    frameName = 'window'
}



var gl64 = require('./build/make.js')
console.log('GLF',GLFuncs)
gl64(GLFuncs)

let frame = fs.readFileSync('./frame/'+frameName+'.asm').toString()
frame=frame.replace('{{INIT}}',src)
fs.writeFileSync('./cache/'+fileName+'.asm',frame)