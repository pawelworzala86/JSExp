const { match } = require('assert')
const fs = require('fs')

const originalSource = fs.readFileSync('./test.js').toString()

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

function Parse(source,prefix){

    source = Blocks(source)

    function r(reg,func){
        source = source.replace(reg,func)
    }

    var LOCAL_DATA = []

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

    var bidx = 1
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
            match=match.replace(new RegExp('(\\b)'+name+'(\\b)','gm'),'$1B'+prfx+'_'+name+'$2')
        })

        return match
    })

    return source
}

let source = Parse(originalSource,'P1')

fs.writeFileSync('./test.compiled.js', source)