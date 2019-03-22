
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

export const action_ = (x)=>{
    rev= swap(action);
    return rev[x];
}

export const category=({
    'Bike': '27',
    'Hemlets': '2',
    'Locks': '10',
})

export const category_ = (x)=>{
    rev= swap(category);
    return rev[x];
}