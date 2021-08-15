import axios from 'axios';
import React, { Component } from 'react';
import "./movieInfo.css";
import { API_KEY, API_URL,IMAGE_URL } from '../../API/secret.js';
import Youtube from "react-youtube";
class MovieInfo extends Component {
    state = {
        videoLink:""
    }
    componentDidMount(){
        const id = this.props.location.state.id;
        axios(API_URL+"/movie/"+id+"/videos?",{
            params:{
                api_key:API_KEY
            }
        }).then((response)=>{
            let videoObj = response.data.results;
            let videoLink = videoObj.filter((obj)=>{
                if(obj.type=="Trailer"){
                    return true;
                }return false;
            });
            this.setState({
                videoLink:videoLink[0].key
            });
        })
    }
    render() {
        let { original_title, vote_average, poster_path, overview } = this.props.location.state;
        const opts = {
            height: '450',
            width: '100%',
            playerVars: {
              autoplay: 1,
            },
          };
        
        return (
            <React.Fragment>
                <div className="movieInfo">

                <div className="poster">
                    <img src={IMAGE_URL + poster_path} />
                </div>
                <div className="info">
                <div className="movieData">
                    <h1>{original_title}</h1>
                    <h1>IMDB {vote_average}</h1>
                    <h5>{overview}</h5>
                    </div>
                <Youtube videoId={this.state.videoLink} opts={opts} className="youtube"></Youtube>
                </div>

                </div>
            </React.Fragment>
        );
    }
}
export default MovieInfo;