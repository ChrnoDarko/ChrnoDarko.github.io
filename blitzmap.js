const container=document.querySelector('.container');
const generatePitchBtn=document.getElementById('generatePitchBtn');
const userDensity=document.getElementById('userDensity');
generatePitchBtn.addEventListener('click',function(){
    generatePitch(userDensity.value);
    searchCheckeredPattern();
    render();
});
const pitchValueGrid = [
    [0,0,0,0,0,0,0,0,0,0,0],//00
    [0,0,0,0,0,0,0,0,0,0,0],//01
    [0,0,0,0,0,0,0,0,0,0,0],//02
    [0,0,0,0,0,0,0,0,0,0,0],//03
    [0,0,0,0,0,0,0,0,0,0,0],//04
    [0,0,0,0,0,0,0,0,0,0,0],//05
    [0,0,0,0,0,0,0,0,0,0,0],//06
    [0,0,0,0,0,0,0,0,0,0,0],//07<
    [0,0,0,0,0,0,0,0,0,0,0],//08
    [0,0,0,0,0,0,0,0,0,0,0],//09
    [0,0,0,0,0,0,0,0,0,0,0],//10
    [0,0,0,0,0,0,0,0,0,0,0],//11
    [0,0,0,0,0,0,0,0,0,0,0],//12
    [0,0,0,0,0,0,0,0,0,0,0],//13
    [0,0,0,0,0,0,0,0,0,0,0] //14
]//  0 1 2 3 4 5 6 7 8 9 A
//             ^

const OPEN = 0;
const BLOCKED = 1;
const TRAPDOOR = 2;
const BLUE_ENDLINE = 3;
const RED_ENDLINE = 4;
const OPEN_CHECKERED = 5;
const BLOCKED_CHECKERED = 6;

function searchCheckeredPattern(){

    for(i=2; i<=11; i++){
        for(j=0; j<=10; j++){

            if( (pitchValueGrid[i][j] === OPEN || pitchValueGrid[i][j] === OPEN_CHECKERED) && 
                (pitchValueGrid[i][j+1] === BLOCKED || pitchValueGrid[i][j+1] === BLOCKED_CHECKERED) &&
                (pitchValueGrid[i+1][j] === BLOCKED || pitchValueGrid[i+1][j] === BLOCKED_CHECKERED) && 
                (pitchValueGrid[i+1][j+1] === OPEN || pitchValueGrid[i+1][j+1] === OPEN_CHECKERED)){
                    pitchValueGrid[i][j] = OPEN_CHECKERED;
                    pitchValueGrid[i][j+1] = BLOCKED_CHECKERED;
                    pitchValueGrid[i+1][j] = BLOCKED_CHECKERED;
                    pitchValueGrid[i+1][j+1] = OPEN_CHECKERED;
                }

            if( (pitchValueGrid[i][j] === BLOCKED || pitchValueGrid[i][j] === BLOCKED_CHECKERED) &&
                (pitchValueGrid[i][j+1] === OPEN || pitchValueGrid[i][j+1] === OPEN_CHECKERED) &&
                (pitchValueGrid[i+1][j] === OPEN || pitchValueGrid[i+1][j] === OPEN_CHECKERED) &&
                (pitchValueGrid[i+1][j+1] === BLOCKED || pitchValueGrid[i+1][j+1] === BLOCKED_CHECKERED)){
                    pitchValueGrid[i][j] = BLOCKED_CHECKERED;
                    pitchValueGrid[i][j+1] = OPEN_CHECKERED;
                    pitchValueGrid[i+1][j] = OPEN_CHECKERED;
                    pitchValueGrid[i+1][j+1] = BLOCKED_CHECKERED;
                }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function clearPitch(){
    for (let i=0; i<15; i++){
        for(let j=0; j<11; j++){pitchValueGrid[i][j] = OPEN;}
    }
}

function generatePitch(density){
    clearPitch();
    for(i=0; i<density; i++){createObstacle();}
    placeTrapDoors();
    placeEndZones();
    searchCheckeredPattern();
}

function placeTrapDoorOpens(row,column){
    pitchValueGrid[row+1][column+1] = OPEN;
    pitchValueGrid[row+1][column] = OPEN;
    pitchValueGrid[row+1][column-1] = OPEN;
    pitchValueGrid[row][column+1] = OPEN;
    pitchValueGrid[row-1][column] = OPEN;
    pitchValueGrid[row][column-1] = OPEN;
    pitchValueGrid[row-1][column+1] = OPEN;
    pitchValueGrid[row-1][column-1] = OPEN;
}

function placeTrapDoors(){
    let trapDoors = getRandomInt(1,2);

    if(trapDoors <=1) {
        pitchValueGrid[7][5] = TRAPDOOR;
        placeTrapDoorOpens(7,5);
    }
    else {

        let trapDoorRow;
        let trapDoorColumn;

        do{
            trapDoorRow = getRandomInt(2,7);
            trapDoorColumn = getRandomInt(1,9);
        }while (trapDoorRow === 7 && trapDoorColumn === 5)

        pitchValueGrid[trapDoorRow][trapDoorColumn] = TRAPDOOR
        placeTrapDoorOpens(trapDoorRow,trapDoorColumn);
        
        pitchValueGrid[14-trapDoorRow][10-trapDoorColumn] = TRAPDOOR
        placeTrapDoorOpens(14-trapDoorRow,10-trapDoorColumn);
    }
}

function placeEndZones(){
    for(column=0; column<11; column++){
        pitchValueGrid[0][column] = BLUE_ENDLINE;
        pitchValueGrid[14][column] = RED_ENDLINE;
    }
}

function createObstacle(){

    let height = getRandomInt(1,3)
    let width

    if(height !== 3) {width = getRandomInt(1,3);}
    else{width = getRandomInt(1,2);}
     
    let row = getRandomInt(2,7);
    let column = getRandomInt(0,10);

    for(let i=0; i<width; i++){
        for(let j=0; j<height; j++){
            pitchValueGrid[row+i][column+j] = BLOCKED;
            pitchValueGrid[14-row-i][10-column-j] = BLOCKED;
        }
    }
}

function createDivs(){
    for (let i=0; i<15; i++)
    {
        for(let j=0; j<11; j++)
        {
            const div = document.createElement('div');
            //div.setAttribute('id','r'+i+'c'+j);
            div.setAttribute('id','row'+i+'col'+j);
            container.appendChild(div);
        }
    }
}

function render(){

    for (let i=0; i<15; i++)
    {
        for(let j=0; j<11; j++)
        {
            let pitchDiv=document.getElementById('row'+i+'col'+j);
            pitchDiv.className = '';

            let pitchSquareValue = pitchValueGrid[i][j];
            switch(pitchSquareValue){
                case 0: pitchDiv.classList.add('open');
                break;
                case 1: pitchDiv.classList.add('Blocked');
                break;
                case 2: pitchDiv.classList.add('TrapDoor');
                break;
                case 3: pitchDiv.classList.add('BlueEndLine');
                break;
                case 4: pitchDiv.classList.add('RedEndLine');
                break;
                case 5: pitchDiv.classList.add('OpenCheckered');
                break;
                case 6: pitchDiv.classList.add('BlockedCheckered');
                break;
            }
            //container.appendChild(div);
        }
    }
}

createDivs();