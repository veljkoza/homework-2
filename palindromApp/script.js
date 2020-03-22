"use strict";
const DISPLAY_NONE = "none";

const startElement = document.getElementById("start");
const startButton = document.getElementById("startButton");
const endGame = document.getElementById("endGame");

const noOfCharacters = document.getElementById("noOfCharacterInput");
noOfCharacters.setAttribute("maxlength", 1);

const cells = document.getElementById("cells");

startButton.addEventListener("click", gameStart);

noOfCharacters.setAttribute("maxlength", 2);

validateNumberInput(noOfCharacters);
checkForPalindrom();

function gameBeginning(){
  restartEverything();
  endGame.classList.add(DISPLAY_NONE);
  console.log(startButton.textContent);
  
  startElement.style.transition="all 2s ease-in-out";
  startElement.style.top = "0px";
  startElement.style.bottom = "0px";
}

function gameStart() {
  startElement.style.transition = "all 2s ease-in-out";
  startElement.style.top = "-500px";
  startElement.style.bottom = "2000px";
  createCells();

  slideInCells();
}

const endText = endGame.firstElementChild;

function restartEverything(){
  cells.innerHTML="";
  endText.innerHTML="";
}

function createCells() {
  let noOfCells = noOfCharacters.value;
  console.log(noOfCells);
  console.log("test");
  for (let i = 0; i < noOfCells; i++) {
    cells.appendChild(createCell());
  }
  cells.appendChild(createPlusCell());
}



function checkForPalindrom() {
  document.addEventListener("keyup", function(e) {
    let word = "";
    let allLetters = document.getElementsByClassName("cell");
    Array.from(allLetters).forEach(cell => {
      let text = cell.lastElementChild.value;
      word += text;
    });
    if (word.length > 3) {
      console.log(isItPalindrom(word));
    }
  });
}

function isItPalindrom(word) {
  let wordLength = word.length;
  let wordLengthMinusOne = wordLength - 1;
  let firstPartIndex = wordLengthMinusOne / 2;
  let firstPart = word.substring(0, firstPartIndex);
  let midChar = word.substring(firstPartIndex, firstPartIndex + 1);
  let secondPart = word.substring(firstPartIndex + 1, word.length);
  console.log(firstPart);

  console.log(secondPart);
  let reversedString = reverseString(secondPart);
  if (firstPart == reversedString) {
    showEndScreen(firstPart, secondPart, midChar);
    return true;
  }
  return false;
}

function showEndScreen(firstPart, secondPart, midChar) {
  endGame.classList.remove("none");
  let element = document.createElement("h2");
  let text = firstPart + " " + midChar + " " + secondPart + " je palindrom!";
  element.append(text);
  endText.appendChild(element);
  
  let restartButton = document.getElementById("endButton")

  restartButton.addEventListener('click',gameBeginning);
  console.log(restartButton);

}

function reverseString(word) {
  let split = word.split("");
  let reverse = split.reverse();
  let finalString = reverse.join("");
  return finalString;
}

function createCell() {
  let cell = document.createElement("div");
  cell.classList.add("cell");

  let xButton = createXButton();

  let inputInCell = document.createElement("input");
  inputInCell.setAttribute("type", "text");
  inputInCell.classList.add("cellInput");
  inputInCell.setAttribute("maxlength", 1);

  validateInput(inputInCell);

  cell.appendChild(xButton);
  cell.appendChild(inputInCell);

  return cell;
}

function createXButton(){
  let xButton = document.createElement("button");
  let xNode = document.createTextNode("x");
  xButton.appendChild(xNode);
  xButton.classList.add("cellDelButton");
  xButton.addEventListener("click", removeCell);
  
  return xButton;
}

function removeCell(e) {
  let cellToDelete = e.target.parentElement;
  cells.removeChild(cellToDelete);
}

function validateNumberInput(numberInput) {
  numberInput.addEventListener("keyup", function(e) {
    validateNumber(numberInput.value, e);
  });
}

function validateNumber(number, e) {
  let regex = /^[0-9]+$/;

  if (!/[0-9]/.test(number)) {
    console.log("nije broj;");
    e.stopImmediatePropagation();
    return false;
  }
}

function validateInput(textInput) {
  textInput.addEventListener("keypress", function(e) {
    validateText(e.key, e);
  });
}

// /^[a-zA-Z\s]*$/
function validateText(charKey, e) {
  if (!/[a-z ]/i.test(charKey)) {
    e.preventDefault();
  }
}

function createPlusCell() {
  let cell = document.createElement("div");
  cell.classList.add("cellPlus", "plus");

  cell.addEventListener("click", addCellManually);
  return cell;
}

function addCellManually() {
  let lastCell = cells.lastElementChild;
  console.log(lastCell);
  cells.replaceChild(createCell(), lastCell);
  cells.appendChild(createPlusCell());

  console.log(cells);
}

function slideInCells() {
  cells.style.transition = "all 2s ease-in-out";
  cells.style.minHeight = "100vh";
}
