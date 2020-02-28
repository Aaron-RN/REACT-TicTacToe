import React from 'react';

class Square extends React.Component {
  render() {
    const classToAdd = this.props.value?  this.props.value + " growB " : "";
    return (
      <button className= {classToAdd + "square"}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;