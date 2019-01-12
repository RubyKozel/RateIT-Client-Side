import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-v3-search';
import Pagination from './components/pagination.js';
import SearchBar from './components/search_bar.js';
import MovieList from './components/movie_list.js';
import MovieDetails from './components/movie_details.js';

const YT_API_KEY = 'AIzaSyBWw_z28frnKg0NNVjemfUqTBcNr92fCUE';

//const GS_API_KEY = 'AIzaSyAESzaBET5NP2dpMRc_sB6csMhwiyD-hxw';
//const GS_API_KEY = 'AIzaSyAqUx1nSPKkeAWQbO9Qqz-NL5dCZoSAVzQ';
const GS_API_KEY = 'AIzaSyALOm_1_j1WVQ1FFuTaw91zpeLJ8YUWCrw';
//const GS_API_KEY = 'AIzaSyBAw704fIHzGZMcNaYHotpwS9A74i-QsyQ';
//const GS_API_KEY = 'AIzaSyCMGk2z1VT0rJI4QxJOssf8fkdcIB93EjA';
//const GS_API_KEY = 'AIzaSyBaTHVA6CUJNrB81Mfba-4Loh_xaA0MihY';
//const GS_API_KEY = 'AIzaSyDEwUUbx3EZ25dy_KzQpRNE1Na-Bl6kGlA';
//const GS_API_KEY = 'AIzaSyCimFlQ34ZGkG13yw65bZbzOnTVDGJEJ4o';
//const GS_API_KEY = 'AIzaSyCyI1-JQdUKY3rQrPo71HrRMbpZI_NqgHg';
//const GS_API_KEY = 'AIzaSyCx_gtyJMTzaVUkn0RiNClAqUYyEPJqH5w';
//const GS_API_KEY = 'AIzaSyBN5SMRaqjd2f4M_vHShnd2-Ua9zTqTE2I';
//const GS_API_KEY = 'AIzaSyBN1eAVttVpc2u3dCE0O29FHrwqJI8Ea7E';
//const GS_API_KEY = 'AIzaSyAKaQWvp6_ufqDi7fHX5EvCCeC0KCesYDo';
//const GS_API_KEY = 'AIzaSyD46VpewCNvBqAKcH32B2fDX7AXflwRC_0';

//const GS_CX = '002030300570137734147:nzrkxetky_e';
//const GS_CX = '002030300570137734147:nsqqao_o4aq';
const GS_CX = '002030300570137734147:er0xyns5_s4';
//const GS_CX = '005060485062968159875:vaz2-sy2wmc';
//const GS_CX = '005060485062968159875:cxxcmxlwh5g';
//const GS_CX = '005060485062968159875:t0_zbt12uko';
//const GS_CX = '005060485062968159875:slvkfikjekq';
//const GS_CX = '005060485062968159875:wj8pqsckfzy';
//const GS_CX = '005060485062968159875:3ebw5lf4iuw';
//const GS_CX = '005060485062968159875:bsl4bpwp7qe';
//const GS_CX = '005060485062968159875:_uuh-n2qdzc';
//const GS_CX = '005060485062968159875:g9mqhurbz_a';
//const GS_CX = '005060485062968159875:urema_fpgtg';
//const GS_CX = '005060485062968159875:1jcxcpxfnje';

const GoogleImages = require('google-images');

const client = new GoogleImages(GS_CX, GS_API_KEY);

let userInfoText = document.getElementById('user_info');
const playground = '2019A.Kagan';
const userName = localStorage.getItem('userName');
const points = localStorage.getItem('points');
const email = localStorage.getItem('email');
const role = localStorage.getItem('role');
const avatar = localStorage.getItem('avatar');
const userPlayground = localStorage.getItem('playground');

const byDistanceUrl = `http://localhost:8083/playground/elements/${userPlayground}/${email}/near/`
const allUrl = `http://localhost:8083/playground/elements/${userPlayground}/${email}/search/type/Movie Page`
const getBoardUrl = `http://localhost:8083/playground/elements/${userPlayground}/${email}/search/type/Messaging Board`

if (role !== 'Manager') {
    document.getElementById('create_element').style.display = 'none';
    document.getElementById('create_board').style.display = 'none';
}

userInfoText.innerHTML= 'Welcome back, ' + userName + ' &nbsp; &brvbar; &nbsp; ' + avatar + ' &nbsp; &brvbar; &nbsp; ' + points;

let lastMethod = null;
const size = 5;

class App extends Component {
    constructor(props){
      super(props);

      this.state = {
        movies: [],
        posters: [],
        id: [],
        selectedVideo: null,
        selectedId: 0,
        selectedPoster: null,
        pageCount: 0,
        currentDiv: <div />
      };

      this.setListeners();

    }

    async componentDidMount() {
        this.get_all(0);
    }

    setListeners() {
        document.getElementById('home').addEventListener('click', () => window.location.href = ".");
        document.getElementById('create_board').addEventListener('click', () => this.create_new_board());
        document.getElementById('create_element').addEventListener('click', () => this.create_new_element());
        document.getElementById('board').addEventListener('click', () => this.get_board());
        document.getElementById('all').addEventListener('click', () => {
            this.get_all(0);
            window.location.href = "#";
        });
        document.getElementById('distance_filter').addEventListener('click', () => {
            let x = prompt("choose start x");
            let y = prompt("choose start y");
            let distance = prompt("choose distance");
            if (x && y && distance)
                this.search_by_distance(0, x, y, distance);
        });

        document.getElementById('log_out').addEventListener('click', () => {
            const likesTrack = localStorage.getItem("likesTrack");

            if (localStorage.getItem('board_id')) {
                const temp = localStorage.getItem('board_id');
                localStorage.clear();
                localStorage.setItem('board_id', temp);
            } else {
                localStorage.clear();
            }

            localStorage.setItem("likesTrack", likesTrack);

            location.href = 'index.html';
        });
    }

