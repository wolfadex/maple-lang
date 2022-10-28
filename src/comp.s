.include "maple_lang_core.s"

.global _start
.align 2


.macro movemem Xa, Xb
    ldrb    W3, [\Xa], #1
    strb    W3, [\Xb], #1
.endm

// Coping string from A to B
_start:
    //dadr    X0, instr
    //dadr    X1, outstr_str

    //ldrb    W3, [X0], #1
    //strb    W3, [X1], #1
    //ldrb    W3, [X0], #1
    //strb    W3, [X1], #1
    //ldrb    W3, [X0], #1
    //strb    W3, [X1], #1
    //ldrb    W3, [X0], #1
    //strb    W3, [X1], #1
    //ldrb    W3, [X0], #1
    //strb    W3, [X1], #1
    //ldrb    W3, [X0]
    //strb    W3, [X1]
    //movemem X0, X1
    //movemem X0, X1
    //movemem X0, X1
    //movemem X0, X1
    //movemem X0, X1
    //movemem X0, X1
    //mov     X3, #'\n'
    //strb    W3, [X1]

    //mov     X0, #1
    //mov     X16, #4
    //dadr    X1, outstr_str
    //mov     X2, #6
    //svc     #0x80
    write_null_str instr

    exit #0

.data
instr:      .asciz     "SUMMER\n"
//outstr_str:     .fill       7, 1, 0  // num repititions, size of repititions, what to fill with

// Moving memory around
/*
_start:
    mov     X0, #'P'
    mov     X1, #'O'
    mov     X2, #'I'
    mov     X3, #'U'
    mov     X4, #'Y'
    mov     X5, #'T'
    mov     X6, #'R'
    mov     X7, #'E'
    mov     X8, #'W'
    mov     X9, #'Q'

    dadr    X10, outstr
    strb    W1, [X10], #1 // load the value of X1 into the address of X10, then increment X10 to the next position
    strb    W5, [X10], #1 // load the value of X5 into the address of X10, then increment X10 to the next position
    strb    W5, [X10], #1 // load the value of X5 into the address of X10, then increment X10 to the next position
    strb    W7, [X10], #1 // load the value of X7 into the address of X10, then increment X10 to the next position
    strb    W6, [X10]     // load the value of X7 into the address of X10
    
    mov     X0, #1
    mov     X16, #4
    dadr    X1, outstr
    mov     X2, #6
    svc     #0x80

    mov     X0, #0      // return code
    mov     X16, #1     // system call, (1) terminates program
    svc     #0x80

.data
outstr:     .ascii  "     \n"
 */