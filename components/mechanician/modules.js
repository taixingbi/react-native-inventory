
function swap(json){
    var rev = {};
    for(var key in json){
        rev[json[key]] = key;
    }
    return rev;
}

export const action=({
    'send': '1',
    'start_fix': '2',
    'finish_fix': '3',
    'pick': '4',
    'add_count': '5',
    'reduce_count':'6',
})

// export const action_ = (x)=>{
//     rev= swap(action);
//     return rev[x];
// }

export const action_=({
    '1': 'Send bike',
    '2': 'Lets fix it',
    '3': 'Fixing done',
    '4': 'Pick bike',
    '5': 'Lets increase count',
    '6': 'Lets decrease count',
})

export const category=({
    'Hemlets': '2',
    'Locks': '10',
    'Baskets': '26',
    'Bike': '27',
    'Water': '28',
})

export const category_ = (x)=>{
    rev= swap(category);
    return rev[x];
}