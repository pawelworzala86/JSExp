const fs=require('fs')

function Blocks(source){
    let newSource = ''
    var tab = 1
    for(let index=0;index<source.length;index++){
        if(source[index]=='{'){
            newSource += ':'+tab
            tab++
        }
        if(source[index]=='}'){
            newSource += ':'+(tab-1)
            tab--
        }
        newSource += source[index]
    }
    return newSource
}

var CLASSES = {}

function Parse(source){

    source = Blocks(source)

    function RemoveAB(mm){
        var lines = mm.split('\n')
        lines.splice(0,1)
        lines.splice(lines.length-1,1)
        return lines.join('\n')
    }

    source = source.replace(/^class(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
        var CLASSName = match.split('{')[0]
            .split(':')[0]
            .replace('class','').trim()
        console.log('CLASSName',CLASSName)
        match=RemoveAB(match)
        var params=[]
        var funcs = []
        match=match.replace(/(.*)\(.*\)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,mm=>{
            //console.log(mm)
            var name = mm.split('(')[0].trim()
            console.log('func',name)
            var body = RemoveAB(mm)
            console.log('body',body)
            if(name=='constructor'){
                body.replace(/this\.(.*)/gm,m=>{
                    nm = m.split('=')[0].trim().replace('this.','')
                    var val = m.split('=')[1].trim()
                    params.push({name:nm,value:val})
                    return m
                })
            }
            funcs.push(name)
            console.log(params)
            mm=mm.replace(name+'(',CLASSName+'_'+name+'(self,')
            mm=mm.replace(/\,\)/gm,')')
            mm=mm.replace(/this/gm,'self')
            return mm
        })
        var pref = ''
        var idx = 0
        for(let param of params){
            pref+=CLASSName+'_'+param.name+' = '+idx+'\n'
            idx++
            match=match.replace(new RegExp('self\\.'+param.name,'gm'),'self['+CLASSName+'_'+param.name+']')
        }

        CLASSES[CLASSName] = {params,funcs,locals:[]}

        return pref+'\n\n'+match
    })

    console.log(CLASSES)

    source = source.replace(/var (.*) = new (.*)\(\)/gm,match=>{
        var prop = match.split('=')[0].replace('var','').trim()
        var className = match.split('new')[1].replace('()','').trim()
        CLASSES[className].locals.push(prop)
        return prop+' label '+className
    })

    for(let key of Object.keys(CLASSES)){
        const CLASS = CLASSES[key]
        for(let local of CLASS.locals){
            source=source.replace(new RegExp(local+'\\.([a-zA-Z0-9\_]+)','gm'),local+'['+key+'_$1'+']')
        }
    }



    return source
}


let code = fs.readFileSync('./testobj.js').toString()

code = Parse(code)

fs.writeFileSync('./obj.js',code)