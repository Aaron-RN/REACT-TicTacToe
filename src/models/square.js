import PropTypes from 'prop-types';
import React from 'react';

function Square(props) {
  const { value, onClick } = props;
  const classToAdd = value ? `${value} growB ` : '';
  return (
    <button
      type="button"
      className={`${classToAdd}square`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

// Specifies the default values for props:
Square.defaultProps = {
  value: null,
  onClick: null,
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Square;
