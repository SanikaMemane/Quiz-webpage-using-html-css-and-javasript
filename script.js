const questions = [
    {
        question: "HTML stands for __________",
        answers: [
            {text: "HyperText Markup Language", correct: true},
            {text: "HyperText Machine Language", correct: false},
            {text: "HyperText Marking Language", correct: false},
            {text: "HighText Marking Language", correct: false},
        ]
    },
    {
        question: "In which part of the HTML metadata is contained?",
        answers: [
            {text: "head tag", correct: true},
            {text: "title tag", correct: false},
            {text: "html tag", correct: false},
            {text: "body tag", correct: false},
        ]
    },
    {
        question: "Which element is used for or styling HTML5 layout?",
        answers: [
            {text: "CSS", correct: true},
            {text: "jQuery", correct: false},
            {text: "JavaScript", correct: false},
            {text: "PHP", correct: false},
        ]
    },
    {
        question: "Which attribute specifies a unique alphanumeric identifier to be associated with an element?",
        answers: [
            {text: "type", correct: false},
            {text: "article", correct: false},
            {text: "id", correct: true},
            {text: "class", correct: false},
        ]
    },
    {
        question: "Which of the following CSS selectors are used to specify a group of elements?",
        answers: [
            {text: "tag", correct: false},
            {text: "id", correct: false},
            {text: "class", correct: true},
            {text: "both class and tag", correct: false},
        ]
    },
    {
        question: "Which of the following CSS framework is used to create a responsive design?",
        answers: [
            {text: "django", correct: false},
            {text: "rails", correct: false},
            {text: "larawell", correct: false},
            {text: "bootstrap", correct: true},
        ]
    },
    {
        question: "Which of the following CSS property is used to make the text bold?",
        answers: [
            {text: "text-decoration: bold", correct: false},
            {text: "font-weight: bold", correct: true},
            {text: "font-style: bold", correct: false},
            {text: "text-align: bold", correct: false},
        ]
    },
    {
        question: "Which of the following is not the property of the CSS box model?",
        answers: [
            {text: "margin", correct: false},
            {text: "color", correct: true},
            {text: "width", correct: false},
            {text: "height", correct: false},
        ]
    },
    {
        question: "Which of the following is correct about JavaScript?",
        answers: [
            {text: "JavaScript is an Object-Based language", correct: true},
            {text: "JavaScript is Assembly-language", correct: false},
            {text: "JavaScript is an Object-Oriented language", correct: false},
            {text: "JavaScript is a High-level language", correct: false},
        ]
    },
    {
        question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        answers: [
            {text: "Position", correct: false},
            {text: "Window", correct: true},
            {text: "Standard", correct: false},
            {text: "Location", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();