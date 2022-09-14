package main

// #include <stdlib.h>
import "C"

import (
    "unsafe"
)

func main(){}

//export Add
func Add(x int, y int) int {
    return x + y
}

//export Greet
func Greet(name *C.char) *C.char {
    cstr := C.CString("Hey from Go, " + C.GoString(name) + "!")
    defer C.free(unsafe.Pointer(cstr))
    return cstr
}


