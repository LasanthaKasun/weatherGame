import { ADD_GUESS_VALUE, NEW_GAME } from "../types/type";

const initialState = {
  tempatureData: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GUESS_VALUE:
      return {
        ...state,
        tempatureData: [...state.tempatureData, action.data],
      };
    case NEW_GAME: {
      return {
        ...state,
        tempatureData: [],
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
