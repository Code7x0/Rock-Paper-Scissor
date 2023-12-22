let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    Lose: 0,
    Tie: 0
};
updateScore();


//autoplay
let isAutoPlaying = false;
let intervalId;
function autoplay() {
    if(!isAutoPlaying) {
     intervalId =  setInterval(() => {
        const playermove = pickComputermove();
            playgame(playermove);
        }, 1000)
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
  }

  //click events
  document.querySelector('.js-rock-button')
   .addEventListener('click', () => {
      playgame('rock');
   }); 

   document.querySelector('.js-paper-button')
   .addEventListener('click', () => {
      playgame('paper');
   }); 

   document.querySelector('.js-scissor-button')
   .addEventListener('click', () => {
      playgame('scissor');
   }); 

   document.querySelector('.js-reset-button')
   .addEventListener('click', () => {
    score.win = 0;
    score.Lose = 0;
    score.Tie = 0;
    localStorage.removeItem('score');
    updateScore();
   });

   document.querySelector('.js-autoplay')
   .addEventListener('click', () => {
       autoplay();
   });


   //keydown event that we exactly dont need
 document.body.addEventListener('keydown', (event) => {
     if (event.key === 'r') {
        playgame('rock');
     } else if (event.key === 'p') {
        playgame('paper');
     } else if (event.key === 's') {
        playgame('scissor');
     }
   });

   

function playgame(playermove) {
const computerMove = pickComputermove();

let result = '';

if (playermove === 'scissor') {

        if (computerMove === 'rock') {
    result = 'You lose';
    } else if(computerMove === 'paper') {
    result = 'You win';

    } else if (computerMove === 'scissor') {
    result = 'Tie';
}

} else if(playermove === 'paper') {
        if (computerMove === 'rock') {
    result = 'You win';
    } else if(computerMove === 'paper') {
    result = 'Tie';

    } else if (computerMove === 'scissor') {
    result = 'You lose';
}

} else if (playermove === 'rock') {
            if (computerMove === 'rock') {
        result = 'Tie';
    } else if(computerMove === 'paper') {
        result = 'You lose';

    } else if (computerMove === 'scissor') {
        result = 'You win';
    }
}
if (result === 'You win') {
       score.win += 1;
    } else if(result === 'You lose') {
        score.Lose += 1;
    } else if(result === 'Tie') {
        score.Tie += 1;
    }

    localStorage.setItem('score',  JSON.stringify(score));

    updateScore();

    document.querySelector('.js-result')
    .innerHTML = result;

    document.querySelector('.js-move')
    .innerHTML = `You 
            <img src="${playermove}-emoji.png" class="move-icon">
            <img src="${computerMove}-emoji.png" class="move-icon">
            Computer`;
}


//update score 
function updateScore() {
document.querySelector('.js-score')
.innerHTML =  `win: ${score.win} , Losses: ${score.Lose} , Tie: ${score.Tie}`;

}



// we have to set computerMove to play so in that we use Math.random() with that we can pick a random number so the logic behind is random number jo honge wo 0-1 ke beech me honge so we know that ki agar hm 1/3 or 2/3 uske beech me aate h so we use 0-1/3 to display rock and 1/3-2/3 to display scissor and also 2/3 to 1 to display paper. 
function pickComputermove() {
const  randomnumber = Math.random();

let computerMove = '';

if (randomnumber >= 0 && randomnumber < 1/3) {
    computerMove = 'rock';
} else if (randomnumber >= 1/3 && randomnumber < 2/3) {
    computerMove = 'paper';
} else if(randomnumber >= 2/3 && randomnumber < 1){
    computerMove = 'scissor';
}
return computerMove;
} 
 