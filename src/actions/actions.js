import * as types from './actionTypes';
const api = `http://localhost:8061`;
const segments = `segments`;
const volumes = `segments/volumes`;

export function receiveStuff(json) {
    return {type: types.RECEIVE_STUFF, stuff: json.stuff};
}

export function fetchSegmentNames() {
    return dispatch => {
        return fetch(`${api}/${segments}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveStuff(json)));
    };
}
export function fetchSegmentVolumes() {
    return dispatch => {
        return fetch(`${api}/${volumes}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveStuff(json)));
    };
}