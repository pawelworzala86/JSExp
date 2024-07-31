const fs = require('fs')

const Danger = require('./danger.js')



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

function Parse(file){

    const prefix = 'P'+FILE_INDEX
    FILE_INDEX++

    let source = fs.readFileSync('./source/'+file).toString()

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



    //                      imports

    var IMP = {}
    r(/import\ (.*)/gm, match=>{
        match=match.replace(/[0-9]+\:/gm,'')
        console.log('IMPORT', match)
        var IMPORTS = match.split('{')[1].split('}')[0].split(',')
        console.log('IMPORTS',IMPORTS)
        var file = match.split('\'')[1].split('\'')[0].trim()
        file = file.replace('./','')
        console.log('file',file)

        IMP[FILE_INDEX] = IMPORTS
        
        //IMPORTS.map(name=>{
        //    match=match.replace(new RegExp('(\\b)'+name+'(\\b|\\(|\\ )','gm'),'$1P'+FILE_INDEX+'_'+name+'$2')
        //})

        Parse(file)

        return 'include '+file.replace('.js','.asm')+'\n'
    })

    for(let key of Object.keys(IMP)){
        var IMP = IMP[key]
        IMP.map(name=>{
            r(new RegExp('(\\b)'+name+'(\\b)','gm'),'$1P'+key+'_'+name+'$2')
        })
    }




    //              rest of compiler



    r(/[0-9]+\:(\{|\})/gm,'$1')

    fs.writeFileSync('./cache/'+file, source)

    source = Danger(source)

    fs.writeFileSync('./cache/'+file.replace('.js','.asm'), source)

    return source
}

var fileName = process.argv[2]

const src = Parse(fileName+'.js')


let frame = fs.readFileSync('./frame/cmd.asm').toString()
frame=frame.replace('{{INIT}}',src)
fs.writeFileSync('./cache/'+fileName+'.asm',frame)