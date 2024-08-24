class innOBJ{
    constructor(){
        this.varA = 666
    }
    print(){
        this.varA = 666
        printf("%i", this.varA)
    }
}

var indexFor = 0
var pomnozRet = 0
var eight = 8

class OBJTest{
    constructor(){
        this.varA = 2332
        this.objA = new innOBJ(2)
    }
    create(){
        for(indexFor = 0;indexFor<1;indexFor++){
            printf("%s", "OK")
            //mov rax, indexFor
            pomnozRet = indexFor * eight
            mov rax, 0
            //printf("%i", indexFor)
            innOBJ_constructor\\\\ qword ptr this.objA[rax]
        }
        //innOBJ_constructor\\\\ this.objA[0]
        //innOBJ_constructor\\\\ this.objA[1]
    }
    print(){
        this.objA[0].print(2)
        printf("%i", this.varA)
    }
}

var testOBJ = new OBJTest()

function main(){

    testOBJ.constructor()

    //testOBJ.create()
    testOBJ.print()

}