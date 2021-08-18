import React from 'react';
// import { useSelector } from 'react-redux';

const Result = (props) =>  {
    // const answeredQues = useSelector(state => state.selectedAnswers);
    const { QuestionsAnswered, correctlyAnswered, totalQuestions } = props.location.state;
    return (
        <div>
            <p>Result of the Quiz</p>
            <p>{correctlyAnswered} out of {totalQuestions} questions answered are correct</p>
            <p>Percentage of marks scored: <span>{(correctlyAnswered/totalQuestions) * 100 } %</span></p>
        </div>
    );
}

export default Result;