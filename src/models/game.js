import React from 'react';
import Board from './board';

function isGameOver(squares) {
  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombo.length; i += 1) {
    const [a, b, c] = winningCombo[i];
    // Check for Winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Check if the board is full
  const isDraw = squares.every(i => i != null);
  if (isDraw) {
    return 'Draw';
  }

  return false;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
      ],
      stepNumber: 0,
      player: 'X',
      animate: false,
    };
  }


  handleClick(i) {
    const { history, player, stepNumber } = this.state;
    // Used to create a duplicate history array
    // but only duplicate the squares objects in line with the state.stepNumber
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();// Used to create duplicate array
    if (isGameOver(squares) || squares[i]) {
      return;
    }
    squares[i] = player;
    newHistory.push({ squares });
    this.setState(prevState => ({
      history: newHistory,
      stepNumber: newHistory.length - 1,
      player: prevState.player === 'X' ? 'O' : 'X',
    }));
  }

  jumpTo(move) {
    const { history } = this.state;

    setTimeout(() => {
      this.setState({ animate: false });
    }, 1800);

    const newHistory = history.slice(0, move + 1);
    this.setState({
      animate: true,
      history: newHistory,
      stepNumber: newHistory.length - 1,
      player: newHistory.length % 2 === 0 ? 'O' : 'X',
    });
  }

  render() {
    const {
      player, history, stepNumber, animate,
    } = this.state;
    const current = history[stepNumber];
    const gameState = isGameOver(current.squares);
    let span;
    let status = gameState === 'Draw' && !false ? 'Draw' : `Player ${gameState} has Won!`;
    if (gameState === false) {
      span = <span className="pulse">{player}</span>;
      status = 'Player Turn: ';
    }

    const classAddHide = animate ? ' hide' : '';
    const classAddAnimate = animate ? ' jumpTo' : '';
    const moves = history.map((step, move) => {
      const desc = !move ? 'Go to game start' : `Go to move #${move}`;
      const playerTurn = move % 2 !== 0 ? 'O-border' : 'X-border';
      return (
        <li key={desc} className="move">
          <button type="button" className={playerTurn} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <h1>
          {status}
          {span}
        </h1>
        <div className="game-board">
          <Board
            animate={classAddAnimate}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className={`game-info${classAddHide}`}>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


export default Game;
