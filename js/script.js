const cell = document.querySelectorAll('.item');
const restartBtn = document.querySelector('#restartBtn');
const statusText = document.querySelector('#statusText');
const playerXBox = document.querySelector('.box1'); // X Box
const playerOBox = document.querySelector('.box2'); // O Box


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];
let options = ["","","","","","","","",""];
let running = false;
let currentPlayer = "X";


intialiizeOne();
function intialiizeOne(){
    cell.forEach(cell => cell.addEventListener('click', onClickCell));
    restartBtn.addEventListener('click', restart)
    statusText.textContent =  `${currentPlayer}'s turn`;
    updatePlayerBoxes();  
    running = true;
    


}

function  onClickCell(){
const cellIndex = this.getAttribute('cellIndex');
console.log(cellIndex);


 if (options[cellIndex] != "" || !running) {
    return;
 }
 
 update(this, cellIndex);
 winner();
 
 

}

function update(cell, index) {
    options[index] = currentPlayer;

    cell.textContent = currentPlayer;

    

}

function winner() {
 let win = false;
 for (let i = 0 ; i < winConditions.length; i++){
    let cond = winConditions[i];
    let cell1 = options[cond[0]];
    let cell2 = options[cond[1]];
    let cell3 = options[cond[2]];
    if (cell1 == '' || cell2 == '' || cell3 == ''){
        continue
    }
    if (cell1 == cell2 && cell2 == cell3) {
        win = true;
        break;
    }
 }
 if (win) {
    statusText.textContent = `${currentPlayer}'s wins`;
    updatePlayerBoxes();
    running = false;

 }
 else if (!options.includes('')) {
    statusText.textContent = `Draw`;
    updateDraw();
    running = false;
 }
 else  {
    changePlayer();
 }

}
function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent =  `${currentPlayer}'s turn `;
    if (statusText.textContent != `Draw`) {
        updatePlayerBoxes();
    }
    else {
     updateDraw();   
    }
   
    }
function restart() {
    currentPlayer = 'X'
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn `;
  
    cell.forEach(cell => cell.textContent = '');
    
    updatePlayerBoxes(); 
   
    playerXBox.classList.remove('box-1');
    playerOBox.classList.remove('box-2');
    running = true;



}
function updatePlayerBoxes() {
    if (currentPlayer === 'X') {
        playerXBox.classList.add('box-1');
        playerOBox.classList.remove('box-2','draw');
        
    } else {
      
        playerOBox.classList.add('box-2');
        playerXBox.classList.remove('box-1','draw');   
    }
}

function updateDraw() {


playerOBox.classList.add('draw');
playerXBox.classList.add('draw');
}