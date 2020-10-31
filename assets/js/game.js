// Timer variables
var timerElement = document.getElementById("timerCount");
var timerInterval;
var timeCount = 60;

// Score variables
var scoreDisplay = document.getElementById("score");
var score = 0;

// Questions & Answers variables
var question = document.getElementById("question");
var currentQ = {};
var availableQs = [];
var count = 0;
var totalQs = 3;
var options = Array.from(document.getElementsByClassName("option-text"));
var newAnswers = false;
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
startQuiz = () => {
  count = 0;
  score = 0;
  timerInterval = setInterval(timer, 1000);
  availableQs = [...questions];
  getQuestion();
};

//Timer function
timer = () => {
  timeCount--;
  if (timeCount === 0) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  } else {
    timerElement.textContent = timeCount;
  }
};

//Get new question function 
getQuestion = () => {
  if (availableQs.length === 0 || count >= totalQs) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  count++;

  const questionIndex = Math.floor(Math.random() * availableQs.length);
  currentQ = availableQs[questionIndex];
  question.innerText = currentQ.question;

  options.forEach(option => {
    const number = option.dataset["number"];
    option.innerText = currentQ["option" + number];
  });

  availableQs.splice(questionIndex, 1);
  newAnswers = true;
};

options.forEach(option => {
  option.addEventListener("click", e => {
    if (!newAnswers) return;

    newAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQ.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      timeCount = timeCount + 10;
      addPoints(correctAnswer);
    } else {
      timeCount = timeCount - 10;
    }

    selectedOption.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedOption.parentElement.classList.remove(classToApply);
      getQuestion();
    }, 1000);
  });
});

addPoints = num => {
  score += num;
  scoreDisplay.innerText = score;
};

startQuiz();