class OBJTest{
    constructor(){
        this.varA = 2332
    }
}

var P1_testOBJ = new OBJTest()

function P1_main(){

    P1_testOBJ.constructor()

    printf("%i", P1_testOBJ.varA)

}