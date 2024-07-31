; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include ..\include\extern.inc

    .code

	include test2.asm


var P1_test = 12.22

function P1_print(){
    P2_TestFunc()
    var B1_P1_kuk = 23
    printf('OK')
}

function P1_main(){
    P1_print()
    printf('OK')
}

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

entry_point proc

    P1_main

    ;waitkey "  Press any key to continue ..."

    invoke ExitProcess,0

    ret

entry_point endp


    end
