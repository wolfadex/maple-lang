.global _start
.align 2

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

    adrp    X10, outstr@PAGE // load `outstr`
    add     X10, X10, outstr@PAGEOFF
    //strb    W9, [X10]
    //str     X1, [X10, #1]    // load the value of X1 into the address of X10
    //add     X10, X10, #1     // add 1 to the value in X10
    //str     X5, [X10]    // load the value of X5 into the address of X10
    //add     X10, X10, #1     // add 1 to the value in X10
    //str     X5, [X10]    // load the value of X5 into the address of X10
    //add     X10, X10, #1     // add 1 to the value in X10
    //str     X7, [X10]    // load the value of X7 into the address of X10
    //add     X10, X10, #1     // add 1 to the value in X10
    //str     X6, [X10]    // load the value of X7 into the address of X10
    
    mov     X0, #1
    mov     X16, #4
    mov     X1, X10
    mov     X2, #6
    svc     #0x80

    mov     X0, #0      // return code
    mov     X16, #1     // system call, (1) terminates program
    svc     #0x80

//outstr:     .ascii  "     \n"
outstr:     .ascii  "OTTER\n"






//     mov     X0, #1      // (1) is stdout
//     adr     X1, hello   // address of `hello`
//     mov     X2, hello_len     // length of `hello`
//     mov     X16, #4     // system call, (4) write string
//     svc     #0x80

//     mov     X0, #0      // return code
//     mov     X16, #1     // system call, (1) terminates program
//     svc     #0x80

// hello:      .ascii      "Hello, World!\n"
// hello_len = . - hello
