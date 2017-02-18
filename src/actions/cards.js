export function addcard(data){
    return {
        type: 'CARDS_BUILD',
        data
    }
}

export function checkItem(data, index, id, newState){
    return {
        type: 'CARDS_CHECK_ITEM',
        data,
        index,
        id,
        newState
    }
}
