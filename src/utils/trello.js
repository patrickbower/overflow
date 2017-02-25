import config from './config';
import axios from 'axios';

function fetch(request, callback) {
    axios.get(request)
        .then(response => {
            callback(response.data);
        });
}

function place(request, callback) {
    axios.put(request)
        .then(response => {
            callback(response.data);
        });
}

function send(request, callback) {
    axios.post(request)
        .then(response => {
            callback(response.data);
        });
}

export function getCard(cardId, callback) {
    const request = `${config.url}/1/cards/${cardId}?key=${config.key}&token=${config.token}`;
    fetch(request, callback);
}

export function getCards(listId, callback) {
    const request = `${config.url}/1/lists/${listId}/cards?key=${config.key}&token=${config.token}`;
    fetch(request, callback);
}

export function getChecklist(checklistId) {
    const request = `${config.url}/1/checklists/${checklistId}?&key=${config.key}&token=${config.token}`;
    return axios
        .get(request)
        .then(response => response.data.checkItems);
}

export function removeCard(cardId, callback) {
    const request = `${config.url}/1/cards/${cardId}/idList?key=${config.key}&token=${config.token}&value=${config.doneListID}`;
    place(request, callback);
}

export function makecard(cardName, callback) {
    const request = `${config.url}/1/lists/${config.toDoListID}/cards?name=${cardName}&key=${config.key}&token=${config.token}`;
    send(request, callback);
}

export function checkItem(cardId, idChecklist, idCheckItem, checkValue) {
    const request = `${config.url}/1/cards/${cardId}/checklist/${idChecklist}/checkItem/${idCheckItem}/state?key=${config.key}&token=${config.token}&value=${checkValue}`;
    return axios
        .put(request);
}

export function createCheckList(cardId, callback) {
    const request = `${config.url}/1/cards/${cardId}/checklists?key=${config.key}&token=${config.token}`;
    send(request, callback);
}

export function addCheckItem(idChecklist, checkItemName, callback) {
    const request = `${config.url}/1/checklists/${idChecklist}/checkItems?key=${config.key}&token=${config.token}&name=${checkItemName}`;
    send(request, callback);
}
