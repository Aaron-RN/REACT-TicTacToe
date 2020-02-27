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
  renderSquare(i) {
    return <Square value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
            />;
  }

  render() {
    return (
      <div>
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
    constructor(props){
    super(props);
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      squares: Array(9).fill(null),
      player: 'X',
      winner : null,
      gameOver: false,
    };
  }
  
    handleClick(i){
      if (this.state.gameOver) { return; }
      const squares = this.state.squares.slice(); //Used to create duplicate array
      squares[i] = this.state.player;
      this.setState({
        squares: squares,
      }, () => {
        this.isGameOver();
      });
  }
  
  isGameOver(){
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
      //Check for Winner
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        this.setState({
          gameOver: true,
          winner: this.state.player,
        });
      } else {//Switch Player Turn
        this.setState({
          player: this.state.player === 'X'? 'O' : 'X',
        });
      }
    }
    //Check if the board is full
    const isDraw = this.state.squares.every((i) => i != null);
    if (isDraw){
      this.setState({
        gameOver: true,
      });
    }
  }
  
  render() {
    const {gameOver, player, winner, squares} = this.state;
    const status = !gameOver? 'Next player: ' + player : winner? 
                      winner + ' has Won!' : 'Draw!';
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
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
