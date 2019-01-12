import React, { Component } from 'react';
import MessageItem from './message_item.js'

const MessageList = ({messages}) => {
  const items = messages.map( message => <MessageItem message={message} /> );

  console.log(items);

  return (
      
    <ul className="message-list">
        {items}
    </ul>
      
  );
}

export default MessageList;
