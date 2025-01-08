const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    a: "Earth",
    b: "Mars",
    c: "Jupiter",
    d: "Venus",
    correct: "b",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    a: "William Shakespeare",
    b: "Charles Dickens",
    c: "J.K. Rowling",
    d: "Leo Tolstoy",
    correct: "a",
  },
  {
    question: "What is the boiling point of water at sea level?",
    a: "90°C",
    b: "100°C",
    c: "110°C",
    d: "120°C",
    correct: "b",
  },
  {
    question: "Which is the smallest prime number?",
    a: "1",
    b: "2",
    c: "3",
    d: "5",
    correct: "b",
  },
  {
    question: "What is the chemical symbol for gold?",
    a: "Au",
    b: "Ag",
    c: "Fe",
    d: "Pb",
    correct: "a",
  },
  {
    question: "Who painted the 'Mona Lisa'?",
    a: "Vincent van Gogh",
    b: "Pablo Picasso",
    c: "Leonardo da Vinci",
    d: "Claude Monet",
    correct: "c",
  },
  {
    question: "Which is the largest ocean on Earth?",
    a: "Atlantic Ocean",
    b: "Indian Ocean",
    c: "Pacific Ocean",
    d: "Arctic Ocean",
    correct: "c",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    a: "Gold",
    b: "Iron",
    c: "Diamond",
    d: "Platinum",
    correct: "c",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    a: "China",
    b: "South Korea",
    c: "Japan",
    d: "Thailand",
    correct: "c",
  },
  {
    question:
      "Which gas do plants absorb from the atmosphere during photosynthesis?",
    a: "Oxygen",
    b: "Nitrogen",
    c: "Carbon Dioxide",
    d: "Methane",
    correct: "c",
  },
  {
    question: "What is the square root of 64?",
    a: "6",
    b: "7",
    c: "8",
    d: "9",
    correct: "c",
  },
  {
    question: "What is the capital of India?",
    a: "Mumbai",
    b: "New Delhi",
    c: "Kolkata",
    d: "Chennai",
    correct: "b",
  },
  {
    question: "Who discovered gravity?",
    a: "Albert Einstein",
    b: "Isaac Newton",
    c: "Galileo Galilei",
    d: "Nikola Tesla",
    correct: "b",
  },
  {
    question: "What is the freezing point of water in Celsius?",
    a: "0°C",
    b: "32°C",
    c: "-10°C",
    d: "100°C",
    correct: "a",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    a: "Tiger",
    b: "Lion",
    c: "Elephant",
    d: "Cheetah",
    correct: "b",
  },
  {
    question: "What is the tallest mountain in the world?",
    a: "K2",
    b: "Kangchenjunga",
    c: "Mount Everest",
    d: "Lhotse",
    correct: "c",
  },
  {
    question: "Which element has the chemical symbol 'He'?",
    a: "Helium",
    b: "Hydrogen",
    c: "Hafnium",
    d: "Holmium",
    correct: "a",
  },
  {
    question: "What is the largest planet in our solar system?",
    a: "Earth",
    b: "Jupiter",
    c: "Saturn",
    d: "Neptune",
    correct: "b",
  },
  {
    question: "Who invented the telephone?",
    a: "Alexander Graham Bell",
    b: "Thomas Edison",
    c: "Nikola Tesla",
    d: "Guglielmo Marconi",
    correct: "a",
  },
  {
    question: "What is the smallest continent by land area?",
    a: "Europe",
    b: "Australia",
    c: "Antarctica",
    d: "South America",
    correct: "b",
  },
];

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const startButton = document.getElementById("start");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const initialMessage = document.getElementById("intital-message");
const timerElement = document.getElementById("timer-element");
const navigationButtons = document.getElementById("navigation-buttons");
const simpleQuiz = document.getElementById("simple-quiz");
const resultDisplay = document.getElementById("result-display");
let currentQuestionIndex = 0;
let timer;
let time = 120;
let selectedAnswers = {};

function buildQuiz() {
  showQuestion(currentQuestionIndex);
  navigationButtons.style.display = "flex";
}

