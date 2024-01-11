const gameArea = document.getElementById('gameArea');
const blueBox = document.getElementById('blueBox');
const miniBox = document.getElementById('miniBox');
const redBox = document.getElementById('redBox');
const addPlayerButton = document.getElementById('addPlayer');
const newPlayerInput = document.getElementById('newPlayerInput');
const currentplayersArea = document.getElementById("currentPlayersArea");
const startGameBtn = document.getElementById('startGameBtn');
const tileList = ['specialTile'];

let specialTileInBox = false;
let currentReminder = '';
let currentSelected = '';
let numOfPlayers = 0;
let activePlayer = 0;

startGameBtn.onclick = function(){
    if(numOfPlayers >= 2){
        gameArea.addEventListener('click', playTile);
        addPlayerButton.setAttribute('hidden','true');
        startGameBtn.setAttribute('hidden','true');
        newPlayerInput.setAttribute('hidden','true');
        activePlayer = numOfPlayers;

        let scoreButtonList = document.getElementsByClassName('scoreButton');

        for(let i=0; i<scoreButtonList.length; i++){
            scoreButtonList[i].removeAttribute('disabled');
        }
    }
}

newPlayerInput.onchange = function(){
    addPlayerButton.removeAttribute('disabled');
}

addPlayerButton.onclick = function(){
    addPlayer();
    newPlayerInput.value = "";
    addPlayerButton.setAttribute('disabled','true');
    activePlayer = numOfPlayers;
    if(numOfPlayers >= 2){startGameBtn.removeAttribute('hidden');}
}

function reducePlayerScore(event){
    console.log(event);
    console.log(event.target);
    let score = document.getElementById('player' + event.target.classList[1] + 'Score');
    let newScore = parseInt(score.innerHTML);
    if(newScore>0){newScore--;}
    score.innerHTML = newScore+'';
}

function increasePlayerScore(event){
    console.log(event);
    console.log(event.target);
    let score = document.getElementById('player' + event.target.classList[1] + 'Score');
    let newScore = parseInt(score.innerHTML);
    newScore++;
    score.innerHTML = newScore+'';
}

function addPlayer(){

    if(numOfPlayers < 6){
        numOfPlayers++;
        const newPlayerDiv = document.createElement('div');
        newPlayerDiv.classList.add('player-panel');
        
        const minusOne = document.createElement('button');
        minusOne.textContent = '-1';
        minusOne.classList.add('scoreButton');
        minusOne.classList.add(numOfPlayers);
        minusOne.addEventListener('click', reducePlayerScore);
        minusOne.setAttribute('disabled','true');
        newPlayerDiv.appendChild(minusOne);

        const playerName = document.createElement('p');
        playerName.textContent = newPlayerInput.value;
        playerName.setAttribute('id','player' + numOfPlayers);
        newPlayerDiv.appendChild(playerName);
        
        const playerScoreP = document.createElement('p');
        playerScoreP.textContent = 0;
        playerScoreP.setAttribute('id','player' + numOfPlayers + 'Score');
        newPlayerDiv.appendChild(playerScoreP);
        
        const plusOne = document.createElement('button');
        plusOne.textContent = '+1';
        plusOne.classList.add('scoreButton');
        plusOne.classList.add(numOfPlayers);
        plusOne.addEventListener('click', increasePlayerScore);
        plusOne.setAttribute('disabled','true');
        newPlayerDiv.appendChild(plusOne);
    
        currentplayersArea.appendChild(newPlayerDiv);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function changeActivePlayer(){
    let player = document.getElementById('player' + activePlayer);
    player.classList.remove('player-selected');

    activePlayer === numOfPlayers ? activePlayer = 1 : activePlayer++;

    player = document.getElementById('player' + activePlayer);
    player.classList.add('player-selected');
}

function playTile(){


    // reminder gets grey
    if(currentReminder){
        document.getElementById(currentReminder).classList.remove('last-selected');
        document.getElementById(currentReminder).classList.add('used');
    }

    currentReminder = currentSelected

    // selected becomes reminder
    if(currentReminder){
        document.getElementById(currentReminder).classList.remove('selected');
        document.getElementById(currentReminder).classList.add('last-selected');
    }

    // getting a new tile
    let arrayIndex = getRandomInt(0,tileList.length-1);
    currentSelected = tileList[arrayIndex];
    document.getElementById(currentSelected).classList.add('selected');

    // if(tileList.length === 0){
    //     document.getElementById(currentReminder).classList.remove('selected');
    //     document.getElementById(currentReminder).classList.add('used');
    // }

    // selected gets highlight
    //document.getElementById(currentSelected).classList.add('selected');

    //

    if(currentReminder !== ''){
        //document.getElementById(currentReminder).classList.remove('selected');
        if(!specialTileInBox){
            document.getElementById('specialTile').classList.remove('tile');
            document.getElementById('specialTile').classList.remove('selected');
            specialTileInBox = true;
        }else{
            document.getElementById(currentReminder).classList.add('last-selected');
            document.getElementById(currentReminder).classList.remove('selected');
        }
            
        tileList.splice(arrayIndex,1);
    }else{
        tileList.shift();
    }


    //currentReminder = currentSelected;

    document.getElementById("p1").textContent = currentSelected;
    document.getElementById("p2").textContent = currentReminder;

    changeActivePlayer();
}

function createTiles(box, color){
    for(let row=0; row<5; row++){
        for(let col=0; col<7; col++){
            const tile = document.createElement('div');
            let tileId = `${color}:row${row}col${col}`;

            tile.setAttribute('id', tileId);
            tile.classList.add('tile');
            box.appendChild(tile);

            tileList.push(tileId); 
        }
    }
}

createTiles(blueBox, 'blue');
createTiles(redBox, 'red');