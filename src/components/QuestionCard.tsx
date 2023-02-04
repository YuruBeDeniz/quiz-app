import { AnswerObject } from "../App";
import { MouseEvent } from "react";
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type QuestionCardProps = {
    question: string;
    answers: string[];
    callback: (e: MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

export default function QuestionCard (props: QuestionCardProps) {
    const { question, answers, callback, userAnswer, questionNr, totalQuestions } = props;
  return (
    <Wrapper>
    <div>
        <p className="number">Question: {questionNr} / {totalQuestions} </p>
        <p dangerouslySetInnerHTML={{__html: question}} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                    <button 
                        disabled={!!userAnswer}
                        value={answer}
                        onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </div>
    </Wrapper>
  )
};

//disabled={userAnswer} needs to be a boolean value; to convert unserAnswer 
//to a boolean value use two exclamation marks !!
//or: disabled={userAnswer ? true : false}
