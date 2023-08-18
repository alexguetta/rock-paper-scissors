
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

document.querySelector('.js-score').innerHTML = 
`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying) {
    document.querySelector('.auto-play').innerHTML = 'Stop Auto Play';
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play').innerHTML = 'Auto Play';
  }
}

function changeColor() {
  const item = document.querySelector('.auto-play');
  if(isAutoPlaying)
    item.classList.add('is-auto-playing');
  else
    item.classList.remove('is-auto-playing');
}

function playGame(playerMove) {

  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'Rock') {
    
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    }
  } 
  else if(playerMove === 'Paper') {

    if (computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }
  } 
  else if(playerMove === 'Scissors') {

    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You win.';
    } else {
      result = 'Tie.';
    }
  }

  if(result === 'Tie.')
    score.ties++;
  else if(result === 'You win.')
    score.wins++;
  else
    score.losses++;

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();

  document.querySelector('.result').innerHTML = result;

  document.querySelector('.picks').innerHTML = 
  `You 
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon"> 
  Computer`;
}

function updateScore() {
  document.querySelector('.js-score').innerHTML = 
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {

  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  return computerMove;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
}