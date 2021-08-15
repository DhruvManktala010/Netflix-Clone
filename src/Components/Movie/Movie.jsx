import React, { Component } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../API/secret';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Link} from "react-router-dom";
import axios from "axios";
import "../Movie/Movie.css";
class Movie extends Component {
    state = {
        isLike: false,
        movieDetailObj:"",
    }
    componentDidMount(){
        axios.get(API_URL+"/movie/"+this.props.id+ "?",{
            params:{
                api_key:API_KEY
            }
        }).then((response)=>{
            let movieInfo = response.data;
            console.log(movieInfo);
            this.setState({
                movieDetailsObj: movieInfo
            });
            
        });
    }
    like=(id,isLike)=>{
        this.props.addFavourite(id,isLike);
        this.setState({
            isLike:!isLike
        });
    }
    render() {
        let { poster_path, title, vote_average,id} = this.props.movieDetailObj;
        let data = this.props.favouriteMovies.filter((favouriteObj)=>{
            if(favouriteObj.id==id){
                return true;
            }return false;
        })
        return (
        
        <div className="movieCard">
            <div className="moviePoster">
                <Link to={
                    {
                        pathname: "/movieInfo",
                        state: this.state.movieDetailsObj
                    }
                }>     
                <img src={IMAGE_URL + poster_path} />
                </Link>
                <div class="like">
                    {data.length>0||this.state.isLike?<FavoriteIcon style={{ fontSize: "2rem" }} onClick={()=>{this.like(id,true)}}></FavoriteIcon>:<FavoriteBorderIcon style={{ fontSize: "2rem" }} onClick={()=>{this.like(id,false)}}></FavoriteBorderIcon>}
                </div>
            </div>
            <h5 className="movieName">{title}</h5>
            <h5 className="movieRating">{vote_average}</h5>
        </div>
        );
    }
}

export default Movie;