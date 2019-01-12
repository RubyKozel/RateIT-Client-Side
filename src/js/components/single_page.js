import React, { Component } from 'react';

const SinglePage = ({ onPageSelect, num }) => {
  return (
    <a onClick = { () => onPageSelect(num) } href="#">{num + 1}</a>
  )
}

export default SinglePage;
