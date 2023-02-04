import { MouseEvent, useState } from "react";
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./API";
import { QuestionsState, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGaveOver] = useState(true);

  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  //console.log(questions)


  //the first function we fire off when we start the quiz:
  //when we click the start button, we'll trigger the API fetch,
  //that means we're loading something (and it is async)
  const startTrivia = async () => {
    setLoading(true);
    setGaveOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  };
  

  //we will trigger this function when the user selects an answer
  //that's why the function will accept event as a parameter
  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //user's answer:
      const answer = e.currentTarget.value;

      //check answer against correct answer
      const correct = questions[questionNumber].correct_answer === answer;

      // add score if answer is correct
      if (correct) setScore(prev => prev + 1);

      //save the answer in the array of user answers:
      const answerObject = {
        question: questions[questionNumber].question,
        answer: answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      }
      console.log(answerObject)
      setUserAnswers(prev => [...prev, answerObject])
    }
  };
  
  //this function will be triggered when the user clicks for the next question:
  const nextQuestion = () => {
    //move on to the next question if not the last question
    const nextQuestion = questionNumber + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGaveOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  }

  return (
    <>
    <GlobalStyle />
      <Wrapper>
     <h1>QUIZ</h1>

     {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
      <button className="start" onClick={startTrivia}>Start</button>
      : null }
     
     {!gameOver ? 
      <p className="score">Score: {score}</p> 
      : null }

     {loading && <p>Loading questions...</p> }

     {!loading && !gameOver && 
     <QuestionCard 
     questionNr={questionNumber + 1}
     totalQuestions={TOTAL_QUESTIONS}
     question={questions[questionNumber].question}
     answers={questions[questionNumber].answers}
     userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
     callback={checkAnswer}
     />
     }

     {!gameOver && 
      !loading && 
      userAnswers.length === questionNumber + 1 && 
      questionNumber !== TOTAL_QUESTIONS - 1 ?
        <button className="next" onClick={nextQuestion}>Next Question</button>
      : null
    }
    </Wrapper>
    </>
  );
}

export default App;

//questionNr={questionNumber + 1}: we add one as the array start from zero

//we only want to show the score if we're not in a game over mode

//next question will only be shown;
//if we're not in a game over 
//and we are not loading
//and userAnswers.length equals questionNumber +1 by doing this:
//we just want to show the next question when the user actually has put in an answer
//so we dont show it if the user hasn't given us an answer yet 
//questionNumber !== TOTAL_QUESTIONS - 1 -> this is to check 
//if we are not on the last question