export function makecards(data){
    return {
        type: 'CARDS_BUILD',
        data
    }
}

export function checkItem(index, key){
    return {
        type: 'CARDS_CHECK_ITEM',
        index, key
    }
}

export function addCard(data){
    return {
        type: 'ADD_CARD',
        data
    }
}
