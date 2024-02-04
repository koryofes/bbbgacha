"use client"

import { InlineMath } from "react-katex"
import { useCallback, useState } from "react"
import { PatternA } from "@/bbbPatterns"
import "katex/dist/katex.min.css"


const Home = () => {
    const [katexQuestion, setKatexQuestion] = useState("")
    const [katexAnswer, setKatexAnswer] = useState("")
    const [showAnswer, setShowAnswer] = useState(false)

    const setNewBBB = useCallback(() => {
        const bbbQuestion = new PatternA
        setKatexQuestion(bbbQuestion.getQuestionKaTeX())
        setKatexAnswer(bbbQuestion.getAnswerKaTex())
        setShowAnswer(false)
    }, [])

    const showBBBAnswer = useCallback(() => {
        setShowAnswer(true)
    }, [])

    return (
        <main className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center space-y-5">
            <h1 className="text-4xl text-blue-700">部分分数分解ガチャ</h1>
            <div className="flex space-x-4">
                <button onClick={setNewBBB}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                >回す</button>
                <button onClick={showBBBAnswer}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                >回答を見る</button>
            </div>
            <p className="text-xl text-gray-800">
                <span className="font-bold">問題:</span>
                <InlineMath>{katexQuestion}</InlineMath>
            </p>
            {
                showAnswer &&
                <p className="text-xl text-gray-800">
                    <span className="font-bold">解答:</span>
                    <InlineMath>{katexAnswer}</InlineMath>
                </p>
            }
        </main>
    )
}

export default Home
