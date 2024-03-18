// add variables to reference DOM elements
// example is below
let questionsEl = document.getElementById('questions');
let startScreenEl = document.getElementById('start-screen');
let choicesEl = document.getElementById('choices');
let timeEl = document.getElementById('time');
let feedbackEl = document.getElementById('feedback');
let endScreenEl = document.getElementById('end-screen');
let initialsEl = document.getElementById('initials');

// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;


// reference the sound effects
let sfxRight = new Audio('code-quiz-assets/code-quiz-sfx/correct.wav');
let sfxWrong = new Audio('code-quiz-assets/code-quiz-sfx/incorrect.wav');

// Function to update and display time
function displayTime() {
  timeEl.textContent = time;
}

function startQuiz() {
  // hide start screen
  startScreenEl.classList.add('hide');
  // un-hide questions section
  questionsEl.classList.remove('hide');
  // start timer
  timerId = setInterval(clockTick, 1000);
  // show starting time
  displayTime();
  // call a function to show the next question
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches('.choice')) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timeEl.textContent = time;
    // play "wrong" sound effect
    sfxWrong.play();
  // display "wrong" feedback on page
    feedbackEl.textContent = 'Wrong!';
    feedbackEl.classList.remove('hide');
    feedbackEl.style.color ='red';
    setTimeout(() => {
      feedbackEl.classList.add('hide');
    }, 500);
  } else {
  // play "right" sound effect
    sfxRight.play();
  // display "right" feedback on page by displaying the text "Correct!" in the feedback element
    feedbackEl.textContent = 'Correct!';
    feedbackEl.classList.remove('hide');
    feedbackEl.style.color = 'green';
    setTimeout(() => {
      feedbackEl.classList.add('hide');
    }, 500);
// move to next question
currentQuestionIndex++;
// check if we've run out of questions
// if the time is less than zero and we have reached the end of the questions array,
// call a function that ends the quiz (quizEnd function)
// or else get the next question
if (time <=0 || currentQuestionIndex >= questions.length) {
  quizEnd();
} else {
  getQuestion();
  }
}
}

// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  // stop the timer
  clearInterval(timerId);
  // hide the "questions" section
  questionsEl.classList.add('hide');
  // show end screen
  endScreenEl.classList.remove('hide');
  // show final score
  document.getElementById('final-score').textContent = time;
}

// add the code in this function to update the time, it should be called every second
function clockTick() {
  // right here - update time
  time--;
  // update the element to display the new time value
  displayTime();
  // check if user ran out of time; if so, call the quizEnd() function
  if (time <= 0) {
    quizEnd();
  }
}

// complete the steps to save the high score
function saveHighScore() {
  // get the value of the initials input box
  const initials = initialsEl.value.trim();
  // make sure the value of the initials input box wasn't empty
  if (initials === '') {
    alert('Please enter your initials!');
    return;
  }
  // retrieve the high scores from local storage
  let highScores = JSON.parse(localStorage.getItem('highscores')) || [];
  // create a new high score object
  const highScore = {
    score: time,
    initials: initials
  };
  // add the new high score to the array
  highScores.push(highScore);
  // store the high scores in local storage
  localStorage.setItem('highscores', JSON.stringify(highScores));
  // redirect the user to the high scores page
  window.location.href = 'highscores.html';
}



// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
  if (event.key === 'Enter') {
    saveHighScore();
  }
}

// user clicks button to submit initials
document.getElementById('submit').addEventListener('click', saveHighScore);

// user clicks button to start quiz
document.getElementById('start').addEventListener('click', startQuiz);

// user clicks on an element containing choices
choicesEl.onclick = questionClick;

initialsEl.addEventListener('keyup', checkForEnter);
