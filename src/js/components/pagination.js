import React, { Component } from 'react';
import SinglePage from './single_page.js';

const Pagination = ({ onPageSelect, count }) => {
    const items = [];
    for(let i=0; i<count;i++){
      items.push(
        <SinglePage
          key = {i}
          onPageSelect = { onPageSelect }
          num={i} />
        );
    }
    
    if (items.length > 1) {
        return (
        <div id="pagination" className="page-numbers">
            {items}
        </div>
        );
    }
    
    return <div></div>
}

export default Pagination;
