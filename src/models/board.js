import PropTypes from 'prop-types';
import React from 'react';
import Square from './square';

class Board extends React.Component {
  renderSquare(i) {
    const { squares, onClick } = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  render() {
    const { animate } = this.props;
    return (
      <div className={`whole-board${animate}`}>
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

// Specifies the default values for props:
Board.defaultProps = {
  squares: null,
  animate: null,
  onClick: null,
};

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string),
  animate: PropTypes.string,
  onClick: PropTypes.func,
};

export default Board;
