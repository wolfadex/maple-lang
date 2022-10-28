.global _start
.align 2

// Gets the address of (writable) memory in the data section
.macro dadr Xn, name
    adrp    \Xn, \name@page
    add     \Xn, \Xn, \name@pageoff
.endm

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
