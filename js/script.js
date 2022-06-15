// html elements
const mainGrid = document.getElementById('main-grid');
const playButton = document.getElementById('play');
const clickedNumbers = [];
const userMessageDiv = document.querySelector('#user-message');

// array
let bombs = [];

// eventlistener playbutton
playButton.addEventListener('click', 
function() {
    // reset grigla
    mainGrid.innerHTML = '';
    // difficoltà presa da value
    const userLevel = document.getElementById('user-level').value;
    // genero bombe, genero griglia
    if (userLevel === 'easy') {
        gameMaxRange = 100;
        bombs = generateBombs(16, 1, 100);
        gamesContinue = true;
        createGrid(gameMaxRange, 'easy');
    } else if (userLevel === 'medium') {
        gameMaxRange = 81;
        bombs = generateBombs(16, 1, gameMaxRange);
        gamesContinue = true;
        createGrid(gameMaxRange, 'medium');
    } else if (userLevel === 'crazy') {
        gameMaxRange = 49;
        bombs = generateBombs(16, 1, gameMaxRange);
        gamesContinue = true;
        createGrid(gameMaxRange, 'crazy');
    }
}
)

// FUNZIONI

// genera un array di 16 bombe tutte diverse
// return: array con numeri random tutti diversi con lunghezza numOfElem
// rangeMin, rangeMax sono il range degli elementi
function generateBombs(numOfElem, rangeMin, rangeMax) {
    let randomNumArray = [];
    while(randomNumArray.length < numOfElem) {
        const randomNum = getRndInteger(rangeMin, rangeMax);
        if(!randomNumArray.includes(randomNum)) {
            randomNumArray.push(randomNum);
        }
    }
    return randomNumArray;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min +1) ) + min;
}
function createGrid(gameMaxRange, userLevel) {
    for(let i = 1; i <= gameMaxRange; i++) {
        // Creare degli square
        // <div class="square"><span>12</span></div>
        const newSquare = document.createElement('div');
        // popolare il numero
        newSquare.innerHTML = `<span>${i}</span>`;
        // Aggiungere la classe square
        newSquare.classList.add('square', userLevel);
        // Appenderlo
        mainGrid.append(newSquare);
    }
    let newSquareF = document.querySelectorAll('.square')
    for(let i = 0; i < newSquareF.length; i++) {
        let squares = newSquareF[i];
        if (!bombs.includes(manageSquareClick)) {
            squares.addEventListener('click', manageSquareClick);
        } else if (bombs.includes(manageSquareClick)) {
            alert('hai perso');
        }
    }
    
}
function manageSquareClick() {
    // Milestone 2
    // Mi prendo il numero dentro lo span che è figlio dell'elemento cliccato
    // Leggo lo span
    const thisNumber = parseInt(this.querySelector('span').innerHTML);
    
    if(bombs.includes(thisNumber)) {
        endGame();
        this.classList.add('red');
        document.getElementById('main-grid').removeEventListener('click', manageSquareClick)
    } else {
        this.classList.add('blue');
    }

    // Pushare il numero nell'array dei numeri selezionati
    clickedNumbers.push(thisNumber);
    console.log(clickedNumbers);

    // Se l'utente ha cliccato su tutti i numeri
    // Scrivo il messaggio di fine gioco
    if(clickedNumbers.length === gameMaxRange - 16) {
        endGame();
    }

    // Quando ho finito le mia operazioni la cella non è più cliccabile
    this.style.pointerEvents = 'none';
}
function endGame() {
    userMessageDiv.innerHTML = `Hai finito il gioco, il punteggio è: ${clickedNumbers.length}`;
    for(let i = 0; i < gameMaxRange; i++) {
        let allSel = document.querySelectorAll('.square')
        allSel[i].removeEventListener('click', manageSquareClick)
    }
}
