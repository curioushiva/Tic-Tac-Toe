/* Accessing the elements */
let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset-btn")
let winContainer = document.querySelector(".winContainer")
let winmsg = document.querySelector(".winmsg")
let newgame = document.querySelector(".newgame")
let mainBody = document.querySelector(".mainBody")

/* Play audio on click */
function clickAudio() {
    new Audio('assets/ani/click.mp3').play();
}

/* Play audio on win */
function winAudio() {
    new Audio('assets/ani/win.mp3').play();
}

/* Tap audio on play */
function tapAudio() {
    new Audio('assets/ani/tap.mp3').play();
}

/* Player's Turn either X or O */
let turnO = true;

/* Winning Patterns */
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

/* Reset and New Game Logic */
const resetGame = () => {
    turnO = true;
    enabledBoxes();
    mainBody.classList.remove("mainBody")
    winContainer.classList.add("winvisibility")
}

/* Accessing Reset And New Game buttons */
newgame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


/* Event Listener to track box click */
boxes.forEach(boxClick = (box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            tapAudio();
            box.innerText = "O"
            turnO = false;
            box.disabled = true;
        } else {
            tapAudio();
            box.innerText = "X"
            turnO = true;
            box.disabled = true;
        }

        checkWinner();
    });
});

/*To disable boxes after winning*/
const disabledBoxes = () => {
    for (let box of boxes) {
        winAudio();
        box.disabled = true;
    }
}

/*To enable boxes after winning*/
const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
}

/* Function to return winner msg */
mainBody.classList.remove("mainBody")
const showWinner = (winner) => {
    winmsg.innerText = `Player ${winner} \n has won the game`
    disabledBoxes();
    mainBody.classList.add("mainBody")
    winContainer.classList.remove("winvisibility")
}


/* Function to check for the winner */
/* Things Explained ;

- pattern of win patter -> 
   prints [0],[1],[2] etc

- pattern[0] = [0][0] of winPattern(2d array)
  pattern[1] = [0][1] of winPattern(2d array)

- boxes[0] - 1st box
  boxes[1] - 2nd box

- boxes[pattern[0]] - box[0]

*/
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
}

/* END OF JS */