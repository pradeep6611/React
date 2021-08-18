import { combineReducers} from 'redux';
// import errorReducer from './errorReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import statusReducer from './statusReducer';
import quizReducer from './quizReducer';

export default combineReducers({
    // error: errorReducer,
    auth: authReducer,
    ui: uiReducer,
    status: statusReducer,
    quiz: quizReducer
});