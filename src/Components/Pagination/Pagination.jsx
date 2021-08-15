import React, { Component } from 'react';
class Pagination extends Component {
    state = {}
    render() {
        let { currentPage,totalPages } = this.props;
        return (<ul class="pagination justify-content-center">
            {/* Previous Page */}
            {currentPage == 1 ? <li class="page-item disabled">
                <a class="page-link">Previous</a>
            </li> : <li class="page-item text-primary" >
                <a class="page-link" onClick={this.props.previousMovie}>Previous</a>
            </li>}
            {/* Current Page */}
            {this.props.totalPages.map((value) => {
                if (value == this.props.currentPage) {
                    return <li class="page-item active" key={value}><a class="page-link" onClick={() => { this.props.selectMovie(value) }}>{value}</a></li>
                }
                return <li class="page-item" key={value}><a class="page-link" onClick={() => { this.props.selectMovie(value) }}>{value}</a></li>
            })}
            {/* Next Page */}
            {/* Previous Page */}
            {currentPage ==totalPages.length? <li class="page-item disabled">
                <a class="page-link">Next</a>
            </li> : <li class="page-item text-primary">
                <a class="page-link" onClick={this.props.nextMovie}>Next</a>
            </li>}
        </ul>);
    }
}

export default Pagination;