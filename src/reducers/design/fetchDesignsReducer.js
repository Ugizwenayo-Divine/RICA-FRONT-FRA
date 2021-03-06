import {
  FETCH_DESIGN_END,
  FETCH_DESIGN_START,
  FETCH_DESIGN_FAILURE,
  FETCH_DESIGN_SUCCESS,
} from '../../actionTypes/DesignsActionTypes';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_DESIGN_START:
      return {
        ...state,
        loading: true,
        message: null,
        designErrors: null,
      };
    case FETCH_DESIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.message,
        designErrors: null,
        designs: {
          list: [...payload.data],
        },
      };
    case FETCH_DESIGN_FAILURE:
      return {
        ...state,
        loading: false,
        message: null,
        designErrors: payload.error,
      };
    case FETCH_DESIGN_END:
      return {
        ...state,
        loading: false,
        message: null,
        designErrors: null,
      };

    default:
      return null;
  }
};
export default reducer;
