.include "maple_lang_core.s"

.global _start
.align 2


.equ    basenum, 209867295

_start:

    // load output string
    dadr    X4, outstr
    // load the number to print
    ldr     X5, =basenum
    // initial power of ten
    mov     X7, #9
    // initial loop counter for current digit
    mov     X8, #0

findstart:
    power_int   #10, X7
    // move result into X6
    mov     X6, X0
    // compare to number being processed
    cmp     X6, X5
    ble     finddigit
    // not found, subtract and try again
    sub     X7, X7, #1
    b       findstart

finddigit:
    cmp     X5, X6
    blt     write_to_mem
    add     X8, X8, #1
    sub     X5, X5, X6
    b       finddigit

write_to_mem:
    // add ascii 0 to to our digit
    add     X8, X8, #'0'
    strb    W8, [X4], #1
    
    sub     X7, X7, #1
    cmp     X7, #0
    blt     exit_label
    power_int       #10, X7
    mov     X6, X0
    mov     X8, #0
    b       finddigit

exit_label:
    mov     X8, #'\n'
    strb    W8, [X4]

    mov     X16, #4   // write
    mov     X0, #1    // to stdout
    dadr    X1, outstr
    mov     X2, #11
    svc     #0x80

    exit #0

.data
outstr:     .fill 11 // max output size is 10 char, 11th is for the line ending
