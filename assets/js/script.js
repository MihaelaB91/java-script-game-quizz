const quizContainer = document.getElementById('quiz');
const scoreContainer = document.getElementById('score');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart');

// create questions
const myQuestions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "London",
            b: "Paris",
            c: "Berlin"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the largest country in the world?",
        answers: {
            a: "Russia",
            b: "Canada",
            c: "China"
        },
        correctAnswer: "a"
    },
    {
        question: "What year did World War II end?",
        answers: {
            a: "1940",
            b: "1944",
            c: "1945"
        },
        correctAnswer: "c"
    }
];

// function to build quiz
function buildQuiz() {
    const output = [];

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        // for each available answer
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    // finally, combine output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

// function to show results
function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = '#4CAF50';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[questionNumber].style.color = '#FF0000';
        }
    });

    // show number of correct answers out of total
    scoreContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} correct!`;
}

// function to reset quiz
function resetQuiz() {
    buildQuiz();
    scoreContainer.innerHTML = '';
}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);

// on restart, reset quiz
restartButton.addEventListener('click', resetQuiz);
