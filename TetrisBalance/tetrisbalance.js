const SelectAPieceBtn = document.getElementById('SelectAPieceBtn');
const StartGameBtn = document.getElementById('StartGameBtn');
const scoreP = document.getElementById('Score');
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
let score = 0;

function setup(){
    score = 0;
    //remainingSet = tetrominoSet;
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
    SelectAPieceBtn.hidden = false;
    scoreP.innerHTML = "Score: " + score;
}

SelectAPieceBtn.onclick = function(){
    selectTretomino();
    scoreP.innerHTML = score;
    currentPieceImg.src = "TetrominoImages/"+currentPiece+".png";
    previousPieceImg.src = "TetrominoImages/"+previousPiece+".png";
}