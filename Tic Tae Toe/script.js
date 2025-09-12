//TODO: Tic Tac Toe game
const boxes = document.querySelectorAll(".btn");
let msg = document.querySelector(".hide");
let resetBtn = document.querySelector("#reset-btn");
let new_game_btn = document.querySelector("#new-game-btn");
let showTurn = document.querySelector(".turn");


const winning_pattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


let turnX = true;


//FIXME: 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box clicked");
        if(turnX == true){
            box.innerText = "X";
            showTurn.innerText = "Player O turn"
            turnX = false;
        }
        else{
            box.innerText = "O";
            showTurn.innerText = "Player X turn"
            turnX = true;
        }
        box.disabled = true;
        checkwinner();
    });
})


const checkwinner = () => {
    for(pattern of winning_pattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3){
                showwinner(pos1);
            }
        }
    }
}

const showwinner = (winner) => {
    msg.innerText = `Congartulation Winner is ${winner}`;
    box_disabled();
    msg.classList.remove("hide");
    msg.classList.add("showwinner");
}


const box_disabled = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const box_enabled = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

new_game_btn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);

function reset(){
    box_enabled();
    msg.classList.remove("showwinner");
    msg.innerText = "";
    turnX = true;
    showTurn.innerText = "Player X turn";
}