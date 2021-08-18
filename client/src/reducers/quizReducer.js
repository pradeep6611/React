import {
    FETCH_QUESTION,
    MODULE_UPDATE,
    SUBMIT_RESPONSE
} from "../actions/types";
import jsonData from '../data/dataQues.json';
import cloneDeep from 'lodash/cloneDeep';
const INCREMENT = 'INC', DECREMENT = 'DEC';

const initialState = {
    isLoading: true,
    selectedQuestion: 0,
    moduleName: null,
    questions: [],
    selectedAnswers: [],
    isSubmitted: false,
    totalData: cloneDeep(jsonData)
};

function questionSelection(selectedQuestion, value) {

    switch(value) {
        case INCREMENT:
            return selectedQuestion + 1;
        case DECREMENT: 
            return selectedQuestion - 1;
        default:
            return selectedQuestion;
    }
}

function answerUpdation(answerArray, answer, questionId) {
    const newObject = {};
    const index = !!answerArray && answerArray.findIndex(obj => obj.questionNum === questionId);

    if(index < 0) {
        newObject.questionNum = questionId;
        newObject.selectedOption = answer;
        return [...answerArray, newObject];
    } else {
        answerArray[index].selectedOption = answer;
        return answerArray;
    }
}
  
export default function (state = initialState, action) {
    switch (action.type) {
        case MODULE_UPDATE:
            return {
                ...state,
                isLoading: false,
                isSubmitted: false,
                moduleName: state.totalData.modules[action.payload.moduleId].module_name,
                questions: state.totalData.modules[action.payload.moduleId].questions
            }

        case FETCH_QUESTION: 
            return {
                ...state,
                selectedQuestion: !!action.payload.incOrDec ? questionSelection(state.selectedQuestion, action.payload.incOrDec) : state.selectedQuestion,
                selectedAnswers: (action.payload.incOrDec === INCREMENT && !!action.payload.selectionMade) ? answerUpdation(state.selectedAnswers, action.payload.selectionMade, state.selectedQuestion) : [...state.selectedAnswers]
            }

        case SUBMIT_RESPONSE:
            return {
                ...state,
                selectedAnswers: !!action.payload.selectionMade ? answerUpdation(state.selectedAnswers, action.payload.selectionMade, state.selectedQuestion) : [...state.selectedAnswers], 
                isSubmitted: action.payload.isSubmitted
        }

        default:
            return state;
    }
}