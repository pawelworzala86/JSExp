var sin = 0.0
var num = 90.0
var init = 232.7876
var minusOne = -1.0
function main(){
    num = Math.deg2rad(init)
    sin = Math.sin(num)
    if(sin<0.0){
        sin = minusOne*sin
    }
    printf('ok %f', sin)
}