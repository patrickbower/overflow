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

export function newCheckItem(data, key){
    return {
        type: 'NEW_CHECK_ITEM',
        data, key
    }
}

export function addCard(data){
    return {
        type: 'ADD_CARD',
        data
    }
}

export function deleteCard(key){
    return {
        type: 'DELETE_CARD',
        key
    }
}
