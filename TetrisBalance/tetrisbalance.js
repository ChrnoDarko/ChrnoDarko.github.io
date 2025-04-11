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
    console.log(tetrominoSet);
    console.log(remainingSet);
}

function selectTretomino(){
    if(remainingSet.length === 0){return}
    score++;
    let randomNum = Math.floor(Math.random() * remainingSet.length);
    
    if(currentPiece != null){previousPiece = currentPiece;}
    currentPiece = remainingSet.splice(randomNum,1);

    console.log(tetrominoSet);
    console.log(remainingSet);
}

StartGameBtn.onclick = function(){
    setup();
    selectTretomino();
    currentPieceImg.src = "TetrominoImages/"+currentPiece+".png";
    SelectAPieceBtn.hidden = false;
    scoreP.innerHTML = score;
}

SelectAPieceBtn.onclick = function(){
    selectTretomino();
    scoreP.innerHTML = score;
    currentPieceImg.src = "TetrominoImages/"+currentPiece+".png";
    previousPieceImg.src = "TetrominoImages/"+previousPiece+".png";
}