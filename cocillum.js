import React from 'react';

// Applies italics to the text in this view
const ItalicText = () => {
  const textStyle = {
    fontStyle: 'italic'
  };

  return (
    <p style={textStyle}>This text will be italicized.</p>
  );
}

export default ItalicText;
