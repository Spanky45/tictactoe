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
    
    const playerOne = player("playerOne", "X");
    const playerTwo = player("playerTwo", "O");

    let activePlayer = playerOne;

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

    function gameWin() {
        const currentBoard = board.getBoard();

        for (const combination of winningCombinations) {
            if (currentBoard[combination[0]] === activePlayer.marker &&
                 currentBoard[combination[1]] === activePlayer.marker &&
                  currentBoard[combination[2]] === activePlayer.marker) {
                return `${activePlayer.name} is the winner`;
            }
        }
        return null;
    }

    function playRound(index) {
    if (board.placeMarker(index, activePlayer.marker)) {
        const winCheck = gameWin();

        if (winCheck === null) {
            switchPlayer();
        } else {
            return winCheck;
        }

    } else {
        return "Invalid move. Please try again.";
    }
    }
}