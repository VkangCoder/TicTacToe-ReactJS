import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combiantions";
import GameOver from "./components/GameOver";

const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner = null;
    for (const combiantions of WINNING_COMBINATIONS) {
        const firsSquareSymbol =
            gameBoard[combiantions[0].row][combiantions[0].column];
        const secondSquareSymbol =
            gameBoard[combiantions[1].row][combiantions[1].column];
        const thirdSquareSymbol =
            gameBoard[combiantions[2].row][combiantions[2].column];

        if (
            firsSquareSymbol &&
            firsSquareSymbol === secondSquareSymbol &&
            firsSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firsSquareSymbol];
        }
    }
    return winner;
}

function App() {
    const [players, setPlayer] = useState(PLAYERS);

    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((curActivePlayer) =>
        //     curActivePlayer === "X" ? "O" : "X"
        // );
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];

            return updatedTurns;
        });
    }

    const handleRestart = () => {
        setGameTurns([]);
    };

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayer((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            };
        });
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRestart={handleRestart} />
                )}

                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
