class innOBJ{
    constructor(){
        this.varA = 666
    }
    print(){
        printf("%i", this.varA)
    }
}

class OBJTest{
    constructor(){
        this.varA = 2332
        this.objA = new innOBJ()
    }
    print(){
        this.objA.print()
        printf("%i", this.varA)
    }
}

var testOBJ = new OBJTest()

function main(){

    testOBJ.constructor()

    testOBJ.print()

}