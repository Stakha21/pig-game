'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('img');
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let currentScore, activePlayer, scores, gameStatus;

const resetPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  activePlayer = activePlayer === 1 ? 0 : 1;
};

const init = function () {
  score1.textContent = score2.textContent = 0;
  dice.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  gameStatus = 1;
};

init();

btnRoll.addEventListener('click', function () {
  if (!gameStatus) return;

  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `dice-${diceRoll}.png`;

  if (diceRoll === 1) {
    resetPlayer();
  } else {
    currentScore += diceRoll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
});

btnHold.addEventListener('click', function () {
  if (!gameStatus) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    gameStatus = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    resetPlayer();
  }
});

btnNew.addEventListener('click', function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  init();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
});
