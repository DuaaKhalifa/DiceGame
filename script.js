'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore =0;

let activePlayer =0;
let scores = [0,0];

let playing =true;
//Initialize the game
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =currentScore;
    activePlayer = activePlayer === 0 ? 1:0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click',function(){
   if(playing){

       //Generate dice value
       let diceValue = Math.trunc(Math.random()*6) +1;
       //Display dice
       diceEl.src = `dice-${diceValue}.png`;
       diceEl.classList.remove('hidden');
   
       if(diceValue !== 1){
   
           currentScore += diceValue;
           document.getElementById(`current--${activePlayer}`).textContent =currentScore;
       }else{
           switchPlayer();
   
       }
   }

});

btnHold.addEventListener('click',function(){
    if(playing){

        //Add current score to the active players score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =  scores[activePlayer] ;
        if(scores[activePlayer] >=100){
            //Finish the game
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            playing=false;
            diceEl.classList.add('hidden');
        }else{
            //Switch to the other player
            switchPlayer();
        }
    }
});

btnNewGame.addEventListener('click',function(){
    activePlayer = 0;
    playing=true;
    scores = [0,0];
    currentScore=0;

    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add('hidden');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
});