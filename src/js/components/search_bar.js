import React, { Component } from 'react';
const userPlayground = localStorage.getItem('playground');
const email = localStorage.getItem('email');

class SearchBar extends Component {

  constructor(props){
    super(props);
    this.state = { term: '' };
  }

  render() {
    return (
      <div className="search-bar">
        <input onChange = {event => this.setState({term: event.target.value})} placeholder="Search a Movie..." onKeyPress={this.onEnter.bind(this)} />
      </div>
    )
  }

  async onEnter(event){
    if(event.key == 'Enter'){
      const value = this.state.term;
      this.props.onEnter(value);
    }
  }

}

export default SearchBar;
