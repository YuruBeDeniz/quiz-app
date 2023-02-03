import { shuffleArray } from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}; 

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
};

export const fetchQuizQuestions =async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    console.log(data);
    return data.results.map((question: Question) => (
        {...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer]) }
    ))
};

//as we want to be able to specify how many questions that we want to grab,
//we can create a parameter amount
//difficulty is going to be easy, medium or hard as we cannot grab this from the API
//we should be able to set it here
//it can only be easy, medium or hard; so use enum

//we use two awaits as first we await the fetch itself and then we await when 
//we convert it to json


//by looking at console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
//we can create the type of the question
//here we have correct_answer and incorrect_answers as separate properties
//we will modify them to be in the same array as we want to mao through this array 
//and create the answers in the UI; to do that:
//export type QuestionState = Question & { answers: string[]}