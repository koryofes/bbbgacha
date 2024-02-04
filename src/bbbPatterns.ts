class PatternA {
    alpha: number
    beta: number
    a: number
    b: number
    c: number
    d: number

    constructor(
        alpha: number | undefined = undefined,
        beta: number | undefined = undefined,
        a: number | undefined = undefined,
        b: number | undefined = undefined,
        c: number | undefined = undefined,
        d: number | undefined = undefined,
    ) {
        // 分母がゼロになる場合を除外できていないがそうなる確率は結構低いはずだから無視
        this.alpha = alpha ?? this.generateCoefficient()
        this.beta = beta ?? this.generateCoefficient()
        this.a = a ?? this.generateCoefficient()
        this.b = b ?? this.generateCoefficient()
        this.c = c ?? this.generateCoefficient()
        this.d = d ?? this.generateCoefficient()
    }

    getQuestionKaTeX() {
        const p = this.clearIfOne(this.c*this.alpha + this.a*this.beta)
        const q = (this.alpha*this.d + this.beta*this.b).toString()
        const a = this.clearIfOne(this.a*this.c)
        const b = this.clearIfOne(this.a*this.d + this.b*this.c)
        const c = (this.b*this.d).toString()

        return (
            "\\frac"+
            `{${p}x + ${q}}`+ // numerator
            `{${a}x^2 + ${b}x + ${c}}` //　this.denominator
        )
    }

    getAnswerKaTex() {
        const alpha = this.alpha.toString()
        const beta = this.beta.toString()
        const a = this.clearIfOne(this.a)
        const b = this.b.toString()
        const c = this.clearIfOne(this.c)
        const d = this.d.toString()
        return (
            `\\frac{${alpha}}{${a}x + ${b}}` +
            "+" +
            `\\frac{${beta}}{${c}x + ${d}}`
        )
    }

    private generateCoefficient() {
        return 1 + Math.floor(Math.random() * 8)
    }

    private clearIfOne(x: number) {
        if (x===1) {
            return ""
        } else if (x===-1) {
            return "-"
        } else {
            return x.toString()
        }
    }
}

export {PatternA}