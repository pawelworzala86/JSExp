; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include ..\include\extern.inc

    .code

	
OBJTest_varA equ 0





OBJTest STRUCT

varA QWORD ?

OBJTest ENDS





    .code
    OBJTest_constructor macro self
    





mov rax, 23.32
mov qword ptr self[OBJTest_varA], rax

    
    endm



.data?

P1_testOBJ label OBJTest



.code
    P1_main macro 
    







    invoke printf, "%f", qword ptr P1_testOBJ[OBJTest_varA]




    endm

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

entry_point proc

    P1_main

    ;waitkey "  Press any key to continue ..."

    invoke ExitProcess,0

    ret

entry_point endp


    end
