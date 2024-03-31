let UserScore = {
    wins: 0,
    loses: 0,
    ties: 0
};
let SystemScore = {
    wins: 0,
    loses: 0,
    ties: 0
};

let winOrLose = "";
const gameHandGuestures = ['Rock', 'Paper', 'Scissor'];

gameBtns = [ document.querySelector('.btn-rock'), 
                      document.querySelector('.btn-paper'), 
                      document.querySelector('.btn-scissor')
];

gameBtns.forEach( (gameBtn) => {
    gameBtn.addEventListener('click', () => {
        const systemOption = gameHandGuestures[ Math.floor(Math.random()*10+1)%3 ];
        const userOption = gameBtn.textContent;
        console.log(systemOption+' '+userOption);
        if(systemOption == "Rock"){
            if(userOption == "Rock") winOrLose = "tie";
            else if(userOption == "Paper") winOrLose = "win";
            else winOrLose = "lose";
        }
        else if(systemOption == "Paper"){
            if(userOption == "Rock") winOrLose = "lose";
            else if(userOption == "Paper") winOrLose = "tie";
            else winOrLose = "win";
        }
        else{
            if(userOption == "Rock") winOrLose = "win";
            else if(userOption == "Paper") winOrLose = "lose";
            else winOrLose = "tie";
        }
        if(winOrLose == "win"){
            UserScore.wins += 1;
            SystemScore.loses += 1;
        }
        else if(winOrLose == "lose"){
            UserScore.loses += 1;
            SystemScore.wins += 1;
        }
        else{
            UserScore.ties += 1;
            SystemScore.ties += 1;
        }
        updateScore();
        if(winOrLose == "win") document.querySelector('.game-win-name').style.color = "rgb(24, 252, 24)";
        else document.querySelector('.game-win-name').style.color = "rgb(255,54,54)";
        document.querySelector('.game-win-name').innerHTML = winOrLose;
        document.querySelector('.each-game-popup').style.display = "flex";
    });
});

function updateScore(){
    document.querySelector('.system-win').innerHTML = SystemScore.wins;
    document.querySelector('.system-lose').innerHTML = SystemScore.loses;
    document.querySelector('.system-tie').innerHTML = SystemScore.ties;
    document.querySelector('.user-win').innerHTML =UserScore.wins;
    document.querySelector('.user-lose').innerHTML =UserScore.loses;
    document.querySelector('.user-tie').innerHTML = UserScore.ties;
    const winner = (SystemScore.wins > UserScore.wins) ? "Systems" : "User";
    console.log(winner);
    if(winner == "Systems") document.querySelector('.winner-name').style.color ="rgb(255, 54, 54)";
    else document.querySelector('.winner-name').style.color = "rgb(24, 252, 24)";
    document.querySelector('.winner-name').textContent = winner;
}

function resetGameScore(){
    UserScore = {
        wins: 0,
        loses: 0,
        ties: 0
    };
    SystemScore = {
        wins: 0,
        loses: 0,
        ties: 0
    };
    updateScore();
}

document.querySelector('.btn-reset-game').addEventListener('click', resetGameScore);






const scoreBoardBtn = document.querySelector('.btn-score-board');
const quitGameBtn = document.querySelector('.btn-quit-game');
const scoreBoardPopup = document.querySelector('.score-container-popup');
const quitGamePopup = document.querySelector('.quit-container-popup');
const closeBtns = document.querySelectorAll('.close-btn');

closeBtns.forEach( (closeBtn) => {
    closeBtn.addEventListener('click',() => {
        scoreBoardPopup.style.display = 'none';
        quitGamePopup.style.display = 'none';
        document.querySelector('.each-game-popup').style.display = "none";
    });
});

scoreBoardBtn.addEventListener('click', () => {
    scoreBoardPopup.style.display = 'flex';
});
quitGameBtn.addEventListener('click', () => {
    quitGamePopup.style.display = 'flex';
})
document.querySelector('.quit-close-btn').addEventListener('click', () => {
    quitGamePopup.style.display = 'none';
    resetGameScore();
});