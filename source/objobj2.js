class innOBJ{
    constructor(){
        this.varA = 666
    }
    print(){
        printf("%i", this.varA)
    }
}

var indexFor = 0

class OBJTest{
    constructor(){
        this.varA = 2332
        this.objA = new innOBJ(2)
    }
    create(){
        for(indexFor = 0;indexFor<15;indexFor++){
            printf("%s", "OK")
        }
        innOBJ_constructor\\\\ this.objA[0]
        innOBJ_constructor\\\\ this.objA[1]
    }
    print(){
        this.objA[0].print(2)
        printf("%i", this.varA)
    }
}

var testOBJ = new OBJTest()

function main(){

    testOBJ.constructor()

    testOBJ.create()
    testOBJ.print()

}