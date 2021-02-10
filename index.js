// const correctAnswers = ["A", "A", "A", "A"]
let correctAnswers = []

const form = document.querySelector(".quiz-form")
const totalScore = document.querySelector("span")
const result = document.querySelector(".result")
const question = document.querySelectorAll(".question")


form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Count score
    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score += 25
        }
    })

    // Show result
    scrollTo(0, 0) // Take user to the top
    result.classList.remove("d-none")

    let output = 0
    const timer = setInterval(() => {
        totalScore.textContent = `${output}%`

        if (output === score) {
            clearInterval(timer)
        }
        output++
    }, 10)

    getQuestions()
    setTimeout(() => {
        result.classList.add("d-none")
    }, 2000)


})


const getQuestions = () =>  {
    // Fetch from api
    const URL = "https://opentdb.com/api.php?amount=4&category=11&difficulty=medium&type=boolean&encode=base64"
    fetch(URL)
        .then(response => response.json())
        .then(data => {
        //console.log(data)
        question.forEach((q, i) => {
            q.textContent = atob(data.results[i].question)
            const correctAnswer = atob(data.results[i].correct_answer)

            if (correctAnswer === "True") {
                correctAnswers.push("A")
            } else {
                correctAnswers.push("B")
            }

        })
    })
}

getQuestions()