    create_new_element() {
        localStorage.setItem('type', 'Movie Page');
        localStorage.setItem('title', 'Create Element Form');
        localStorage.setItem('method', 'POST');
        localStorage.setItem('button', 'Create');
        localStorage.setItem('extra_url', ``);
        location.href = 'create_element.html';
    }

    create_new_board() {
        localStorage.setItem('type', 'Messaging Board');
        localStorage.setItem('title', 'Create Messaging Board Form');
        localStorage.setItem('method', 'POST');
        localStorage.setItem('button', 'Create');
        localStorage.setItem('extra_url', ``);
        location.href = 'create_element.html';
    }

    update_element(ele_id) {
        localStorage.setItem('type', 'Movie Page');
        localStorage.setItem('title', 'Update Element Form');
        localStorage.setItem('method', 'PUT');
        localStorage.setItem('button', 'Update');
        if (ele_id && ele_id != "") {
            localStorage.setItem('extra_url', `/${playground}/${ele_id}`);
            location.href = 'create_element.html';
        }
    }

    async search_by_distance(page, x, y, distance) {
        let disUrl = `${x}/${y}/${distance}?page=${page}&size=${size}`;
        const result = await fetch(byDistanceUrl + disUrl);
        let resultJson = await result.json();

        if (localStorage.getItem('board_id')) {
            resultJson = resultJson.filter(item => item['id'] != localStorage.getItem('board_id'));
        }

        lastMethod = (page) => this.search_by_distance(page, x, y, distance);

        this.setData(resultJson);
    }

    async get_board() {
        const result = await fetch(getBoardUrl);
        const resultJson = await result.json();
        localStorage.setItem('board', resultJson);
        location.href = 'board_page.html';
    }

    async get_all(page) {
        const result = await fetch(allUrl + `?page=${page}&size=${size}`);
        const resultJson = await result.json();
        lastMethod = (page) => this.get_all(page);
        this.setData(resultJson);
    }

    async get_search_data(value, page) {
        const url = `http://localhost:8083/playground/elements/${userPlayground}/${email}/search/name/${value}?page=${page}&size=${size}`;
        const result = await fetch(url);
        const resultJson = await result.json();
        lastMethod = (page) => this.get_search_data(value, page);
        this.setData(resultJson);
    }

    setData(resultJson) {

      let movies = [];
      let posters = [];
      let id = [];

      if(resultJson.length > 0) {
        let pageCount = resultJson[0]['attributes']['count'];
        resultJson.forEach(async (result) => {
          let term = result['name'];
          let element_id = result['id'];
          let youtubeResult = await YTSearch(YT_API_KEY,{q:term + ' Official Trailer HD'});
          let googlesResult = await client.search(term + ' Official HD Poster');

          let movie = await youtubeResult.items[0];
          let poster = await googlesResult[0].url;

          id.push(element_id);
          movies.push(movie);
          posters.push(poster);

          this.setState({
            movies: movies,
            posters: posters,
            id: id,
            pageCount: pageCount
          }, () => this.setState({currentDiv: this.getMovieList()}));
        });
      } else {
        this.setState({
          movies: [],
          posters: [],
          id: [],
          pageCount: 0
        }, () => this.setState({currentDiv: <div />}));
      }
    }

    getMovieDetail(){
      return (
        <div>
          <MovieDetails onPostReview = { (newPoints) => 
            userInfoText.innerHTML = 'Welcome back, ' + userName + ' &nbsp; &brvbar; &nbsp; ' + avatar + ' &nbsp; &brvbar; &nbsp; ' + newPoints }
                        movie={this.state.selectedVideo}
                        poster={this.state.selectedPoster}
                        id={this.state.selectedId}
                        isManager = { role == 'Manager'? true : false }
                        onUpdate = { (ele_id) => this.update_element(ele_id) } />
          
        </div>
      )
    }

    getMovieList() {
      return (
        <div>
          <MovieList onMovieSelect = { (selectedVideo, selectedPoster, selectedId) => {
                                          this.setState({selectedVideo, selectedPoster, selectedId},
                                            () => this.setState({currentDiv: this.getMovieDetail()}));
                                      }}
                     movies={ this.state.movies }
                     posters={ this.state.posters }
                     id= { this.state.id }/>

          <Pagination onPageSelect = { (page) => lastMethod(page) }
                      count = { this.state.pageCount } />
        </div>
      )
    }

    render(){
      if(!this.state.movies || !this.state.id || !this.state.posters){
        return <div className="loading"><span>Loading... </span></div>
      }

      return (
        <div>
          <SearchBar onEnter = { (value) => this.get_search_data(value, 0) }/>
          {this.state.currentDiv}
        </div>
      );
    }
};

window.onscroll = () => {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        document.getElementById("go_to_top").style.display = "block";
    } else {
        document.getElementById("go_to_top").style.display = "none";
    }
}

document.getElementById("go_to_top").addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
});

ReactDOM.render(<App/ >, document.querySelector('.container'));
