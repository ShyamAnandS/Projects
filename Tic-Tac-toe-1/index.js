//This line will select all the querySelectors(HTML elements) with class = "cell".//
const cells = document.querySelectorAll(".cell");
//This line will select  the querySelector(HTML element) with id = "statusText".//
const statusText = document.querySelector("#statusText");
//This line will select  the querySelector(HTML element) with id = "restartBtn".//
const restartBtn = document.querySelector("#restartBtn");
// All the above lines selects the specified querySelectors(HTML elements) and store it in the respective constant variables.Constant variable is variable whose value is constant and cannot be changed after it's initialization and declaration.// 
// The constant variable "winConditions" contains the index number of all cells (combinations) that result in a win-situation.//
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
//"Let" is the keyword which is used to declare and initilaize variable in JS."Var" can also be used.
//It is a placeholder array to get inputs entered by the user//
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
//A variable to keep track of our game.//
let running = false;
//Function Call.//
initializeGame();
//Fumction Definition - addEventListener will detect the action performed by the user and then calls a function(callback function).In this case , it calls the respective functions once the user clicked a cell.//
//Callback function is a function that can be called in or by other function.//
function initializeGame(){
//forEach executes a callBack function once for each array element.//
//"=>" means arrow function . It is a compact alterntive to a traditional function expression.//
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
//"`${}`" is a template literal . It can be put in a placeholder.It is similar to format method in python.//
    restartBtn.addEventListener("click", restartGame);
//In order to start the game . The game here will start/initialize based on the boolean values.//
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
//"this" refers to the object that is being clicked here."getAttribute" here gets the indexnumber(attribute) of the clicked ones.//
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
//Updating the cell with the currentPlayer value provided by the user which is collected by the variable options.//
    cell.textContent = currentPlayer;
}
function changePlayer(){
//It is a ternary operator(a compact version of if-else statement).Here it changes the currentPlayer value to "O" if it's "X" and to "X" if it's otherwise.// 
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
//The for loops through the winConditions array and check whether the  three placeholders in options are filled , if it is , then somebody won . Else it will check the next index combination.//
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
//If there are empty spaces ,  then skip the iteration using continue statement.//
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
// If the placeholders matches the values in the winConditions then stop the itertion by using break statement.//
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
//It checks if the array contains any spaces.If it doesn't , then it's a draw , otherwise change player.//
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
function getName(){
   currentPlayer = name;
}
document.addEventListener('keypress', (getName) => {
    var name = getName.key;
    var code = getName.code;
}, false);