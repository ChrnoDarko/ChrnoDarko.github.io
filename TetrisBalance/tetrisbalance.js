const SelectAPieceBtn = document.getElementById('SelectAPieceBtn');
const StartGameBtn = document.getElementById('StartGameBtn');
const scoreP = document.getElementById('Score');
const highScoreP = document.getElementById('HighScore');
const currentPieceImg = document.getElementById('CurrentPieceImg');
const previousPieceImg = document.getElementById('PreviousPieceImg');

const tetrominoSet =
['I','I','I','I',
 'J','J','J','J',
 'L','L','L','L',
 'O','O','O','O',
 'S','S','S','S',
 'T','T','T','T',
 'Z','Z','Z','Z'];

let remainingSet;

let currentPiece;
let previousPiece;
let score = -1;
let highScore = 0;

function setup(){
    score = -1;
    //remainingSet = tetrominoSet;
    remainingSet = [];
    remainingSet = [].concat(tetrominoSet);
    previousPieceImg.src ="";
}

function selectTretomino(){
    if(remainingSet.length === 0){return}
    score++;
    let randomNum = Math.floor(Math.random() * remainingSet.length);
    
    if(currentPiece != null){previousPiece = currentPiece;}
    currentPiece = remainingSet.splice(randomNum,1);

}

StartGameBtn.onclick = function(){
    setup();
    selectTretomino();
    currentPieceImg.src = "TetrominoImages/"+currentPiece+".png";
    scoreP.innerHTML = "Score: " + score;
}

currentPieceImg.onclick = function(){

    if(remainingSet.length === 0){
        scoreP.innerHTML = "Max Score";
        highScoreP.innerHTML = "Congratulations";
        return;
    }

    selectTretomino();

    scoreP.innerHTML = "Score: " + score;
    currentPieceImg.src = "TetrominoImages/"+currentPiece+".png";
    previousPieceImg.src = "TetrominoImages/"+previousPiece+".png";

    if(highScore < score){
        highScore = score;
        highScoreP.innerHTML = "High Score: " + highScore;
    }
}