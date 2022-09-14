import { CString, dlopen, FFIType, suffix } from 'bun:ffi'

const FFI = (() => {
    const rustLib = dlopen(`librust_file.${suffix}`, {
        add: {
            args: [FFIType.i32, FFIType.i32],
            returns: FFIType.i32,
        },
    })
    const goLib = dlopen(`goFile.${suffix}`, {
        Add: {
            args: [FFIType.i32, FFIType.i32],
            returns: FFIType.i32,
        },
        Greet: {
            args: [FFIType.cstring],
            returns : FFIType.cstring,
        }
    })

    return {
        rust: rustLib.symbols,
        go: goLib.symbols
    }
})()

console.log('Rust:', FFI.rust.add(1, 2))
console.log('Go:', FFI.go.Add(3, 4))

const nameBuffer = Buffer.from("Stephan", "utf-8")
const { ptr } = FFI.go.Greet(nameBuffer)
const greeting = new CString(ptr)
console.log(greeting)
