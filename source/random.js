var sin = 0.0
var num = 90.0
var init = 232.7876
var minusOne = -1.0
var zero = 0.0

var mixed = 342.886

//var timeBuffer = [0,0]

function random(){
    num = Math.deg2rad(init)
    sin = Math.sin(num)
    if(sin<zero){
        sin = minusOne * sin
    }
    init = sin * mixed
    printf('ok %f %s', sin, lf)
}

function main(){
    //GetSystemTime(&timeBuffer)
    //printf('ok %f %s', timeBuffer[0], lf)
    random()
    random()
    random()
    random()
    random()
}