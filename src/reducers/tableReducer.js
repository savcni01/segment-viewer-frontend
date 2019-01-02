import {FETCH_SEGMENT_NAMES, FETCH_SEGMENT_VOLUMES} from '../actions/actionTypes';

export const TABLE_REDUCER = 'tableReducer'
export const initialState = {
}

export default function tableReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SEGMENT_NAMES:
            console.log('FETCH_SEGMENT_NAMES action')
            return state
        case FETCH_SEGMENT_VOLUMES:
            console.log('FETCH_SEGMENT_NAMES action')
            return state
        default:
            return state
    }
}
