//
// 
//

let FieldData = [
    16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,
    16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,
    16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,
    16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,
    16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,
    0,0,0,0,16,16,16,16,15,16,16,16,16,0,0,0,
    0,0,0,0,0,16,16,16,16,16,16,16,0,0,0,0,
    5,5,5,5,5,17,17,17,17,17,17,17,5,5,5,5,
    5,5,4,4,4,4,4,4,4,4,4,4,4,4,5,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,3,4,3,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,3,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,3,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,3,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,3,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,3,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,3,3,3,3,3,3,4,5,
    5,4,4,4,4,3,3,3,3,3,3,3,3,3,3,5,
    5,5,4,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,5,5,4,4,4,4,3,3,3,3,3,3,3,3,5,
    5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,3,3,3,3,3,3,3,3,4,4,4,4,4,4,5,
    5,4,3,3,3,3,3,3,3,3,3,4,4,4,4,5,
    5,4,4,3,3,3,3,3,3,3,3,3,4,4,4,5,
    5,4,4,4,3,3,3,3,3,3,3,3,3,3,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,5,4,4,4,4,5,4,4,4,4,5,
    5,4,4,4,5,4,4,4,4,4,4,5,4,4,4,5,
    5,4,4,5,4,4,4,4,4,4,4,4,5,4,4,5,
    5,4,4,5,4,4,4,4,4,4,4,4,5,4,4,5,
    5,4,4,4,5,4,4,4,4,4,4,5,4,4,4,5,
    5,4,4,4,4,5,4,4,4,4,5,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,3,3,3,3,3,3,3,3,4,4,4,4,4,5,
    5,3,3,3,3,3,3,3,3,3,3,4,4,4,4,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,
    5,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,
    5,5,4,4,4,4,4,4,4,4,4,4,5,5,5,5,
    5,5,5,4,4,4,4,4,4,4,4,4,5,5,5,5,
    5,5,5,5,4,4,4,4,4,4,4,5,5,5,5,5,
    5,5,5,5,5,4,4,4,4,4,4,5,5,5,5,5,
    5,5,5,5,5,4,4,4,4,4,4,5,5,5,5,5,
    5,5,5,5,5,4,4,4,4,4,4,5,5,5,5,5,
    5,5,5,5,5,4,4,4,4,4,4,5,5,5,5,5,
    5,5,5,5,5,4,4,4,4,4,4,5,5,5,5,5,
    5,5,5,5,5,4,4,4,4,4,4,4,5,5,5,5,
    5,5,5,5,5,4,4,4,4,4,4,4,4,5,5,5,
    5,5,5,5,4,4,4,4,4,4,4,4,4,4,5,5,
    5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,3,3,3,3,3,4,4,5,
    5,4,4,4,4,4,3,3,3,3,3,3,3,3,4,5,
    5,4,4,4,3,3,3,3,3,3,3,3,3,3,3,5,
    5,4,4,4,3,3,3,3,3,3,3,3,3,3,3,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,3,4,4,4,4,4,4,4,5,
    5,4,4,5,5,5,5,4,4,4,4,4,4,4,4,5,
    5,4,4,5,5,5,5,4,3,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,3,4,4,4,4,5,
    5,4,4,4,4,4,4,3,4,4,4,4,4,4,4,5,
    5,4,4,4,4,3,4,4,4,3,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,5,5,5,5,5,4,4,5,
    5,4,4,4,3,4,3,4,5,5,5,5,5,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,3,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,
    5,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,
    5,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,
    5,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,
    5,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,
    5,5,4,4,4,4,4,4,4,4,4,5,5,5,5,5,
    5,5,5,3,3,3,3,3,3,4,4,5,5,5,5,5,
    5,5,5,3,3,3,3,3,3,3,3,3,5,5,5,5,
    5,5,5,5,5,3,3,3,3,3,3,3,4,5,5,5,
    5,5,5,5,5,5,3,3,3,3,4,4,4,5,5,5,
    5,5,5,5,5,5,4,4,4,4,4,4,4,4,5,5,
    5,5,5,5,5,5,4,4,4,4,4,4,4,4,5,5,
    5,5,5,5,5,3,3,3,3,3,3,3,3,3,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,3,3,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,3,3,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,3,3,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,3,5,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,5,5,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,5,5,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,5,5,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,5,5,5,5,
    5,5,5,5,3,3,3,3,3,3,3,3,5,5,5,5,
    5,5,5,3,3,3,3,3,3,3,3,3,5,5,5,5,
    5,5,4,4,4,4,4,4,3,3,3,3,5,5,5,5,
    5,4,4,4,4,4,4,4,4,4,3,5,5,5,5,5,
    5,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,
    5,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,
    5,3,3,3,3,3,3,3,3,3,5,5,5,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,5,5,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,4,4,4,4,3,3,5,
    5,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,
    5,3,3,3,3,5,3,4,4,4,4,4,4,4,4,5,
    5,3,3,3,3,5,4,4,4,4,4,4,4,3,3,5,
    5,3,3,3,3,5,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,5,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,5,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,5,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,5,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,5,3,3,3,3,5,
    5,3,3,3,3,4,3,3,4,3,5,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,5,3,3,3,3,5,
    5,3,3,3,3,3,3,4,3,3,5,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,5,3,3,3,3,5,
    5,3,3,3,3,4,3,3,4,3,5,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,4,3,4,3,3,3,3,3,3,3,3,5,
    5,5,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,5,3,4,3,3,3,3,3,3,3,3,3,3,3,5,
    5,5,5,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,5,5,5,3,3,3,3,3,3,3,3,3,3,3,5,
    5,5,5,5,5,5,5,3,3,3,3,3,3,3,3,5,
    5,5,5,5,5,5,5,5,3,3,3,3,3,3,3,5,
    5,5,5,5,5,5,5,5,3,3,3,3,3,3,3,5,
    5,5,5,5,5,5,3,3,3,3,3,3,3,3,3,5,
    5,5,5,3,3,3,3,3,3,3,3,3,3,3,5,5,
    5,5,3,3,3,3,3,3,3,3,3,3,3,3,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,
    5,3,3,3,3,3,3,3,3,5,5,5,5,5,5,5,
    5,3,3,3,3,3,3,3,3,5,5,5,5,5,5,5,
    5,3,3,3,3,3,3,3,3,5,5,5,5,5,5,5,
    5,3,3,3,3,3,3,3,3,3,4,5,5,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,5,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,5,5,5,3,3,3,3,3,3,3,3,3,5,
    5,3,5,5,5,5,5,3,3,3,3,3,3,3,3,5,
    5,3,5,5,5,5,5,3,3,3,3,3,3,3,3,5,
    5,3,3,5,5,5,3,3,3,3,3,3,3,3,3,5,
    5,4,4,4,4,4,3,3,3,3,3,3,3,3,3,5,
    5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,5,
    5,4,4,4,4,4,4,4,4,4,4,4,3,3,3,5,
    5,4,4,4,4,4,4,4,4,5,5,5,3,3,3,5,
    5,4,4,4,4,4,4,4,5,5,5,5,5,3,3,5,
    5,3,3,3,4,4,4,4,5,5,5,5,5,3,3,5,
    5,3,3,3,3,3,3,3,3,5,5,5,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,5,5,5,5,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,5,5,5,5,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,
    5,5,3,3,3,3,3,3,3,3,3,3,3,3,5,5,
    5,5,5,3,3,3,3,3,3,3,3,3,3,5,5,5,
    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
]

