const initialState = {
  loading: true,
  details: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOPPING_DETAIL_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "SHOPPING_DETAIL_LOADED": {
      //  console.log("ARTLIST DETAILS, action.payload);
      return {
        ...state,

        loading: true,
        details: [action.payload],
      };
    }
    case "SHOPPING_DETAIL_ERROR": {
      return {
        ...state,
        loading: true,
      };
    }
    case "UPDATE_SHOPPING": {
      return {
        ...state,
        details: state.details.map((update) => {
          console.log("update redux", update);
          return { ...update, volunteerId: action.payload };
        }),
      };
    }
    default:
      return state;
  }
};