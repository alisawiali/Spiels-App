const question = [
  {
    question: "Which is larget animal in the world?",
    answers: [
      { Text: "shark", correct: false },
      { Text: "Blue Whale", correct: true },
      { Text: "Elephant", correct: false },
      { Text: "Griaffe", correct: false },
    ],
  },
  {
    question: "Which is larget country in the world?",
    answers: [
      { Text: "VAtican", correct: true },
      { Text: "Bhutan", correct: true },
      { Text: "Nepal", correct: false },
      { Text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is larget desert in the world?",
    answers: [
      { Text: "Kalahari", correct: false },
      { Text: "Gobi", correct: false },
      { Text: "Sahara", correct: false },
      { Text: "Antractica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent  in the world?",
    answers: [
      { Text: "Asia", correct: false },
      { Text: " Australia", correct: true },
      { Text: "Artic", correct: false },
      { Text: "Afirca", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // aktuell
let score = 0; // Punktzahl

function startQuzi() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNO = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNO + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.Text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selctTedBtn = e.target;
  const isCorrect = selctTedBtn.dataset.correct === true;
  if (isCorrect) {
    selctTedBtn.classList.add("correct");
    score++;
  } else {
    selctTedBtn.classList.add("incorrect"); // غير صحيح
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `your scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuzi();
  }
});

startQuzi();