class Field
{
    constructor()
    {
        //今見えている画面の左上の座標を指す
        //これがスクロールするたびに動いてカメラの位置を決める
        this.scx = 0;
        this.scy = 0;

        this.px = 0;
        this.py = 0;
        this.bl = 0;
        
        //スクロールしたら立てるフラグ
        this.isScroll = false;
    }

    //ブロックかどうかを返す
    isBlock(x, y){
        let block = FieldData[y * FILED_W + x];

        if(block == 5 || block == 0) return false;  //ブロックだからこれ以上移動できない
        else return true;          //ブロックではないのでまだ移動できる
    }
    
    //更新処理
    update(){
        if(rakutankun.isGameStart && !isGameOver){
            if(this.scy <= rakutankun.stayScroll){
                //落単くんが画面下半分に行こうとするとスクロール
                if(rakutankun.y > this.scy + 64){
                    this.scy = rakutankun.y - 64;
                    this.isScroll = true;
                }

                //自動スクロール
                //毎回+1してるけどどれくらいスクロールするかは調整する
                if(!this.isScroll){
                    this.scy++;
                }

                this.isScroll = false;
            }
        }
    }
    
    //ブロックを1つ描画
    drawBlock(){
        let sx = (this.bl % 6) << 4;
        let sy = (this.bl / 6) << 4;

        if(this.bl <= 5){
            sx = this.bl << 4;;
        }

        vcon.drawImage(nomal_stage_sprite, sx, sy, 16, 16, this.px, this.py, 16, 16);
    }

    
    //描画処理
    draw(){
        let y = 0;
        let x = 0;

        for(y=0; y < MAP_H+1; y++){       //1画面当たりのブロックの数16まで続ける
            for(x=0; x < MAP_W+1; x++){   //同様

                let sx = x;
                let sy = y + (this.scy >> 4);

                /*FieldDataは線形に並んでいる．
                  前から何番目のデータを取得するかをblに入れる．以下イメージ．
                  sy * FILED_SIZE_W
                  は線形のデータを16個ずつの群に区切ったときの群の先頭要素を指す．
                  そこに+sxすることでその群の何番目かを決めている*/
                this.bl = FieldData[sy * FILED_W + sx];  

                //px, pyは画面上の描画する場所
                this.px = x << 4;
                this.py = (y << 4) - (this.scy % 16);

                this.drawBlock();
            }
        }
    }
}