const container=document.querySelector('.container');
const pitch = [
    [0,0,0,0,0,0,0,0,0,0,0],//00
    [0,0,0,0,0,0,0,0,0,0,0],//01
    [0,1,0,1,0,1,0,1,0,1,0],//02
    [1,0,1,0,1,0,1,0,1,0,1],//03
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

const open = 0;
const blocked = 1;
const trapDoor = 2;
const trapDoorOpen = 3;
const blueEndLine = 4;
const redEndLine = 5;
const openCheckered = 6;
const blockedCheckered = 7;

function searchCheckeredPattern(){

    console.log('entenring search');
    const checkered1 = [0,1,1,0];
    const checkered2 = [1,0,0,1];

    for(i=2; i<=11; i++){
        for(j=0; j<=9; j++){

            let sample = [pitch[i][j],pitch[i][j+1],
                        pitch[i+1][j],pitch[i+1][j+1]];
        

            console.log(`Chequered: ${checkered1}`);
            console.log(`Sample: ${sample}`);
            
            if(sample == checkered1){
                console.log('checkered1');
                pitch[i][j] = openCheckered;
                pitch[i][j+1] = blockedCheckered;
                pitch[i+1][j] = blockedCheckered;
                pitch[i+1][j+1] = openCheckered;
            }

            if(sample == checkered2){
                console.log('checkered2');
                pitch[i][j] = blockedCheckered;
                pitch[i][j+1] = openCheckered;
                pitch[i+1][j] = openCheckered;
                pitch[i+1][j+1] = blockedCheckered;
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function generatePitch(density){
    for(i=0; i<density; i++){
        createObstacle();
    }
    placeTrapDoors();
    placeEndZones();
    searchCheckeredPattern();
}

function placeTrapDoorOpens(row,column){
    pitch[row+1][column+1] = trapDoorOpen;
    pitch[row+1][column] = trapDoorOpen;
    pitch[row+1][column-1] = trapDoorOpen;
    pitch[row][column+1] = trapDoorOpen;
    pitch[row-1][column] = trapDoorOpen;
    pitch[row][column-1] = trapDoorOpen;
    pitch[row-1][column+1] = trapDoorOpen;
    pitch[row-1][column-1] = trapDoorOpen;
}

function placeTrapDoors(){
    let trapDoors = getRandomInt(1,2);

    if(trapDoors <=1) {
        pitch[7][5] = trapDoor;
        placeTrapDoorOpens(7,5);
    }
    else {

        let trapDoorRow;
        let trapDoorColumn;

        do{
            trapDoorRow = getRandomInt(2,7);
            trapDoorColumn = getRandomInt(1,9);
        }while (trapDoorRow === 7 && trapDoorColumn === 5)

        pitch[trapDoorRow][trapDoorColumn] = trapDoor
        placeTrapDoorOpens(trapDoorRow,trapDoorColumn);
        
        pitch[14-trapDoorRow][10-trapDoorColumn] = trapDoor
        placeTrapDoorOpens(14-trapDoorRow,10-trapDoorColumn);
    }
}

function placeEndZones(){
    for(column=0; column<11; column++){
        pitch[0][column] = blueEndLine;
        pitch[14][column] = redEndLine;
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
            pitch[row+i][column+j] = blocked;
            pitch[14-row-i][10-column-j] = blocked;
        }
    }
}

function populate(){

    for (let i=0; i<15; i++)
    {
        for(let j=0; j<11; j++)
        {
            const div = document.createElement('div');
            div.setAttribute('id','r'+i+'c'+j)
            
            let pitchSquareValue = pitch[i][j];
            switch(pitchSquareValue){
                case 0: div.classList.add('pixel');
                break;
                case 1: div.classList.add('pixelBlocked');
                break;
                case 2: div.classList.add('pixelTrapDoor');
                break;
                case 3: div.classList.add('pixel');
                break;
                case 4: div.classList.add('pixelBlueEndLine');
                break;
                case 5: div.classList.add('pixelRedEndLine');
                break;
                case 6: div.classList.add('pixelOpenCheckered');
                break;
                case 7: div.classList.add('pixelBlockedCheckered');
                break;
            }
            container.appendChild(div);
        }
    }
}

//generatePitch(5);
searchCheckeredPattern();
populate();