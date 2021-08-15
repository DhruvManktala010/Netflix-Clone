import React, { Component } from 'react';
import { IMAGE_URL } from '../../API/secret';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import "../Favourite/Favourite.css";
class Favourite extends Component {
    state = {  
        isLike:false
    }
    like=(id,isLike)=>{
        this.props.addFavourite(id,isLike);
        this.setState({
            isLike:!isLike
        });
    }
    render() { 
        let {movieDetailObj} = this.props;
        return(
        <div className="favourite">
        {movieDetailObj.length>0?movieDetailObj.map((data)=>{
            console.log(data);
            let { poster_path, title, vote_average,id } = data;
            let data2 = this.props.movieDetailObj.filter((favouriteObj)=>{
                if(favouriteObj.id==id){
                    return true;
                }return false;
            })
            return ( <div className="movieCard">
            <div className="moviePoster">
                <img src={IMAGE_URL + poster_path} />
                <div class="like">
                    {data2.length>0||this.state.isLike?<FavoriteIcon style={{ fontSize: "2rem" }} onClick={()=>{this.like(id,true)}}></FavoriteIcon>:<FavoriteBorderIcon style={{ fontSize: "2rem" }} onClick={()=>{this.like(id,false)}}></FavoriteBorderIcon>}
                </div>
            </div>
            <h5 className="movieName">{title}</h5>
            <h5 className="movieRating">{vote_average}</h5>
        </div>)
        }):<h1 style={{color:"white",textAlign:"center"}}>No Favourite Movies</h1>
        }
        </div>
        )
    }
}
 
export default Favourite;