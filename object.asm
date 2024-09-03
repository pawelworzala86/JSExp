; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include include\extern.inc

    .code

    OBJA STRUCT
        propA QWORD 0
    OBJA ENDS

    .data
        valA dq  12
        valB dq 12

        objAA label OBJA

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
.code

    objPrint proc obj: OBJA
        mov rax, 11
        mov obj.propA, rax
        invoke printf, "%i", obj.propA
    ret
    objPrint endp

entry_point proc

    invoke printf, "%i", valA 

    ;mov rax, 11
    ;mov objAA.propA, rax
    lea rax, objAA
    rcall objPrint, rax

    invoke printf, "%i", objAA.propA

    invoke printf, "OK"

    invoke ExitProcess,0

    ret

entry_point endp


    end
