import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const Summary = ({history}) => {
    const answeredQues = useSelector(state => state.quiz.selectedAnswers);
    const totalQuestions = useSelector(state => state.quiz.questions);
    const unansweredQuesCount = !!totalQuestions && totalQuestions.length > 0 && !!answeredQues && answeredQues.length > 0 ? totalQuestions.length - answeredQues.length : null; 
    const correctlyAnswered = !!answeredQues && answeredQues.length > 0 && !!totalQuestions && totalQuestions.length > 0 ? 
    totalQuestions.filter(ques => {
        return answeredQues.find(answer => {
            return answer.selectedOption === ques.q_answer && answer.questionNum + 1 === parseInt(ques.q_id);
        })
    }) : null;
    // console.log('data', correctlyAnswered, unansweredQuesCount, totalQuestions, answeredQues);

    function submitResponse() {
        history.push({
            pathname: "/result",
            state: {
                QuestionsAnswered: !!answeredQues && answeredQues.length > 0 ? answeredQues.length : 0,
                totalQuestions: !!totalQuestions && totalQuestions.length > 0 ? totalQuestions.length : 0,
                correctlyAnswered: !!correctlyAnswered && correctlyAnswered.length > 0 ? correctlyAnswered.length : 0,
                unansweredQuesCount: unansweredQuesCount
            }
        });
    }

    function goBack() {
        history.push("/quiz");
    }

    return (
        <div>
            <p>Quiz Summary</p>
            <p>Total Questions: <span>{!!totalQuestions && totalQuestions.length}</span></p>
            <p>Questions Answered: <span>{!!answeredQues && answeredQues.length}</span></p>
            <p>Questions Unanswered: <span>{unansweredQuesCount}</span></p>
            <p>Do you want to proceed to submit your responses?</p>
            <button onClick={submitResponse} >Yes</button>
            <button onClick={goBack} >No</button>
        </div>
    );
}

export default withRouter(Summary);
