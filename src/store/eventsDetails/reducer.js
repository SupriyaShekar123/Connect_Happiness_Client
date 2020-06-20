const initialState = {
  loading: true,
  details: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "EVENTSDETAILS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENTSDETAILS_LOADED": {
      //  console.log("ARTLIST DETAILS, action.payload);
      return {
        ...state,

        loading: true,
        details: action.payload,
      };
    }
    case "EVENTSDETAILS_ERROR": {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};
