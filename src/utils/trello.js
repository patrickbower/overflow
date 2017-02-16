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

export function getCards(listId, callback) {
    const request = `${config.url}/1/lists/${listId}/cards?key=${config.key}&token=${config.token}`;
    fetch(request, callback);
}

export function removeCard(cardId, callback) {
    const request = `${config.url}/1/cards/${cardId}/idList?key=${config.key}&token=${config.token}&value=${config.doneListID}`;
    place(request, callback);
}

export function addCard(cardName, callback) {
    const request = `${config.url}/1/lists/${config.toDoListID}/cards?name=${cardName}&key=${config.key}&token=${config.token}`;
    send(request, callback);
}
