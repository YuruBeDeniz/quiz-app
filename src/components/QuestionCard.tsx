

type QuestionCardProps = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

export default function QuestionCard (props: QuestionCardProps) {
    const { question, answers, callback, userAnswer, questionNr, totalQuestions } = props;
  return (
    <div>
        <p className="number">Question: {questionNr} / {totalQuestions} </p>
        <p dangerouslySetInnerHTML={{__html: question}} />
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer} onClick={callback}></button>
                    <span dangerouslySetInnerHTML={{__html: answer}} />
                </div>
            ))}
        </div>
    </div>
  )
}
