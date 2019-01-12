import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageList from './components/message_list.js';
import Pagination from './components/pagination.js';

const post_button = document.getElementById('post_btn');
const email = localStorage.getItem('email');
const url = `http://localhost:8083/playground/activities/2019A.Kagan/${email}`
const board_id = localStorage.getItem('board_id');

document.getElementById('return_btn').addEventListener('click', () => {
    location.href = 'elements_home.html';
});

document.getElementById('reset_btn').addEventListener('click', () => {
    document.getElementById('new_message_form').reset();
});

class MessagingBoard extends Component {

  constructor(props){
    super(props);

    this.state = { messages: [], count: 0 };

    post_button.addEventListener('click', () => {
      const text = document.getElementById('message').value;
      document.getElementById('message').value = "";
      if(text){
        this.postNewMessage(text).then(res => this.fetchMessages(0));
      }
    })

    this.fetchMessages(0);
  }

  async fetchMessages(page) {
    const form = {
         elementPlayground:"2019A.Kagan",
         elementId:board_id,
         type:"ShowMessages",
         attributes: { page:page, size: "5" }
    }

    const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
              });

    const resultJson = await response.json();
    this.setState({messages : resultJson['attributes']['messages'], count: resultJson['attributes']['elementCount']});

  }

  async postNewMessage(text) {
    const form = {
         elementPlayground:"2019A.Kagan",
         elementId:board_id,
         type:"PostMessage",
         attributes: { message: text }
    }

    const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
              });
    return "success";
  }

  render(){
    if (this.state.messages.length < 1){
      return <div className="loading"><span>Loading...</span></div>
    }

    return (
      <div>
        <MessageList messages = { this.state.messages } />
        <Pagination onPageSelect = { (page) => this.fetchMessages(page) } count = { this.state.count } />
      </div>
    )
  }
}

ReactDOM.render(<MessagingBoard />, document.querySelector('.container'));
