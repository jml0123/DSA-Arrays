const memoryClass = require('./memory');

memory = new memoryClass();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length)
    }
    // push
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }
        
        memory.set(this.ptr + this.length, value);
        this.length++;
    }
    // reszize
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of mem')
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr)
        this._capacity = size;
    }
    // get
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error("Index error")
        }
        return memory.get(this.ptr + index)
    }
    // pop
    pop() {
        if (this.length == 0) {
            throw new Error("Index error")
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    // insert
    insert(index, value) {
        if(index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }
        memory.copy(this.ptr + index + 1, this.ptr + index, this.lengh - index);
        memory.set(this.ptr + index, value);
        this.length++
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}

Array.SIZE_RATIO = 3;

function main () {
    Array.SIZE_RATIO = 3;
    let arr = new Array();

    arr.push(3) 
    console.log(arr) // Length = 1, capacity = 3, ptr = 0
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    console.log(arr) // Length = 6, capacity = 12, ptr = 3
    // We pushed 6 values into the array which makes the length 6
    // The capacity of the array is now 12 because the array needed to be 
    // resized when we pushed the 4th value
    // The pointer is 3 as the array was resized when we pushed value 4, at index 3
    arr.pop();
    arr.pop();
    arr.pop();
    console.log(arr) // Length = 3, capacity = 12, ptr = 3
    // Since the array haad been previously resized, the amount of memory allocated is the same
    // and the capacity is still 12 despite that the array length is at 3.
    // The array didn't get resized, and the ptr is still at the previous pointer position.
    console.log(arr.get(0)) // Print first item in array
    for(i = 0; i < arr.length + 1; i++){
        arr.remove(i)
    }
    console.log(arr)
    arr.push("tauhida");
    console.log(arr.get(0)) // I get 5 ??
    // The resize function adaptss the size of the array based on the capacity
    // If the length of the array surpasses the capacity, the resize function will delegate more size to the array by a factor of 3
}

main()