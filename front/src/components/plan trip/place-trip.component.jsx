import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from "react-router-dom";

export class PlaceTrip extends Component {
    render() {
        const { listOfPlaces, loading, city, place } = this.props;

        if (loading) {
            return <h2>Loading...</h2>
        }

        return (
            <div className="place">
                <div className="each">
                    {listOfPlaces.filter(f => f.city == city).map(p => (
                        <div className="element">
                            <label >
                                <div className="img">
                                    <img src={p.images.url} alt="image" />
                                </div>

                                <input className='topright' type="checkbox" value={p._id} required />
                                <strong>
                                    {p.name}
                                </strong>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default PlaceTrip