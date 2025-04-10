const startGameBtn = document.getElementById('startGameBtn');

let tetrominoSet =
['I','I','I','I',
 'O','O','O','O',
 'T','T','T','T',
 'S','S','S','S',
 'Z','Z','Z','Z',
 'J','J','J','J',
 'L','L','L','L'];

let remainingSet;

let currentPiece;
let previousPiece;
let score = -1;

function setup(){
    remainingSet = tetrominoSet;    
}

function selectTretomino(){
    placedPieces++;
    if(remainingSet.length === 0){return}
    let randomNum = Math.floor(Math.random() * remainingSet.length);
    
    previousPiece = currentPiece;
    currentPiece = remainingSet.splice(randomNum,1);
}

startGameBtn.onclick = function(){
    setup();
    selectTretomino();
}