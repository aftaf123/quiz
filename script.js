const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlink Text Model Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "What does JS stand for?",
        choices: ["JavaScript", "JavaStyle", "JavaSource", "JScript"],
        correctAnswer: "JavaScript"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choicesForm = document.getElementById('choices');
const checkAnswerButton = document.getElementById('check-answer');
const nextQuestionButton = document.getElementById('next-question');
const resetAnswerButton = document.getElementById('reset-answer');
const resultElement = document.getElementById('result');

function displayQuestion() {
    questionElement.textContent = questions[currentQuestion].question;
    choicesForm.innerHTML = '';

    questions[currentQuestion].choices.forEach((choice, index) => {
        const choiceContainer = document.createElement('div');
        choiceContainer.classList.add('choice');

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'choice';
        radioButton.value = choice;
        radioButton.id = 'choice' + index;

        const label = document.createElement('label');
        label.textContent = choice;
        label.htmlFor = 'choice' + index;

        choiceContainer.appendChild(radioButton);
        choiceContainer.appendChild(label);
        choicesForm.appendChild(choiceContainer);
    });
}

function checkAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (!selectedChoice) {
        showToast("Please select an option.");
        return;
    }
    const selectedChoiceValue = selectedChoice.value;
    const correctChoice = questions[currentQuestion].correctAnswer;

    const choiceLabels = document.querySelectorAll('.choice label');
    choiceLabels.forEach(label => {
        label.classList.remove('correct', 'incorrect');
        if (label.textContent === correctChoice) {
            label.classList.add('correct');
        } else if (label.textContent === selectedChoiceValue) {
            label.classList.add('incorrect');
        }
    });

    if (selectedChoiceValue === correctChoice) {
        score++;
    
    } 
    disableChoices();
    checkAnswerButton.style.display = 'none';
    nextQuestionButton.style.display = 'block';
    resetAnswerButton.style.display = 'block';
}

function resetAnswer() {
    const choiceLabels = document.querySelectorAll('.choice label');
    choiceLabels.forEach(label => {
        label.classList.remove('correct', 'incorrect');
    });
    resultElement.textContent = '';
    resultElement.classList.remove('correct', 'incorrect');
    enableChoices();
    checkAnswerButton.style.display = 'block';
    nextQuestionButton.style.display = 'none';
    resetAnswerButton.style.display = 'none';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.classList.add('toast');
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

function disableChoices() {
    const choiceElements = document.querySelectorAll('.choice input');
    choiceElements.forEach(choice => {
        choice.disabled = true;
        choice.parentElement.classList.add('disabled');
    });
}

function enableChoices() {
    const choiceElements = document.querySelectorAll('.choice input');
    choiceElements.forEach(choice => {
        choice.disabled = false;
        choice.parentElement.classList.remove('disabled');
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        resultElement.textContent = '';
        resultElement.classList.remove('correct', 'incorrect');
        enableChoices();
        checkAnswerButton.style.display = 'block';
        nextQuestionButton.style.display = 'none';
        resetAnswerButton.style.display = 'none';
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1>Quiz Complete!</h1>
        <p>Your score is: ${score}/${questions.length}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

displayQuestion();
checkAnswerButton.addEventListener('click', checkAnswer);
nextQuestionButton.addEventListener('click', nextQuestion);
resetAnswerButton.addEventListener('click', resetAnswer);
