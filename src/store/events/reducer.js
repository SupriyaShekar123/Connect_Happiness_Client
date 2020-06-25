const initialState = {
  loading: true,
  events: [],
  shopping: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "EVENTS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENTS_LOADED": {
      //  console.log("ARTLIST DETAILS, action.payload);
      return {
        ...state,

        loading: true,
        events: action.payload,
      };
    }
    case "EVENTS_ERROR": {
      return {
        ...state,
        loading: true,
      };
    }
    // case "LISTS_SUCCESS": {
    //   console.log("SHOPPING ACTIION ", action.payload);
    //   return {
    //     ...state,
    //     shopping: [action.payload],
    //   };
    // }
    default:
      return state;
  }
};
