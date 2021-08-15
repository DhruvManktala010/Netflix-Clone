import React, { Component } from 'react';
import Movie from '../Movie/Movie';
import "../Movies/Movies.css";
class Movies extends Component {
    state = {}
    render() {
        let { moviesData } = this.props;
        return (<>
            <div className="movie">
                {moviesData.map((data) => {
                    return <Movie
                        movieDetailObj={data}
                        key={data.id}
                        addFavourite={this.props.addFavourite}
                        favouriteMovies={this.props.favouriteMovies}
                        id={data.id}
                        >
                    </Movie>
                })}
            </div>

        </>);
    }
}

export default Movies;