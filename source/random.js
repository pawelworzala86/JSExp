var sin = 0.0
var num = 90.0
var init = 232.7876
var minusOne = -1.0
var zero = 0.0

var mixed = 342.886

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
    random()
    random()
    random()
    random()
    random()
}