import React, { Component } from 'react'
import TripService from '../../services/trip.service'
import PlaceService from '../../services/place.service'
import CityService from '../../services/city.service'
import CategoryService from '../../services/category.service'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom'
import Loading from '../others/loading.component'
import './trip-detail.component.scss'

export default class TripDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfTrips: [],
            listOfPlaces: [],
            listOfCities: [],
            listOfCategory: [],
            loading: false,
            lat: 16.222222,
            lng: 105.590866,
            zoom: 6,

        }
    }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        try {
            this.setState({ loading: true })

            TripService.getTrip().then(
                res => {
                    this.setState({ listOfTrips: res.data })
                }
            )
            PlaceService.getPlace().then(
                res => {
                    this.setState({ listOfPlaces: res.data })
                }
            )

            CityService.getCity().then(
                res => {
                    this.setState({ listOfCities: res.data })
                }
            )

            CategoryService.getCategory().then(
                res => {
                    this.setState({ listOfCategory: res.data })
                }
            )

            this.setState({ loading: false })
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    handleDelete(id) {
        TripService.deleteTrip(id)
    }

    render() {
        const { loading } = this.state;
        return (
            <div className="trip-detail-page">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="loading-false">
                        {this.state.listOfTrips.filter(f => f._id === this.props.match.params._id).map(p => (
                            <div className="row">
                                <div className="col-md-6 left">
                                    <div className="trip-city-top">
                                        <div className="trip-city-image">
                                            {this.state.listOfCities.filter(f => f._id === p.city).map(p => (
                                                <div className="city-img">
                                                    <img src={p.images.url} alt="" />
                                                    <div className="cityname">
                                                        <h1>{p.name}</h1>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="t-c-info">
                                                <div className="trip-card">
                                                    <div className="title">
                                                        {p.title}
                                                    </div>

                                                    <div className="trip-date">
                                                        <div className="start">
                                                            <i class="fas fa-plane-departure"></i> {p.startDate}
                                                        </div>

                                                        <div className="end">
                                                            {p.endDate} <i class="fas fa-plane-arrival"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="trip-city-body">
                                        <div className="trip-button">
                                            <button className="back">
                                                <Link to={'/profile'} className='to-profile'>
                                                    <i class="fas fa-chevron-left"></i> back
                                        </Link>
                                            </button>

                                            <button className="delete" onClick={this.handleDelete.bind(this, p._id)}>
                                                <Link to={'/profile'} className='to-profile'>
                                                    <i class="fas fa-trash-alt"></i> delete
                                        </Link>
                                            </button>
                                        </div>

                                        <div className="place-detail">
                                            {this.state.listOfPlaces.filter(f => {
                                                for (let i = 0; i < p.place.length; i++) {
                                                    if (p.place[i] == f._id) return true
                                                }
                                            }).map(p => (
                                                <div className="detail">
                                                    <div className="btn">
                                                        <button className='searchbtn' onClick={() => (this.setState({ lat: p.lat, lng: p.lng, zoom: 14 }))} >
                                                            <i class="fas fa-search"></i>
                                                        </button>

                                                        <button className='viewbtn'>
                                                            <Link className='view' to={`/detail/${p._id}`}>
                                                                <i class="fas fa-eye" />
                                                            </Link>
                                                        </button>
                                                    </div>

                                                    <div className="name-des">
                                                        <div className="name">
                                                            {p.name}
                                                        </div>
                                                        <div className="des">
                                                            {p.description}
                                                        </div>
                                                    </div>

                                                    <div className="img">
                                                        <img src={p.images.url} alt="" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div >

                                <div className="col-md-6 right">
                                    <Map
                                        google={this.props.google}
                                        zoom={this.state.zoom}
                                        center={{
                                            lat: this.state.lat,
                                            lng: this.state.lng
                                        }}
                                    >
                                        {this.state.listOfPlaces.filter(f => {
                                            for (let i = 0; i < p.place.length; i++) {
                                                if (p.place[i] === f._id) return true
                                            }
                                        }).map(p => (
                                            <Marker
                                                position={{
                                                    lat: p.lat,
                                                    lng: p.lng
                                                }}
                                                draggable={true}
                                            />
                                        ))}
                                    </Map>
                                </div>
                            </div >
                        ))}
                    </div>
                )
                }

            </div >
        )
    }
}

TripDetail = GoogleApiWrapper({
    apiKey: ("AIzaSyB5l825tRVdGi22ObjlkYF890s6ME2XSD8")
})(TripDetail);