import {TestFunc} from './test2.js'

var test = 12.22

function print(){
    TestFunc()
    var kuk = 23
    printf('OK')
    {
        kuk = 23.23
        printf('OK')
        test = 33.33
    }
}

function main(){
    print()
    printf('OK')
}