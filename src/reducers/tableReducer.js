import * as TYPE from "../actions/actionTypes";

export const TABLE_REDUCER = "tableReducer";
export const initialState = {
  segments: [],
  isLoading: false,
  isError: false
};

export default function tableReducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.FETCH_SEGMENTS: {
      return Object.assign({}, state, {
        segments: [...action.segments]
      });
    }
    case TYPE.LOADING_SEGMENTS: {
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    }
    default:
      return state;
  }
}
