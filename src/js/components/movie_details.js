import React , { Component }from 'react';
import ReviewList from './review_list.js';

const email = localStorage.getItem('email');
const playground = localStorage.getItem('playground');

const url = `http://localhost:8083/playground/activities/${playground}/${email}`

class MovieDetails extends Component {

  constructor(props) {
    super(props);
    this.url = '#';

    this.state = {
      like: 0,
      dislike: 0
    }

    this.map = JSON.parse(localStorage.getItem("likesTrack"));

    if(props.isManager){
      this.update_button = <input type="button" id="update_button" className="btn update-btn" onClick =
          { () => this.props.onUpdate(this.props.id) } value="Update Movie" />
    } else {
      this.update_button = <div></div>
    }

    this.getCurrentLikeDislike();

  }

  componentDidMount() {
    const index = this.map[email][0].indexOf(this.props.id);
    if(index !== -1){
      if(this.map[email][1][index] === 0){
        document.getElementById('dislikebutton').classList.add('clicked');
      } else if(this.map[email][1][index] === 1) {
        document.getElementById('likebutton').classList.add('clicked');
      }
    }
  }

  async getCurrentLikeDislike() {
    const elementUrl = `http://localhost:8083/playground/elements/${playground}/${email}/2019A.Kagan/${this.props.id}`

    const response = await fetch(elementUrl);
    const responseJson = await response.json();

    const like = responseJson['attributes']['like'];
    const dislike = responseJson['attributes']['dislike'];

    this.setState({like, dislike});
  }

  async updateLikeDislike(like, dislike) {

    const form = {
  	     elementPlayground:"2019A.Kagan",
  	     elementId: this.props.id,
  	     type:"PostLikeDislike",
  	     attributes: {
           like: like,
           dislike: dislike
         }
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

    if(responseJson['attributes']){
      this.setState({
        like: responseJson['attributes']['like'],
        dislike: responseJson['attributes']['dislike']
      });
    }
  }

  likeClicked() {
    const db = document.getElementById('dislikebutton');
    const lb = document.getElementById('likebutton');

    if(lb.classList.contains('clicked')) {
      this.updateLikeDislike(-1,0);
      lb.classList.remove('clicked');
      const index = this.map[email].indexOf(this.props.id);
      this.map[email][0].splice(index, 1);
      this.map[email][1].splice(index, 1);
    } else if(db.classList.contains('clicked')){
      db.classList.remove('clicked');
      lb.classList.add('clicked');
      this.updateLikeDislike(1,-1);
      const index = this.map[email].indexOf(this.props.id);
      this.map[email][1].splice(index, 1, 1);
    } else {
      this.updateLikeDislike(1,0);
      lb.classList.add('clicked');
      this.map[email][0].push(this.props.id);
      this.map[email][1].push(1);
    }

    localStorage.setItem("likesTrack", JSON.stringify(this.map));
  }

  dislikeClicked() {
    const db = document.getElementById('dislikebutton');
    const lb = document.getElementById('likebutton');

    if(db.classList.contains('clicked')){
      this.updateLikeDislike(0,-1);
      db.classList.remove('clicked');
      const index = this.map[email].indexOf(this.props.id);
      this.map[email][0].splice(index, 1);
      this.map[email][1].splice(index, 1);
    } else if(lb.classList.contains('clicked')) {
      lb.classList.remove('clicked');
      db.classList.add('clicked');
      this.updateLikeDislike(-1,1);
      const index = this.map[email].indexOf(this.props.id);
      this.map[email][1].splice(index, 1, 0);
    } else {
      this.updateLikeDislike(0,1);
      db.classList.add('clicked');
      this.map[email][0].push(this.props.id);
      this.map[email][1].push(0);
    }

    localStorage.setItem("likesTrack", JSON.stringify(this.map));
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.updateLikeDislike(0, 0);
  }

  render() {
    if(!this.props.movie || !this.props.poster || !this.props.id) {
      return <div className="loading"><span>Loading ... </span></div>
    }

    this.url = `https://www.youtube.com/embed/${this.props.movie.id.videoId}`;

    return (
        <div className="movie-details">

          <div className="trailer-div">
            <iframe src={this.url}></iframe>
          </div>

          <div className="like-dislike-details">
                <a id="likebutton" onClick = { () => this.likeClicked() } className="ion-thumbsup like-dislike-icon" />
                <span>{this.state.like}</span>

                <a id="dislikebutton" onClick = { () => this.dislikeClicked() } className="ion-thumbsdown like-dislike-icon" />
                <span>{this.state.dislike}</span>

                {this.update_button}
          </div>

          <div className="poster-div">
            <img src={this.props.poster} />
          </div>
      
          <ReviewList onPostReview = { this.props.onPostReview } element_id={this.props.id} />

        </div>
    );
  }
}

export default MovieDetails;
