OBJTest_varA equ 0


OBJTest STRUCT
varA QWORD ?
OBJTest ENDS


    function OBJTest_constructor(self):2{
        self[OBJTest_varA] = 2332
    :2}

.data?
P1_testOBJ label OBJTest

function P1_main():1{

    OBJTest_constructor(P1_testOBJ)

    printf("%i", P1_testOBJ[OBJTest_varA])

:1}