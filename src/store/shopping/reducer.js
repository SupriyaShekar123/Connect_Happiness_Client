const initialState = {
  loading: true,
  details: [],
  shopping: [],
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
    case "LISTS_SUCCESS": {
      console.log("SHOPPING ACTIION ", action.payload);
      return {
        ...state,
        shopping: action.payload,
      };
    }
    case "SENT_MAIL": {
      return {
        ...state,
        sentMail: action.payload,
      };
    }
    default:
      return state;
  }
};
