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
        }
        else return false;
    }

    return {
        getBoard,
        placeMarker
    };
}

function player(name, marker) {
    return {
        name,
        marker,
    };
}

function gameController() {
    gameBoard();
    const playerOne = player(PlayerOne, X);
    const playerTwo = player(playerTwo, O);
}