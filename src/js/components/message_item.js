import React, { Component } from 'react';

const MessageItem = ({ message }) => {
  return (
      
    <div id="reviews">
      
      <li className="message-item">
        {message}
      </li>
      
    </div>
      
  );

}

export default MessageItem;
