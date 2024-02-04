"use client"

import {FormEvent, useCallback, useRef, useState} from "react"
import {InlineMath} from "react-katex";
import {PatternA} from "@/bbbPatterns";
import "katex/dist/katex.min.css"


type Status = {
    currentBBB: PatternA,
    questionNumber: number,
    questionShowTimestamp: number
    questionQuantity: number,
    times: number[],
    wasCorrect: boolean[]
}

const Home = () => {
    const questionNumberInputRef = useRef<HTMLInputElement>(null)
    const [status, setStatus] = useState<Status>()
    const [showAnswer, setShowAnswer] = useState(false)

    const startQuestion = useCallback(() => {
        if (!
            (0 < questionNumberInputRef.current!.valueAsNumber)
            &&
            (questionNumberInputRef.current!.valueAsNumber <= 10)
        ) { // 単純に0<問題数<=10ってやりたいだけなのにこれはカスすぎる
            alert("0<問題数<=10")
            return
        }

        setStatus({
            currentBBB: new PatternA(),
            questionNumber: 0,
            questionShowTimestamp: new Date().getTime(),
            questionQuantity: questionNumberInputRef.current!.valueAsNumber,
            times: [],
            wasCorrect: []
        })
    }, [])

    const answerQuestion = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const isCorrect = (
            status!.currentBBB.alpha === Number(formData.get("alpha")) &&
            status!.currentBBB.beta === Number(formData.get("beta")) &&
            status!.currentBBB.a === Number(formData.get("a")) &&
            status!.currentBBB.b === Number(formData.get("b")) &&
            status!.currentBBB.c === Number(formData.get("c")) &&
            status!.currentBBB.d === Number(formData.get("d"))
        )

        setStatus({
            currentBBB: status!.currentBBB,
            questionNumber: status!.questionNumber,
            questionShowTimestamp: status!.questionShowTimestamp,
            questionQuantity: status!.questionQuantity,
            times: status!.times.concat([new Date().getTime() - status!.questionShowTimestamp]),
            wasCorrect: status!.wasCorrect.concat([isCorrect])
        })

        setShowAnswer(true)
    }, [status])

    const next = useCallback(() => {
        setStatus({
            currentBBB: new PatternA(),
            questionNumber: status!.questionNumber+1,
            questionShowTimestamp: new Date().getTime(),
            questionQuantity: status!.questionQuantity,
            times: status!.times,
            wasCorrect: status!.wasCorrect,
        })
        setShowAnswer(false)
    }, [status]);

    const finish = useCallback(() => {
        alert(
            `正解数:${status!.wasCorrect.filter(v => v).length}/${status!.questionQuantity}\n`
            +
            `平均回答時間:${status!.times.reduce((a, b) => a+b)/status!.questionQuantity/1000}秒`
        )
        setStatus(undefined)
        setShowAnswer(false)
    }, [status]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">部分分数分解ガチャ</h1>
            <div className="flex items-center mb-4">
                <span className="mr-2">問題数</span>
                <input ref={questionNumberInputRef} type="number" className="border p-1"/>
            </div>
            <button onClick={startQuestion}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">スタート
            </button>
            <p className="mb-4">
                <span className="font-bold">問題:</span>
                <InlineMath>
                    {
                        (status?.currentBBB.getQuestionKaTeX() ?? "")
                        +
                        "= \\frac{\\alpha}{ax + b} + \\frac{\\beta}{cx + d}"
                    }
                </InlineMath>
            </p>
            {
                showAnswer &&
                <>
                    <p className="mb-4">
                        <span className="font-bold">答え:</span>
                        <InlineMath>{status?.currentBBB.getAnswerKaTex() ?? ""}</InlineMath>
                    </p>
                    {
                        status!.questionNumber + 1 !== status!.questionQuantity ?
                            <button onClick={next}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">次の問題</button> :
                            <button onClick={finish}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">終わる</button>
                    }
                </>
            }
            <form onSubmit={answerQuestion} className="flex flex-wrap justify-center items-center gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <InlineMath>\alpha</InlineMath>
                    <input type="number" name="alpha" className="border p-1"/>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <InlineMath>\beta</InlineMath>
                    <input type="number" name="beta" className="border p-1"/>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <InlineMath>a</InlineMath>
                    <input type="number" name="a" className="border p-1"/>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <InlineMath>b</InlineMath>
                    <input type="number" name="b" className="border p-1"/>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <InlineMath>c</InlineMath>
                    <input type="number" name="c" className="border p-1"/>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <InlineMath>d</InlineMath>
                    <input type="number" name="d" className="border p-1"/>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">回答する
                    </button>
                </div>
            </form>
        </main>

    )
}

export default Home
