import { MouseEvent, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./API";
import { Difficulty } from "./API";

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGaveOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));


  //the first function we fire off when we start the quiz:
  const startTrivia = async () => {}

  //we will trigger this function when the user selects an answer
  //that's why the function will accept event as a parameter
  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {};
  
  //this function will be triggered when the user clicks for the next question:
  const nextQuestion = () => {}

  return (
    <div className="App">
     <h1>Quiz</h1>
     <button className="start" onClick={startTrivia}>Start</button>
     <p className="score">Score:</p>
     <p>Loading questions...</p>
     {/* <QuestionCard 
      questionNr={questionNumber + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[questionNumber].question}
      answers={questions[questionNumber].answers}
      userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
      callback={checkAnswer}
      /> */}
     <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;

//questionNr={questionNumber + 1}: we add one as the array start from zero
