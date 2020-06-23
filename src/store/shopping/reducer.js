const initialState = {
  loading: true,
  details: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOPPINGDETAILS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "SHOPPINGDETAILS_LOADED": {
      //  console.log("ARTLIST DETAILS, action.payload);
      return {
        ...state,

        loading: true,
        details: action.payload,
      };
    }
    case "SHOPPINGDETAILS_ERROR": {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};
