; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include \masm64\include64\opengl32.inc
    include \masm64\include64\glu32.inc

    include \jsexp\include\opengl.inc
    include \jsexp\include\requires.inc

    includelib \masm64\lib64\opengl32.lib
    includelib \masm64\lib64\glu32.lib

    include \jsexp\include\extern.inc

    include \jsexp\include\math.asm
    include \jsexp\include\string.asm

    .data

        teA db "test tekst",0
        teB db "test tekst",0
        sep db "e",0

        result db 20 dup(0) ; miejsce na wynik

        fromA dq 2
        toA dq 4

    .code

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤




entry_point proc

    ;invoke printf, "%s ", addr text1

    StringLength teA
    invoke printf, "%i", rax

    StringCompare teA, teB
    invoke printf, "%i", rax

    StringMerge teA, teB
    invoke printf, "%s", rax




    ;mov bl, byte ptr teA+1
    ;invoke printf, "%c", bl




    invoke ExitProcess,0

    ret

entry_point endp


    end
