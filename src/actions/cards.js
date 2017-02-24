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

export function addCard(title){
    return {
        type: 'ADD_CARD',
        title
    }
}

export function singleCardView(id){
    return {
        type: 'SINGLE_CARD_VIEW',
        id
    }
}
