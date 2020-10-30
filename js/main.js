/*----- constants -----*/

const WORDS = ['PIZZA','STEAK','FRIES','HUMAN'];
const PANEL_WIDTH = 12;
const FATAL_NUM_GUESSES = 5;



/*----- app's state (variables) -----*/

let secretWord;
let guessWord;
let gameStatus; //👍 👎
let wrongLetters;

/*----- cached element references -----*/

const guessEl = document.getElementById('guess');
const replayBtn = document.getElementById('replay');
const gallowsEl = document.getElementById('gallows');
const letterBtns = document.querySelectorAll('section > button');
const msgEl = document.getElementById('msg');



/*----- event listeners -----*/

document.querySelector('section').addEventListener('click', handleLetterClick) 
   
document.getElementById('replay').addEventListener('click', init) 


/*----- functions -----*/
init();

// In response to user interactions, update tate and call render.
function handleLetterClick(evt) {
    const letter = evt.target.textContent;
    // Exit function if the following conditions exit
    if (evt.target.tagName !== 'BUTTON' || gameStatus) return;
    if (secretWord.includes(letter)) {
      // Update guessWord where all occurances of that letter exist
      let newGuess = '';
      for (let i = 0; i < secretWord.length; i++) {
        newGuess += secretWord.charAt(i) === letter ? letter : guessWord.charAt(i);
      }
      guessWord = newGuess;
    } else {
      // Add the letter to the wrongLetters array
      wrongLetters.push(letter);
    }
    gameStatus = getGameStatus();
    render();
  }

  function getGameStatus() {
    if (guessWord === secretWord) return '👍';
    if (wrongLetters.length === FATAL_NUM_GUESSES) return '👎';
    return null;
  }

  function renderMessage() {
    if (gameStatus === '👍') {
     msgEl.textContent = 'CONGRATS - YOU WON!';
    } else if (gameStatus === '👎') {
      msgEl.innerHTML = `RIP<br>&nbsp;`;
    } else {
      const numRemaining = FATAL_NUM_GUESSES - wrongLetters.length;
      msgEl.innerHTML = `<span>GOOD LUCK</span><br>
      ${numRemaining} WRONG GUESS${numRemaining === 1 ? '' : 'ES'} REMAINING`;
    }
  }

//transfers all states to the DOM
function render() {
    guessEl.textContent = guessWord;
    replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
    gallowsEl.style.backgroundPositionX = `-${wrongLetters.length * PANEL_WIDTH}vmin`;
    renderButtons();
    renderMessage();
  }
  function renderButtons() {
    letterBtns.forEach(function(btn) {
      const letter = btn.textContent;
      btn.disabled = guessWord.includes(letter)
        || wrongLetters.includes(letter);
      if (guessWord.includes(letter)) {
        btn.className = 'valid-letter';
      } else if (wrongLetters.includes(letter)) {
        btn.className = 'wrong-letter';
      } else {
        btn.className = '';
      }
    });
  }



function init() {
    const rndIdx = Math.floor(Math.random() * WORDS.length);
    secretWord = WORDS[rndIdx]; //initializes the word to be guessed!
    guessWord = '';

    //init guessWord for underscores for each char in secretWord
    for (let char of secretWord) {
         guessWord += (char === ' ') ? ' ' : '_';
     }
    // guessWord = secretWord.replace(/[A-Z]/g, '_');
    console.log(secretWord);
    gameStatus = null;
    wrongLetters = [];
    render();

}

