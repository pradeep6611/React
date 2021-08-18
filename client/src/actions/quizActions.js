import { FETCH_QUESTION, MODULE_UPDATE, SUBMIT_RESPONSE } from "./types";

export const fetchData = (value) => (dispatch) => {
  dispatch({
    type: MODULE_UPDATE,
    payload: {
      moduleId: value
    }
  })
}

export const storeAndChangeQuestion = ({incOrDec, selectionMade}) => (dispatch) => {
  dispatch({
    type: FETCH_QUESTION,
    payload: {
      incOrDec: incOrDec,
      selectionMade: selectionMade
    }
  })
}

export const submitResponse = ({selectionMade, isSubmitted}) => (dispatch) => {
  dispatch({
    type: SUBMIT_RESPONSE,
    payload: {
      selectionMade: selectionMade,
      isSubmitted: isSubmitted
    }
  })
}

