function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = new Array(rows * columns).fill("");

    function getBoard() {
        return board;
    }

    function placeMarker(index, marker) {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        } else {
            return false;
        }
    }

    return {
        getBoard,
        placeMarker
    }
}

function player(name, marker) {
    return {
        name,
        marker,
    }
}

function gameController() {
    const board = gameBoard();
    
    const playerOne = player("Player 1", "X");
    const playerTwo = player("Player 2", "O");

    let activePlayer = playerOne;

    let gameOver = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function switchPlayer() {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        } else {
            activePlayer = playerOne;
        }
    }

    function drawCheck() {
        const currentBoard = board.getBoard();

        if (currentBoard.includes("")) {
            return null;
        } else {
            return "Draw.";
        }
    }

    function gameWin() {
        const currentBoard = board.getBoard();

        for (const combination of winningCombinations) {
            if (currentBoard[combination[0]] === activePlayer.marker &&
                 currentBoard[combination[1]] === activePlayer.marker &&
                  currentBoard[combination[2]] === activePlayer.marker) {
                return `${activePlayer.name} is the Winner!`;
            }
        }
        return null;
    }

    function playRound(index) {
        if (gameOver === true) {
            return "Game is over."
        }

        if (board.placeMarker(index, activePlayer.marker)) {
            const winCheck = gameWin();
            const checkDraw = drawCheck();

            if (winCheck !== null) {
                gameOver = true;
                return winCheck;
            } else if (checkDraw !== null) {
                gameOver = true;
                return checkDraw;
            } else {
                switchPlayer();
            }

        } else {
            return "Invalid move. Please try again.";
        }
     }

    function getBoard() {
        return board.getBoard();
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function resetGame() {
        board.getBoard().fill("");
        activePlayer = playerOne;
        gameOver = false;
    }

    function setPlayerNames(playerOneName, playerTwoName) {
        playerOne.name = playerOneName;
        playerTwo.name = playerTwoName;
    }

    return {
        playRound,
        getBoard,
        getActivePlayer,
        resetGame,
        setPlayerNames
    };
}

function screenController() {
    const squares = document.querySelectorAll(".square");
    const gameMessage = document.querySelector(".game-message");
    const restartButton = document.querySelector(".restart");
    const playerOneInput = document.querySelector(".player-one-name");
    const playerTwoInput = document.querySelector(".player-two-name");
    gameMessage.textContent = `${game.getActivePlayer().name}'s turn`;

    squares.forEach(function(square) {
        square.addEventListener("click", function() {
            const index = Number(square.dataset.index);
            const roundResult = game.playRound(index);
            // console.log(`You clicked square index ${square.dataset.index}`);
            const currentBoard = game.getBoard();
            square.textContent = currentBoard[index];

            if (roundResult !== undefined) {
                gameMessage.textContent = roundResult;
            } else {
                gameMessage.textContent = `${game.getActivePlayer().name}'s turn`;
            }
        })
    });

    restartButton.addEventListener("click", function() {
        game.resetGame();
        
        squares.forEach(function(square) {
            square.textContent = "";
        });

        gameMessage.textContent = `${game.getActivePlayer().name}'s turn`;
    });

    function handleNameInput(event) {
         if (event.key === "Enter") {
            const playerOneName = playerOneInput.value;
            const playerTwoName = playerTwoInput.value;

            game.setPlayerNames(playerOneName, playerTwoName);

            gameMessage.textContent = `${game.getActivePlayer().name}'s turn`;
        }
    }

    playerOneInput.addEventListener("keydown", handleNameInput);
    playerTwoInput.addEventListener("keydown", handleNameInput);

}

const game = gameController();

screenController();