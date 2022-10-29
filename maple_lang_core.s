// Various helper macros and core utilities


// Outputs a null terminated string
//
// X0: output string address
// X1: search address (searching for null byte)
// X2: tmp byte
// X3: length or string
//
// labels:
//      1: beginning of search loop
//      2: exit of loop
.macro write_null_str outstr
    // find length
    dadr    X0, \outstr
    mov     X1, X0
1:
    ldrb    W2, [X1]  // load byte into X2
    cmp     X2, #0    // compare to zero
    beq     2f
    // not equal to zero
    add     X1, X1, #1
    b       1b
2:
    sub     X3, X1, X0 // calculate length
    

    // setup write call
    mov     X16, #4   // write
    mov     X0, #1    // to stdout
    dadr    X1, \outstr
    mov     X2, X3
    svc     #0x80
.endm


// Gets the address of (writable) memory in the .data section
//
// Xn:   Register to load the address pointer into
// name: The reference to the vlaue in the .data section
.macro dadr Xn, name
    adrp    \Xn, \name@page
    add     \Xn, \Xn, \name@pageoff
.endm

// Exits with the passed in code
//
// code: 0 for OK, and non-0 for an error
.macro exit code
    mov     X0, \code   // return code
    mov     X16, #1     // system call, (1) terminates program
    svc     #0x80
.endm


// Calculates `base` to the power of `expo`
//
// X0: base
// X1: power
//
// Labels
//  1: expo is 0, return 1
//  2: expo is positive, calculate
//  4: return
//
// Output
//  X0: result
.macro power_int base, expo
    mov     X1, \expo
    cmp     X1, #0
    beq      1f
    mov     X0, \base
    mov     X2, \base
    bgt     2f
    blt     3f

1:
    mov     X0, #1
    b       3f

2:
    cmp     X1, #1
    ble     3f
    mul     X0, X0, X2
    sub     X1, X1, #1
    b       2b

3:

.endm
