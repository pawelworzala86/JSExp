OBJTest_varA equ 0


OBJTest STRUCT
varA QWORD ?
OBJTest ENDS


    function OBJTest_constructor(self):2{
        self[OBJTest_varA] = 23.32
    :2}

.data?
P1_testOBJ label OBJTest

function P1_main():1{

    printf("%f", P1_testOBJ[OBJTest_varA])

:1}