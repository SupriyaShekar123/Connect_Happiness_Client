const initialState = {
  loading: true,
  details: [],
  participents: [],
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
        details: [action.payload],
      };
    }
    case "EVENTSDETAILS_ERROR": {
      return {
        ...state,
        loading: true,
      };
    }
    case "PARTICIPENTS_SUCCESS": {
      //  console.log("ARTLIST DETAILS, action.payload);
      return {
        ...state,

        participents: action.payload,
      };
    }

    case "REMOVE_USER": {
      //  console.log("ARTLIST DETAILS, action.payload);
      return {
        ...state,

        participents: action.payload,
      };
    }
    case "EVENTS_CREATE_SUCCESS": {
      //  console.log("ARTLIST DETAILS, action.payload);
      return {
        ...state,

        createEvents: action.payload,
      };
    }

    default:
      return state;
  }
};
