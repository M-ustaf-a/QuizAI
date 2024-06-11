'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";

const questions = [
    {
        questionText: "what is React?",
        answer: [
            {answerText: "A library for building user interfaces", isCorrect: true, id:1},
            {answerText: "A front-end framework", isCorrect: false, id:2},
            {answerText: "A database", isCorrect: false, id:4}
        ]
    },
    {
        questionText: "What is JSX?",
        answer: [
            { answerText: "JavaScript XML", isCorrect: true, id:1},
            {answerText: "JavaScript and XML", isCorrect: false, id:3},
            {answerText: "JavaScript and HTML", isCorrect: false, id:4}
        ]
    },
    {
        questionText: "What is the virtual DOM?",
        answer: [
            { answerText: "A virtual representation of the DOM", isCorrect: true, id:1},
            {answerText: "A real DOM", isCorrect: false, id:2},
            {answerText: "A virtual representation of the browser", isCorrect: false, id:3},
            {answerText: "A virtual representation of the server", isCorrect: false, id:4}
        ]
    }
]


export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleNext = ()=>{
    if(!started){
        setStarted(true);
        return;
    }

    if(currentQuestion<questions.length-1){
        setCurrentQuestion(currentQuestion+1);
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
  }

  const handleAnswer =(answer)=>{
    setSelectedAnswer(answer.id);
    const isCurrectCorrect = answer.isCorrect;
    if(isCurrectCorrect){
        setScore(score+1);
    }
    setIsCorrect(isCurrectCorrect);
  }

  return (
    <div className="flex flex-col flex-1">
    <div className="position-stickey top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
            <Button size="icon" variant="outline"><ChevronLeft/></Button>
            <ProgressBar value={(currentQuestion/questions.length)*100}/>
            <Button size="icon" variant="outline"><X/></Button>
            
        </header>
    </div>
    <main className="flex justify-center flex-1">
      {!started?<h1 className="text-3xl font-bold">Welcome to the quizz page👋</h1>:(
        <div>
            <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
                {
                    questions[currentQuestion].answer.map(answer=>{
                        const variant = selectedAnswer === answer.id?(answer.isCorrect?"neoSuccess":"neoDanger"):"neOutline"
                        return(
                            <Button key={answer.id} variant={"secondary"} onClick={()=>handleAnswer(answer)}>{answer.answerText}</Button>
                        )
                    })
                }
                
            </div>
        </div>
      )}
    </main>
    <footer className="footer pb-9 px-6 relative mb-0">
       <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answer.find(answer=>answer.isCorrect===true)?.answerText}/>
      <Button variant='neo' size="lg" onClick={handleNext}>{!started ? 'Start':'Next'}</Button>
    </footer>
    </div>
  )
}
