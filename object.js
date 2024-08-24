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
                //body = 'mov '+CLASSName+', alloc('+params.length*8+')\n'+body
                mm=mm.replace(/(.*) = new (.*)\(\)/gm,
                    '$2_constructor($1)')
            mm=mm.replace(/(.*) = new (.*)\(([0-9]+)\)/gm,
                    ``/*`for(indexFor = 0;indexFor<2;indexFor++):1{
            printf("%s", "OK")
            mov rax, indexFor
$2_constructor(this.$1[rax])
        :1}
`*/)
            }
            funcs.push(name)
            console.log(params)
            mm=mm.replace(name+'(','function '+CLASSName+'_'+name+'(self,')
            mm=mm.replace(/\,\)/gm,')')
            mm=mm.replace(/this/gm,'self')
            return mm
        })
        /*var pref = ''
        var idx = 0
        for(let param of params){
            pref+=CLASSName+'_'+param.name+' equ '+idx+'\n'
            idx++
            //match=match.replace(new RegExp('self\\.'+param.name,'gm'),'self['+CLASSName+'_'+param.name+']')
        }*/

        CLASSES[CLASSName] = {params,funcs,locals:[],objs:[]}

        var struct = CLASSName+' STRUCT\n'
        for(let param of params){
            if(param.value.indexOf('new')>-1){
                const obj = param.value.split('new')[1].split('(')[0].trim()
                var count = param.value.split('new')[1].split('(')[1].split(')')[0].trim()
                if(count.length>0){
                    struct += param.name+' '+obj+' '+count+' dup\\\\(<>)\n'
                }else{
                    struct += param.name+' '+obj+' <>\n'
                }
                CLASSES[CLASSName].objs.push({name:param.name,obj})
            }else{
                struct += param.name+' QWORD ?\n'
            }
        }
        struct += CLASSName+' ENDS\n'

        console.log('OBJ',CLASSES[CLASSName].objs)

        for(let obj of CLASSES[CLASSName].objs){
            match=match.replace(
                new RegExp('self\\.'+obj.name+'\\.(.*)\\((.*)','gm'),
                obj.obj+'_$1(self.'+obj.name+',$2')
            match=match.replace(
                new RegExp('self\\.'+obj.name+'\\[(.*)\\]\\.(.*)\\((.*)\\)','gm'),
                obj.obj+'_$2(self.'+obj.name+'[$1],$3)')
        }

        return '\n\n'+struct+'\n\n'+match
        //pref += '\n.data?\n'+CLASSName+' dq ?\n'
        //return pref+'\n\n'+match
    })

    console.log(CLASSES)

    source = source.replace(/var (.*) = new (.*)\(\)/gm,match=>{
        var prop = match.split('=')[0].replace('var','').trim()
        var className = match.split('new')[1].replace('()','').trim()
        console.log('className',className)
        console.log('CLASSES',CLASSES)
        if(className.indexOf('_')>-1){
            className = className.split('_')[1]
        }
        CLASSES[className].locals.push(prop)
        return '.data?\n'+prop+' label '+className
    })

    source = source.replace(/var (.*) = new (.*)\([0-9]+\)/gm,match=>{
        var prop = match.split('=')[0].replace('var','').trim()
        var className = match.split('new')[1].split('(')[0].trim()
        if(className.indexOf('_')>-1){
            className = className.split('_')[1]
        }
        CLASSES[className].locals.push(prop)
        var count = parseInt(match.split('(')[1].split('('))
        return `.data?\n    ${prop} ${className} ${count} dup\\\\({}\\\\)`
    })

    console.log(CLASSES)

    for(let key of Object.keys(CLASSES)){
        const CLASS = CLASSES[key]
        for(let local of CLASS.locals){
            for(let fun of CLASS.funcs){
                source=source.replace(
new RegExp(local+'\\.'+fun+'\\(','gm'),
key+'_'+fun+'('+local+',')
            source=source.replace(
    new RegExp(local+'(\\[[0-9]+\\])\\.'+fun+'\\(','gm'),
    key+'_'+fun+'('+local+'$1,')
            }
            //source=source.replace(new RegExp(local+'\\.([a-zA-Z0-9\_]+)','gm'),local+'['+key+'_$1'+']')
        }
    }

    source=source.replace(/\,\)/gm,')')

    source=source.replace(/\.P[0-9]+\_/gm,'.')

    source=source.replace(/STRUCT([\s\S]+?)ENDS/gm,match=>{
        match=match.replace(/P[0-9]+\_/gm,'')
        return match
    })

    fs.writeFileSync('./cache/objobj.js',source)

    return source
}


//let code = fs.readFileSync('./testobj.js').toString()

//code = Parse(code)

module.exports = Parse

//fs.writeFileSync('./obj.js',code)