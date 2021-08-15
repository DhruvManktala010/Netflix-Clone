import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Header.css";
class Header extends Component {
    state = { 
        searchValue:null
     }
    getValue=(e)=>{
        let value = e.target.value;
        this.setState({
            searchValue:value
        });
    }
    searchValue=(e)=>{
        if(e.key=="Enter"){
            this.props.searchMovie(this.state.searchValue);
        }
    }
    render() { 
        return ( 
            <>
        <div className="header">
            <div className="logo">
                <Link to="/">
                <img src="Images/logo.png" alt="logo"/>
                </Link>
            </div>
            <div className="searchBar">
                <input type="text" value={this.state.searchValue} onChange={this.getValue} onKeyPress={this.searchValue} placeholder="Search your movie"/>
            </div>
            <div className="links">
                <div className="Home">
                    <Link to="/">Home</Link>
                </div>
                <div className="Favourite">
                    <Link to="/favourite">Favourite</Link>
                </div>
            </div>
        </div>
        </>);
    }
}
export default Header;