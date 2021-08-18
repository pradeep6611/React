import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData, storeAndChangeQuestion, submitResponse } from '../actions/quizActions';
import PropTypes from "prop-types";
import Question from './Questions';
import Options from './Options';
import { Spinner, Button } from "reactstrap";
import './style.css';

class Quiz extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moduleId: 0,
            saveAndNextQuestion: this.saveAndNextQuestion.bind(this),
            optionSelectionFound: this.optionSelectionFound.bind(this),
            submit: this.submit.bind(this),
            optionSelected: null,
            isSelected: false
        }
        this.baseState = this.state;
    }

    componentDidMount = () => {
        // console.log('selectedQuestion', this.props.selectedQuestion);
        if(!this.props.isSubmitted)
            this.props.fetchData(this.state.moduleId);
        else if(this.props.isSubmitted){
            const element = this.optionSelectionFound();
            if(!!element) {
                this.setState({
                    optionSelected: element.selectedOption
                })
            }
        }
    }

    componentDidUpdate = (props, state) => {
        // console.log('insideOfComponentMount', this.props.selectedQuestion);
        if(props.selectedQuestion !== this.props.selectedQuestion){
            const element = this.optionSelectionFound();
            if(!!element){
                this.setState({
                    optionSelected: element.selectedOption
                })
            }
        }
    }

    optionSelectionFound = () => {
        return (!!this.props.selectedAnswers && this.props.selectedAnswers.length > 0) ? (this.props.selectedAnswers.find((ele) => 
            (ele.questionNum === this.props.selectedQuestion && ele.selectedOption)
        )) : null;
    }

    previousQuestion = (value) => {        
        this.props.storeAndChangeQuestion({
            incOrDec: value
        })
        this.setState({
            optionSelected: this.baseState.optionSelected
        });
    }

    saveAndNextQuestion = (value) => {
        this.props.storeAndChangeQuestion({
            incOrDec: value,
            selectionMade: this.state.optionSelected
        });
        this.setState({
            optionSelected: this.baseState.optionSelected
        });

    };

    submit = () => {
        this.props.submitResponse({
            selectionMade: this.state.optionSelected,
            isSubmitted: true
        });
        this.setState(this.baseState);
        this.props.history.push("/summary");
    }

    selectedAnswer = (e) => {
        this.setState({
            optionSelected: e.target.value,
            isSelected: true
        })
    }

    render() {
        let markUp;
        if (!this.props.isLoading && Object.keys(this.props.questions).length > 0) {
            console.log('insideOfrender', this.props.questions, this.props.selectedQuestion);
            markUp = (
                <React.Fragment>
                    <Question questNum={this.props.questions[this.props.selectedQuestion].q_id} question={this.props.questions[this.props.selectedQuestion].q_name} />
                    <Options options={this.props.questions[this.props.selectedQuestion].q_options} optionSelected={this.state.optionSelected} selectedAnswer={this.selectedAnswer} />
                    <div className="buttonWrapper">
                        <div className="prevButton">
                            {this.props.selectedQuestion >= 1 ? <Button size="lg" color="light" onClick={this.previousQuestion.bind(this, 'DEC')}>Previous Question</Button> : null}
                        </div>
                        <div className="nextButton">
                            {this.props.selectedQuestion !== this.props.questions.length - 1 ? <Button size="lg" color="light" onClick={this.saveAndNextQuestion.bind(this, 'INC')}>Save and Next</Button> : null}
                        </div>
                        <div className="submitButton">
                            {this.state.isSelected || this.props.isSubmitted ? <Button size="lg" color="light" onClick={this.submit}>Submit</Button> : null}
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        return (
            <div className="main">
                <React.Fragment>
                    <h1>{this.props.moduleName}</h1>
                    {!!this.props.isLoading ? <span>Loading question.. <Spinner size="sm" color="light" /></span> : null}
                    <div>
                        {markUp}
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        moduleName: state.quiz.moduleName,
        isLoading: state.quiz.isLoading,
        questions: state.quiz.questions,
        selectedQuestion: state.quiz.selectedQuestion,
        selectedAnswers: state.quiz.selectedAnswers,
        isSubmitted: state.quiz.isSubmitted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(
            {
                fetchData,
                storeAndChangeQuestion,
                submitResponse
            },
            dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);