export function modalToggle(content, toggle){
    return {
        type: 'MODAL_TOGGLE',
        content, toggle
    }
}

export function timerToggle(toggle){
    return {
        type: 'TIMER_TOGGLE',
        toggle
    }
}

export function singleCardView(id){
    return {
        type: 'SINGLE_CARD_VIEW',
        id
    }
}
