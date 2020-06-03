//select elements
const playerName = document.querySelector('#name');
const playNow = document.getElementById('play-now');
const startGame = document.querySelector('.start-game');
const gameArea = document.querySelector('.game-div');
const outPut = document.querySelector('.modal-content');
const modal= document.querySelector('.modal');
const playerScoreValue = document.querySelector('.player1 p');
const gamesPlayedValue = document.querySelector('.games-played p');
const computerScoreValue = document.querySelector('.computer p');

//add event listener to enter key and play now button click
playNow.addEventListener('click', openGame);
playerName.addEventListener('keypress', handlePress);

function handlePress(e) {
    if (e.keyCode === 13) {
        openGame();
    }
}

function openGame(e) {
    //select h2 tag for the player
    const name = document.querySelector('.player1 h2');
    //get the value of the input
    const inputValue = document.querySelector('#name').value;

    if(inputValue === '') {
        //error message when the input is empty.
        let title = document.querySelector('.title');
        const div = document.createElement('div');
        div.innerHTML = `<h6>Please enter your name!</h6>`;
        div.className = 'error';
        startGame.insertBefore(div, title);
        setTimeout(() => div.style.display = 'none', 3000); //error disappears after 3s
    } else {
        //when name input value not empty open play area and hide start area
        name.innerHTML = `<h2>${inputValue}</h2>`;
        startGame.style.display = 'none';
        gameArea.style.display = 'block';

    }

    playGame();
}

//PLAY GAME

let scoreBoard = {
    playerScore: 0,
    computerScore: 0,
    gamesPlayed: 0
};

function playGame() {
//get choices
    const humanChoices = document.querySelectorAll('.options button');
    humanChoices.forEach(choice => {
        choice.addEventListener('click', e => {
            let playerChoice = e.target.id;
            let computerOptions = ['rock', 'paper', 'scissors'];
            let optionIndex =  Math.floor(Math.random()*3);
            let computerChoice = computerOptions[optionIndex];
            let winner = getWinner(playerChoice, computerChoice);
            showWinner(winner, computerChoice);
        })
    })
}

function getWinner(p, c) {
    if (p === c) {

        return 'draw';
    } else if (p === 'rock') {
        if (c === 'paper') {

            return 'computer';
        } else {

            return 'player'
        }
    } else  if (p === 'paper') {
        if(c === 'scissors') {

            return 'computer';
        } else{

            return 'player'
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {

            return 'computer';
        } else {

            return 'player';
        }
    }
}

function showWinner(w, computerChoice) {
    if (w === 'player') {
    //increase the SCORES by one
        scoreBoard.playerScore++;
        scoreBoard.gamesPlayed++;
    //update the modal
        outPut.innerHTML = `
        <h3 class="text-win">You win</h3>
            <img  class="computer-hand" src="./assets/${computerChoice}.png" alt="">
            <p>Computer chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if (w === 'computer') {

        scoreBoard.computerScore++;
        scoreBoard.gamesPlayed++;

        outPut.innerHTML = `
       <h3 class="text-lose">You lost</h3>
         <img  class="computer-hand" src="./assets/${computerChoice}.png" alt="">
         <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else {
        scoreBoard.gamesPlayed++;
       outPut.innerHTML = `
      <h3 >Its a Tie</h3>
         <img  class="computer-hand" src="./assets/${computerChoice}.png" alt="">
         <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `
    }

    //update the scores
    playerScoreValue.textContent = scoreBoard.playerScore;
    gamesPlayedValue.textContent = scoreBoard.gamesPlayed;
    computerScoreValue.textContent = scoreBoard.computerScore;

    //display the modal
    modal.style.display = 'block';
    setTimeout(() => modal.style.display = 'none', 900);//modal disappears in a few seconds
}

//add event listener on the restart button
const restartBtn = document.getElementById('restart-btn').addEventListener('click', restart);

function restart() {
    //reset the scoreboard
    scoreBoard.playerScore = 0;
    scoreBoard.computerScore = 0;
    scoreBoard.gamesPlayed = 0;
    //update the scores
    playerScoreValue.textContent = scoreBoard.playerScore;
    gamesPlayedValue.textContent = scoreBoard.gamesPlayed;
    computerScoreValue.textContent = scoreBoard.computerScore;
}
























