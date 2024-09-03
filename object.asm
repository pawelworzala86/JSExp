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

    objPrint2 proc obj:ptr qword
        mov rax, 11
        mov qword ptr obj+0, rax
        invoke printf, "%i", qword ptr obj+0
    ret
    objPrint2 endp

entry_point proc

    ;invoke printf, "%i", valA 

    ;lea rax, objAA
    ;rcall objPrint, rax

lea rax, valA
    rcall objPrint2, rax

    invoke printf, "%i", qword ptr [valA]

    ;invoke printf, "%i", objAA.propA

    invoke printf, "OK"

    invoke ExitProcess,0

    ret

entry_point endp


    end
