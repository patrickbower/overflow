export function modalToggle(toggle){
    return {
        type: 'MODAL_TOGGLE',
        toggle
    }
}

export function singleCardView(id){
    return {
        type: 'SINGLE_CARD_VIEW',
        id
    }
}
