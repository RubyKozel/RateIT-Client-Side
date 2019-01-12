import React, { Component } from 'react';
import ReviewItem from './review_item.js'
import Pagination from './pagination.js';

const email = localStorage.getItem('email');
const url = `http://localhost:8083/playground/activities/2019A.Kagan/${email}`

class ReviewList extends Component {

  constructor(props){
    super(props);
    this.state = { items: [], count: 0 };
  }

  componentWillMount(){
    this.setState({items:[], count: 0});
  }

  componentDidMount(){
    this.initItems(0);
  }

  async initItems(page) {
    const form = {
  	     elementPlayground:"2019A.Kagan",
  	     elementId:this.props.element_id,
  	     type:"ShowReviews",
  	     attributes: { page:page, size:5 }
    }

    const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
              });

    const responseJson = await response.json();

    let counter = 0;
    if(responseJson['attributes']){
      const items = ((responseJson['attributes'])['reviews']).map(review => {
        counter = counter + 1;
        return <ReviewItem key={responseJson['id'] + counter} review={review} />;
      });

      this.setState({ items: items, count: responseJson['attributes']['elementCount'] });
    }

  }

  async postNewReview(text) {

    const form = {
         elementPlayground:"2019A.Kagan",
         elementId:this.props.element_id,
         type:"PostReview",
         attributes: { review: text }
    }

    const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
              });

    const json = await response.json();
      
    document.getElementById("message").value = "";
    return json['attributes']['userPoints'];
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.setState({items:[], count: 0});
    this.initItems(0);
  }

  render() {
      if(this.state.items.length === 0 || this.element_id === null) {
          return (
              <div className="movie-reviews">
       
                <div className="no-reviews">
                    <span>No Reviews Yet ...</span>
                </div>

                <div className="post-review">
                    <Pagination onPageSelect = { (page) => this.initItems(page) } count = { this.state.count } />
                    <textarea id='message' name="message" placeholder="Type Review ..."></textarea>
                    <input type="button" onClick = { () =>
                        this.postNewReview(document.getElementById('message').value).then(res => {
                            this.props.onPostReview(res);
                            this.initItems(0);
                        })
                    } className="btn post-review-button" value="Post your review" />
                </div>

              </div>
      );
    }

    return (
    
      <div className="movie-reviews">
       
        <div className="all-reviews">
            <ul className="review-ul">
                {this.state.items}
            </ul>
        </div>
       
        <div className="post-review">
            <Pagination onPageSelect = { (page) => this.initItems(page) } count = { this.state.count } />
            <textarea id='message' name="message" placeholder="Type Review ..."></textarea>
            <input type="button" onClick = { () =>
                    this.postNewReview(document.getElementById('message').value).then(res => {
                        this.props.onPostReview(res);
                        this.initItems(0);
                    })
                } className="btn post-review-button" value="Post your review" />
        </div>
 
      </div>

    );
  }
}


export default ReviewList;
