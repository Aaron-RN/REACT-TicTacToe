import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" 
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      player: 'X',
      gameOver: false,
    };
  }
  handleClick(i){
    if (this.state.gameOver) { return; }
    const squares = this.state.squares.slice(); //Used to create duplicate array
    squares[i] = this.state.player;
    this.setState({
      squares: squares,
      player: this.state.player === 'X'? 'O' : 'X',
    }, () => {
      this.isGameOver();
    });
  }
  
  isGameOver(){
    console.log(this.state.squares);
    const winningCombo = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < winningCombo.length; i += 1){
      const [a, b, c] = winningCombo[i];
      const squares = this.state.squares;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        this.setState({
          gameOver: true,
        });
      }
    }
  }
  
  renderSquare(i) {
    return <Square value={this.state.squares[i]}
              onClick={() => this.handleClick(i)}
            />;
  }

  render() {
    const {gameOver, player} = this.state;
    const winner = player == 'X'? 'O' : 'X'; // Retrieves the previous player before current turn
    const status = !gameOver? 'Next player: ' + player : winner + ' has Won!';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
