import React, { Component } from 'react'
import './pagination.component.scss'


export class Pagination extends Component {
    render() {
        const { placesPerPage, totalPlaces, paginate, nextPage, prevPage } = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link left" href="#" onClick={() => prevPage()}>
                            <i class="fas fa-angle-left"></i>
                        </a>
                    </li>
                    {paginate && (
                        pageNumbers.map(num => (
                            <li className="page-item" key={num}>
                                <a onClick={() => paginate(num)} href="#" className="page-link">
                                    <div className="num">
                                        {num}
                                    </div>

                                </a>
                            </li>
                        ))
                    )}
                    <li className="page-item">
                        <a className="page-link right" href="#" onClick={() => nextPage()}>
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination