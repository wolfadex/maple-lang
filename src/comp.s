.include "maple_lang_core.s"

.global _start
.align 2


// Registers
//      X0: input string address
//      X1: tmp byte read
//      X2: matched letere to write



_start:
    dadr    X0, instr

loop:
    ldrb    W1, [X0]
    cmp     X1, #0          // see if we have a null/is at the end
    beq     exit_label      // if equal, we've hit the end of the string
    cmp     X1, #'A'
    mov      X2, #'T'   //moveq
    beq     write
    cmp     X1, #'T'
    mov      X2, #'A'   //moveq
    beq     write
    cmp     X1, #'C'
    mov      X2, #'G'   //moveq
    beq     write
    //cmp     X1, #'G'      // assume we have a 'G' here
    mov      X2, #'C'   //moveq
    beq     write

write:
    strb    W2, [X0], #1
    b       loop

exit_label:
    write_null_str instr

    dadr    X0, instr
    mov     X1, #0x000a     // \n + \0, aka newline + null termininator, 0a == \n, 00 == \0
    strh    W1, [X0]        // store 2 bytes
    write_null_str instr

    exit #0

.data
instr:      .ascii      "GTATCGATCGATCGATCGATTATATTTTCGACGAGATTTAAATATATATA"
            .asciz      "TATACGAGAGAATACAGATAGACAGATTA" 
