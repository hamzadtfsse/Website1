'use strict';

// Selceting Elemnts
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let scores, currentScore, activePlayer ,playing

const init = function () {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// rolling dice funcitonalituy
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.start by generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.check for rolled 1 if true switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to the active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check score is >= 100 if so finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if not swithc to newxt player
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', init);

const btnInstructions = document.querySelector('.btn--instructions');
const instructionsContainer = document.querySelector('.instructions-container');
const btnCloseInstructions = document.querySelector('.btn--close-instructions');

// Open instructions
btnInstructions.addEventListener('click', function () {
  instructionsContainer.classList.remove('hidden');
});

// Close instructions
btnCloseInstructions.addEventListener('click', function () {
  instructionsContainer.classList.add('hidden');
});
