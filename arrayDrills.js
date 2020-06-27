const urlString = (string) => {
    let newString = ""
    for(let char of string) {
        newString += (char === " ") ? "%20" : char
    }
    return newString
}
console.log(urlString("tauhida parveen"))
// Time complexity O(n)

const manualFilter = (array) => {
    for (el of array) {
        if (el === 5) {
            array.splice(array.indexOf(el), array.indexOf(el))
        }
    }
    return array
}
console.log(manualFilter([4, 6, -3, 5, -2, 1]))
// Time complexity O(n)

const maxSum = (array) => {
    let currentMax =  array[0]
    let globalMax = array[0]
    for (let i = 1; i < array.length; i++) {
        currentMax = Math.max(array[i], currentMax + array[i])
        if (currentMax > globalMax) {
            globalMax = currentMax
        }
    }
    return globalMax
}
console.log(maxSum([4, 6, -3, 5, -2, 1]))
// Time complexity O(n)

const manualMerge = (array1, array2) => {
    for (i = 0; i < array2.length; i++) {
        array1.push(array2[i])
    }
    
    return array1.sort(function(a, b){return a-b})
}
console.log(manualMerge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))
// Time complexity O(n)

const rmChars = (string) => {
    let arrayString = [...string]
    let modifiedString = ""
    toRemove = ["a", "e", "i", "o"," u"]
    for (i = 0; i < arrayString.length; i++) {
        if (toRemove.includes(arrayString[i])) {
            arrayString[i] = ""
        }
        modifiedString += arrayString[i]
    }

    return modifiedString
}
console.log(rmChars('Battle of the Vowels: Hawaii vs. Grozny'))
// Can't manipulate original string as its immutable.
// O(n)



const products = (arr) => {
    const newArr = []
    for (i = 0; i < arr.length; i++) {
        let valueatI = 1;
        let value = arr.filter((el, index) => index !== i).map(num => {
            return valueatI *= num
        })
        newArr[i] = valueatI;
    }
    return newArr
}
console.log(products([1, 3, 9, 4]))
// O(n)

const twoDArray = (matrix) => {
    for (i = 0; i < matrix.length; i++) {
        if (matrix[i].includes(0)) {
            const fixed = matrix[i].map(num => {
                return num = 0;
            })
            matrix[i] = fixed
        }
    }
    return matrix
}
console.log(twoDArray(
    [[1,0,1,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,0,1,1,1],
    [1,1,1,1,1]]))
// O(n^2)

const stringRotation = (str1, str2) => {
    if (str1.length !== str2.length){
        return false
    }
    const compoundString = str1 + str1
    if (compoundString.includes(str2)) {
        return true
    }
    else {
        return false
    }
}
console.log(stringRotation("amazon", "azonma"))
console.log(stringRotation("amazon", "azonam"))
//O(1)
