let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};     
/*
if(!score) {
score = {
  wins: 0,
  lossess: 0,
  ties: 0
};      
}
*/

updateScoreElement();

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
   resetConfirmation();  
  })

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {};
function autoPlay(){ 
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    const autoPlayButton = document.querySelector('.js-auto-play-button')
    autoPlay();

    setTimeout(() => {
      if(autoPlayButton.innerHTML === 'Auto Play') {
        autoPlayButton.innerHTML = 'Stop Playing'
      } else if (autoPlayButton.innerHTML === 'Stop Playing') {
        autoPlayButton.innerHTML = 'Auto Play'
      }
    }, 1500);
  })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
      autoPlay();
    } 
  })

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  }); 

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    playGame('Rock');
  } else if (event.key === '2') {
    playGame('Paper');
  } else if (event.key === '3') {
    playGame('Scissors');
  }
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === ' ') {
    resetConfirmation();
  }
});

function resetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
    Are you sure you want to reset your score?
    <button class = "js-yes-confirm confirm-button">
    Yes
    </button>

    <button class = "js-no-confirm confirm-button">
    No
    </button> `;


document.querySelector('.js-yes-confirm')
  .addEventListener('click', () => {
    resetScore();
    hideConfirmation();
  });

document.querySelector('.js-no-confirm')
  .addEventListener('click', () => {
    hideConfirmation();
  });
}

function hideConfirmation () {
  document.querySelector('.js-reset-confirmation') 
   .innerHTML = '';
}

function playGame(playMove) {
const computerMove = pickComputerMove();

let result = '';

if (playMove === 'Scissors') {
    if (computerMove === 'Rock') {
    result = 'You lose.'
  } else if (computerMove === 'Paper') {
    result = 'You win.'
  } else if (computerMove === 'Scissors') {
    result = 'Tie.'
  }

} else if (playMove === 'Paper') {
if (computerMove === 'Rock') {
  result = 'You win.'
} else if (computerMove === 'Paper') {
  result = 'Tie.'
} else if (computerMove === 'Scissors') {
  result = 'You lose.'
}

} else if (playMove === 'Rock') {
  if (computerMove === 'Rock') {
    result = 'Tie.'
  } else if (computerMove === 'Paper') {
    result = 'You lose.'
  } else if (computerMove === 'Scissors') {
    result = 'You win.'
  }

}

if (result ==='You win.') {
  score.wins += 1;
} else if (result === 'You lose.') {
  score.losses += 1;
} else if (result === 'Tie.') {
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML = result;


document.querySelector('.js-moves').innerHTML =   `You
<img src="Emoji/${playMove}-emoji.png" class="move-icon">
<img src="Emoji/${computerMove}-emoji.png" class="move-icon">
Computer`;

} 
function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};



function pickComputerMove() {
const randomNumber = Math.random('');

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
  computerMove = 'Rock';
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
  computerMove = 'Paper';
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
  computerMove = 'Scissors';
} 

return computerMove;
}

