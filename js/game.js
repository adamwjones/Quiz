// Timer variables
var timerElement = document.getElementById("timerCount");
var timerInterval;
var timerCount = 60;

// Score variables
var scoreText = document.getElementById("score");
var score = 0;

// Questions & Answers variables
var question = document.getElementById("question");
var currentQuestion = {};
var availableQuesions = [];
var questionCounter = 0;
var totalQuestions = 3;
var options = Array.from(document.getElementsByClassName("option-text"));
var acceptingAnswers = false;
var correctAnswer = 10;

// Questions
var questions = [
  {
    question: "Who created the Sopranos?",
    option1: "Michael Imperioli",
    option2: "James Gandolfini",
    option3: "Chevy Chase",
    option4: "David Chase",
    answer: 4
  },
  {
    question:
      "In what year was the Sopranos originally released?",
    option1: "1999",
    option2: "1998",
    option3: "2001",
    option4: "2000",
    answer: 1
  },
  {
    question: "What was the name of Tony Soprano's therapist?",
    option1: "Dr. Jennifer Melfi",
    option2: "Dr. Leonard 'Bones' McCoy",
    option3: "Dr. Hawkeye Pierce",
    option4: "Dr. Michaela Quinn",
    answer: 1
  }
];

//Start game function
startGame = () => {
  questionCounter = 0;
  score = 0;
  timerInterval = setInterval(timer, 1000);
  availableQuesions = [...questions];
  getNewQuestion();
};

//Timer function
timer = () => {
  timerCount--;
  if (timerCount === 0) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  } else {
    timerElement.textContent = timerCount;
  }
};

//Get new question function 
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= totalQuestions) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach(option => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

options.forEach(option => {
  option.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      timerCount = timerCount + 10;
      incrementScore(correctAnswer);
    } else {
      timerCount = timerCount - 10;
    }

    selectedOption.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();