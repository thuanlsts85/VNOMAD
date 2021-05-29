import React, { Component } from 'react'
import PlaceService from '../../services/place.service'
import { Switch, Route, Link, Redirect } from "react-router-dom";

export class Places extends Component {

    handleDelete(id) {
        PlaceService.deletePlace(id);
        window.location.reload();
    }
    render() {
        const { listOfPlaces, loading, isAdmin } = this.props;

        if (loading) {
            return <h2>Loading...</h2>
        }

        return (
            <div className="place">
                {listOfPlaces.map(p => (
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-image">
                                <Link to={`/detail/${p._id}`}>
                                    <img src={p.images.url} alt="" />
                                </Link>
                            </div>
                            <div className="card-body">
                                <strong>
                                    {p.name}
                                </strong>
                                <div className='dess'>
                                    {p.description}
                                </div>

                                {/* <p>
                                    {p.description.substring(0, 60)}...
                                </p> */}
                            </div>

                            {isAdmin && (
                                <div className="card-footer">
                                    <button className="delete" onClick={this.handleDelete.bind(this, p._id)}>
                                        <i class="fas fa-trash-alt"></i> Delete
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default Places