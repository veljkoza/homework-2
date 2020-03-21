const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]



let circleTurn;

const cellElements = document.querySelectorAll("[data-cell]")
const restartButton = document.getElementById("restartButton");
const winningMessage = document.getElementById("winningMessage");
const winningMessageTextElement = document.getElementById("winningMessageText");

const board = document.getElementById("board");

startGame();

restartButton.addEventListener('click',startGame);

function startGame(){
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',clickCell);
        cell.addEventListener("click",clickCell,{once: true})
    });
    setBoard();

    winningMessage.classList.remove('show');
}

function clickCell(e){
    const clickedCell = e.target;  
    const currentBoardClass = circleTurn ? O_CLASS : X_CLASS;

    placeXo(clickedCell,currentBoardClass);

    if(checkWin(currentBoardClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns();
        setBoard();
    }

}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Draw!";
        winningMessage.classList.add("show")

    }else{
        winningMessageTextElement.innerText = `${circleTurn? "O's" : "X's"} WIN!`;
        winningMessage.classList.add("show")
    }
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function placeXo(clickedCell,currentBoardClass){
    // if(currentBoardClass === X_CLASS){
    //     clickedCell.classList.add(X_CLASS);
    //     circleTurn = true;
    //     board.classList.remove("x");
    //     board.classList.add("o");
    // }else{
    //     clickedCell.classList.add(O_CLASS);
    //     board.classList.remove("o");
    //     board.classList.add("x");
    //     circleTurn = false;
    // }

    clickedCell.classList.add(currentBoardClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoard(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS)

    circleTurn ? board.classList.add(O_CLASS):board.classList.add(X_CLASS);
}

function checkWin(currentBoardClass){
 return  WINNING_COMBINATIONS.some(combination => {
     return combination.every(index => {
         return cellElements[index].classList.contains(currentBoardClass);
     })
 })
}





