import { MouseEvent } from "react";

function App() {
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
    </div>
  );
}

export default App;
x