function showQuestion(index) {
  const currentQuestion = quizData[index];
  if (index === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
  if (index === quizData.length - 1) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
  const answers = [];
  for (const letter in currentQuestion) {
    if (letter !== "question" && letter !== "correct") {
      answers.push(`
          <div>
            <label>
            <div style="margin-top: 10px";></div>
              <input type="radio" name="question${index}" value="${letter}" ${
        selectedAnswers[index] === letter ? "checked" : ""
      }>
        
              ${letter}: ${currentQuestion[letter]}
            </label>
          </div>
        `);
    }
  }
  quizContainer.innerHTML = `
      <div class="question"><b>${index + 1}. ${
    currentQuestion.question
  }</b></div>
      <div class="answers">${answers.join("")}</div>
    `;

  navigationButtons.style.display = "flex";
  navigationButtons.style.justifyContent = "space-between";
  navigationButtons.style.alignItems = "center";
  navigationButtons.style.marginTop = "5px";
  nextButton.style.width = "100px";
  prevButton.style.width = "100px";
  prevButton.style.order = 1;
  nextButton.style.order=2;
  submitButton.style.order=3;
  submitButton.style.marginLeft = "auto";

}

const style = document.createElement("style");
style.innerHTML = `
    .answers label {
      line-height: 1.5;
      margin-top: 10px;
    }
    .question {
      font-size: 20px;
    }
    #quiz {
      display: block;
    }
    #results {
      display: none;
    }
  `;
document.head.appendChild(style);

function showResults() {
  let numCorrect = 0;
  let resultsHTML = "";
  simpleQuiz.style.display = "none";
  resultDisplay.style.display = "flex";
  resultDisplay.style.justifyContent = "center";

  quizData.forEach((currentQuestion, questionNumber) => {
    const userAnswer = selectedAnswers[questionNumber];

    if (userAnswer === currentQuestion.correct) {
      numCorrect++;
      resultsHTML += `<p style="border:1px solid black" ></p>`;
      resultsHTML += `<p style="color: green;"><b>Question ${
        questionNumber + 1
      }: Correct</b></p>`;
    } else {
      resultsHTML += `<p style="border:1px solid black" ></p>`;
      resultsHTML += `<p style="color: red;"><b>Question ${
        questionNumber + 1
      }: Incorrect</b></p>`;
      resultsHTML += `<p>Your answer: ${
        userAnswer ? currentQuestion[userAnswer] : "No answer selected"
      }</p>`;
      resultsHTML += `<p>Correct answer: ${currentQuestion.correct}: ${
        currentQuestion[currentQuestion.correct]
      }</p>`;
    }
  });

  resultsContainer.innerHTML = `
    <div style="display: flex; justify-content: center; text-transform: uppercase; font-size: 18px; font-family: Arial, sans-serif;">
        You got 
        <span style="color: green; font-weight: bold; margin: 0 5px;">${numCorrect}</span>
        out of 
        <span style="font-weight: bold; margin-left: 5px; margin-right: 5px;">${quizData.length}</span>
          questions correct.
    </div>
`;
  resultsContainer.innerHTML += resultsHTML;
  resultsContainer.style.display = "block";
  quizContainer.style.display = "none";
  clearInterval(timer);
  timerElement.textContent = "Time's up or Quiz Completed!";
  navigationButtons.style.display = "none";
}

function startTimer() {
  time = 120;
  timerElement.textContent = `Time remaining: ${time}s`;
  timerElement.style.color = "black";
  timerElement.style.fontWeight = "bold";

  timer = setInterval(() => {
    time--;
    timerElement.textContent = `Time remaining: ${time}s`;

    if (time <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  if (confirm("Do you want to start the quiz?")) {
    initialMessage.style.display = "none";
    startButton.style.display = "none";
    prevButton.disabled = false;
    nextButton.disabled = false;
    submitButton.disabled = false;
    buildQuiz();
    startTimer();
  }
});

nextButton.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selectedOption) {
    selectedAnswers[currentQuestionIndex] = selectedOption.value;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= quizData.length) {
    currentQuestionIndex = quizData.length - 1;
  }
  showQuestion(currentQuestionIndex);
});

prevButton.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selectedOption) {
    selectedAnswers[currentQuestionIndex] = selectedOption.value;
  }

  currentQuestionIndex--;
  if (currentQuestionIndex < 0) {
    currentQuestionIndex = 0;
  }
  showQuestion(currentQuestionIndex);
});

submitButton.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selectedOption) {
    selectedAnswers[currentQuestionIndex] = selectedOption.value;
  }
  showResults();
});
