import * as types from './actionTypes';

function url() {
    return 'www.url.com';
}

export function receiveStuff(json) {
    return {type: types.RECEIVE_STUFF, stuff: json.stuff};
}

export function fetchSegmentNames() {
    return dispatch => {
        return fetch(url(), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveStuff(json)));
    };
}
export function fetchSegmentVolumes() {
    return dispatch => {
        return fetch(url(), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveStuff(json)));
    };
}