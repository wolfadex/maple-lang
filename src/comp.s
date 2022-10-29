.include "maple_lang_core.s"

.global _start
.align 2


// Registers
//      X0: input string address
//      X1: output string address
//      X2: tmp byte read
//      X3: last read value



_start:
    dadr    X0, instr
    dadr    X1, outstr
    mov     X3, #0

loop:
    ldrb    W2, [X0], #1
    cmp     X2, #0          // see if we have a null
    beq     exit_label      // if equal, we've hit the end of the string
    cmp     X2, X3          // is equal to last value
    beq     loop            // loop and read next character
    strb    W2, [X1], #1    // copy value to output
    mov     X3, X2          // store last read value
    b       loop
    

exit_label:
    write_null_str outstr
    exit #0

.data
instr:      .ascii      "I jjjjust   waaaaant thhhis stuppppid " 
            .asciz      "tttthinggggg tooooo wwwwworrrrrrrk!!!!!!!\n"
outstr:     .fill       128, 1, 0     // Reserve 128 bytes
