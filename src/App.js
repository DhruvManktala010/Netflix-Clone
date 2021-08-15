import React, { Component } from 'react';
import { API_KEY, API_URL } from './API/secret';
import Header from './Components/Header/Header';
import axios from "axios";
import Movies from './Components/Movies/Movies';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pagination from './Components/Pagination/Pagination';
import Favourite from './Components/Favourite/Favourite';
import MovieInfo from './Components/movieInfo/movieInfo';
class App extends Component {
  state = {
    movies: [],
    movieType: "spiderman",
    page: 1,
    totalPages: [],
    favouriteMovie: []
  }
  componentDidMount() {
    axios.get(`${API_URL}search/movie?`, {
      params: {
        api_key: API_KEY,
        query: this.state.movieType,
        page: this.state.page,
      }
    }).then((obj) => {
      let { data } = obj;
      console.log(data.results);
      let pages = [];
      for (let i = 1; i <= data.total_pages; i++) {
        pages.push(i);
      }
      this.setState({
        movies: data.results.slice(0, 10),
        totalPages: pages
      });

    });
  }
  searchMovie = (movieName) => {
    axios.get(`${API_URL}search/movie?`, {
      params: {
        api_key: API_KEY,
        query: movieName,
        page: this.state.page,
      }
    }).then((obj) => {
      let { data } = obj;
      let pages = [];
      for (let i = 1; i <= data.total_pages; i++) {
        pages.push(i);
      }
      this.setState({
        movies: data.results.slice(0, 10),
        totalPages: pages
      });

    });
  }
  selectMovie = (index) => {
    axios.get(`${API_URL}search/movie?`, {
      params: {
        api_key: API_KEY,
        query: this.state.movieType,
        page: index,
      }
    }).then((obj) => {
      let { data } = obj;
      this.setState({
        movies: data.results.slice(0, 10),
        page: index
      });

    });
  }
  previousMovie = () => {
    axios.get(`${API_URL}search/movie?`, {
      params: {
        api_key: API_KEY,
        query: this.state.movieType,
        page: this.state.page - 1
      }
    }).then((obj) => {
      let { data } = obj;
      this.setState({
        movies: data.results.slice(0, 10),
        page: this.state.page - 1
      });

    });
  }
  nextMovie = () => {
    axios.get(`${API_URL}search/movie?`, {
      params: {
        api_key: API_KEY,
        query: this.state.movieType,
        page: this.state.page + 1
      }
    }).then((obj) => {
      let { data } = obj;
      this.setState({
        movies: data.results.slice(0, 10),
        page: this.state.page + 1
      });

    });
  }
  addFavourite = (id, isLike) => {
    console.log(`In add favourite function ${isLike}`);
    if (isLike) {
      let newFavouriteMovie = this.state.favouriteMovie.filter((data)=>{
        if(data.id==id)return false;
        return true;
      });
      this.setState({
        favouriteMovie:newFavouriteMovie
      });
    } else {
      axios.get(`${API_URL}movie/${id}?`, {
        params: {
          api_key: API_KEY
        }
      }).then((data) => {
        this.setState({
          favouriteMovie: [...this.state.favouriteMovie, data.data]
        });
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Header searchMovie={this.searchMovie}></Header>
          <Route path="/" exact>
              {(this.state.movies.length>0)?
              <>
              <Movies
              moviesData={this.state.movies}
              addFavourite={this.addFavourite}
              favouriteMovies={this.state.favouriteMovie}
              >
            </Movies>  
            <Pagination
            currentPage={this.state.page}
            totalPages={this.state.totalPages}
            selectMovie={this.selectMovie}
            previousMovie={this.previousMovie}
            nextMovie={this.nextMovie}
          >
          </Pagination>
          </>
              :
              <h1 style={{color:"white",textAlign:"center"}}>No Movie found</h1>
              }
            </Route>
          <Switch>
            <Route path="/movieInfo" exact component={MovieInfo}>
            </Route>
            <Route path="/favourite" exact>
              <Favourite movieDetailObj={this.state.favouriteMovie} addFavourite={this.addFavourite}></Favourite>
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;