; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include include\extern.inc

    .data
        valA dq  12
        valB dq 12

    .data
        url db "http://example.com/file.txt", 0
        file db "C:\path\to\save\file.txt", 0

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
.code
entry_point proc

    .IF valA eq valA
        invoke printf, "IF"    
    ENDIF

    IF valA eq valA
        invoke printf, "IF"    
    ENDIF

    invoke printf, "OK"

    ;waitkey "  Press any key to continue ..."

    invoke ExitProcess,0

    ret

entry_point endp


    end
