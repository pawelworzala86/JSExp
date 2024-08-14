StringLength macro text
    LOCAL loop11

    lea rcx, text

    mov rbx, 0
    loop11:
        add rbx, 1
        cmp byte ptr [rcx+rbx],0
        jne loop11

    
    mov rax,rbx
endm

StringCompare macro textA, textB
    LOCAL end11
    LOCAL end44
    LOCAL end1111

    invoke CompareString, 0, 0, addr textA, -1, addr textB, -1

    mov rbx,rax
    mov rax,0
    cmp rbx,2
    jz end44
    end11:
        mov rbx,0
        jmp end1111
    end44:
        mov rbx,1
    end1111:

    mov rax,rbx

endm

.data?
    StringMergeResult db 1024 dup(0)
.code
StringMerge macro textA, textB
    lea rdi, StringMergeResult
    lea rsi, textA
    invoke strcat, rdi, rsi

    lea rdi, StringMergeResult
    lea rsi, textB
    invoke strcat, rdi, rsi

    lea rax, StringMergeResult
endm