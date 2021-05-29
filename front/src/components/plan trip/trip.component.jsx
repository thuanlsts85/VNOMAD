import React, { Component } from 'react'
import CityService from '../../services/city.service'
import PlaceService from '../../services/place.service'
import TripService from '../../services/trip.service'
import AuthService from '../../services/auth.service'
import './trip.component.scss'
// import Footer from './footer.component'
import Pagination from '../others/pagination.component'
import PlaceTrip from './place-trip.component'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { format } from 'date-fns'


export default class Trip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            listOfPlaces: [],
            listOfCities: [],
            place: [],
            city: '',
            note: '',
            title: '',
            startDate: '',
            endDate: '',
            step: false,
            loading: false,
            currentPage: 1,
            placesPerPage: 3,
            type: 'text',
            done: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            lat: 16.222222,
            lng: 105.590866,
            zoom: 6
        }
    }

    componentDidMount() {
        CityService.getCity().then(
            res => {
                this.setState({ listOfCities: res.data })
            }
        )
        PlaceService.getPlace().then(
            res => {
                this.setState({ listOfPlaces: res.data })
            }
        )
    }

    onChangeValue(e) {
        if (e.target.checked === true) {
            this.setState({ place: [...this.state.place, e.target.value] })
        }
        else {
            const selectedValue = this.state.place.filter(a => {
                if (a === e.target.value) return false;
                return true;
            })
            this.setState({ place: [...selectedValue] })
        }
    }

    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleAddTrip(e) {
        e.preventDefault();
        TripService.createTrip(
            this.state.title,
            this.state.note,
            this.state.city,
            this.state.place,
            this.state.startDate,
            this.state.endDate,
            this.state.currentUser.email
        )
        window.location.reload();
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        const { done, currentUser, step, currentPage, placesPerPage, listOfPlaces, loading, city } = this.state;

        const indexOfLastPlace = currentPage * placesPerPage;
        const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
        const currentPlaces = listOfPlaces.filter(f => f.city == this.state.city).slice(indexOfFirstPlace, indexOfLastPlace);

        const totalPlaces = this.state.listOfPlaces.filter(f => f.city == this.state.city);
        const totalpage = Math.ceil(totalPlaces.length / placesPerPage)

        const nextPage = () => {
            if (currentPage != totalpage) {
                this.setState({ currentPage: currentPage + 1 })
            }
        };

        const prevPage = () => {
            if (currentPage != 1) {
                this.setState({ currentPage: currentPage - 1 })
            }
        };


        return (
            <div className="trip">
                <div className="row">

                    <div className="col-lg-6 ">
                        <div className="city">
                            <div className="img">
                                {!this.state.city ? (
                                    <img src="https://image.freepik.com/free-vector/famous-landmark-vietnam-banner_11700-317.jpg" />
                                ) : (
                                    <div className="imgbycity">
                                        {this.state.listOfCities.filter(f => f._id == this.state.city).map(p => (
                                            <img src={p.images.url} alt="" />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="card">
                                <div className="title">
                                    <h1>
                                        <input type="text" name='title' onChange={this.handleChange.bind(this)}
                                            value={this.state.title} placeholder='Trip to somewhere' required
                                        />
                                    </h1>
                                </div>
                                <div className="body">
                                    <div className="selectcity">
                                        <strong>
                                            Where to? {''}
                                        </strong>
                                        <select name="city" id="city"
                                            onChange={this.handleChange.bind(this)}
                                            onClick={() => {
                                                if (totalPlaces.length > 3) {
                                                    this.setState({ step: true })
                                                }
                                                else this.setState({ step: false })
                                            }}
                                            value={this.state.city}
                                            required
                                        >
                                            <option selected>Choose a city</option>
                                            {this.state.listOfCities.map(p => (
                                                <option value={p._id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="date">
                                        <strong className="title">Date: </strong>
                                        <div className="form-date">
                                            {/* input form of start date */}
                                            <input type={this.state.type} placeholder="Start date"
                                                name='startDate' id='startDate'
                                                onFocus={() => { this.setState({ type: 'date' }) }}
                                                onBlur={() => { this.setState({ type: 'text' }) }}
                                                onChange={this.handleChange.bind(this)}
                                                value={this.state.startDate}
                                                required
                                            />

                                            {/* Input form of end date based on start date */}
                                            {this.state.startDate && (
                                                <React.Fragment>
                                                    <i class="fas fa-long-arrow-alt-right"></i>
                                                    <input type={this.state.type} placeholder="End date"
                                                        name='endDate' id='endDate'
                                                        min={format(new Date(this.state.startDate), "yyyy-MM-dd")}
                                                        onFocus={() => { this.setState({ type: 'date' }) }}
                                                        onBlur={() => { this.setState({ type: 'text' }) }}
                                                        onChange={this.handleChange.bind(this)}
                                                        value={this.state.endDate}
                                                        required
                                                    />
                                                </React.Fragment>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={
                            this.state.title
                                && this.state.city
                                && this.state.startDate
                                && this.state.endDate ? 'places' : 'places hide'}
                            onChange={this.onChangeValue.bind(this)}>
                            <h2>
                                <strong>
                                    Places
                                </strong>
                            </h2>
                            <div className="place-container">
                                <PlaceTrip listOfPlaces={currentPlaces} loading={loading} city={city} />

                                <div className="overlay">
                                    {this.state.listOfPlaces.filter(f => {
                                        for (let i = 0; i < this.state.place.length; i++) {
                                            if (this.state.place[i] == f._id) return true
                                            else {
                                                this.state.place.filter(a => {
                                                    if (a === f._id) return false;
                                                    return true;
                                                })
                                            }
                                        }
                                    }).map(p => (
                                        <button onClick={() => (this.setState({ lat: p.lat, lng: p.lng, zoom: 14 }))} >
                                            <i class="fas fa-search"></i> {p.name}
                                        </button>
                                    ))}
                                </div>

                                {step && (
                                    <Pagination placesPerPage={placesPerPage} totalPlaces={currentPlaces.length} nextPage={nextPage} prevPage={prevPage} />
                                )}
                            </div>
                        </div>

                        <div className={
                            this.state.title
                                && this.state.city
                                && this.state.startDate
                                && this.state.endDate
                                && this.state.place != '' ? 'note' : 'note hide'}>
                            <h2>
                                <strong>
                                    Notes
                                </strong>
                            </h2>
                            <textarea type='text' name="note" id="note"
                                value={this.state.note} onChange={this.handleChange.bind(this)}
                                placeholder='Write or paste something here'
                                required
                            />
                        </div>


                        {/* Add trip */}
                        <div className={
                            this.state.title
                                && this.state.city
                                && this.state.startDate
                                && this.state.endDate
                                && this.state.note
                                && this.state.place != '' ? 'button' : 'button hide'} onClick={this.handleAddTrip.bind(this)} >
                            <div className="icon">
                                <i class="fas fa-bookmark"></i>
                                <i class="fas fa-plus"></i>
                            </div>
                            <div className="add">
                                Add
                            </div>
                        </div>
                    </div>

                    {/* MAP */}
                    <div className="col-6">
                        <Map
                            google={this.props.google}
                            zoom={this.state.zoom}
                            center={{
                                lat: this.state.lat,
                                lng: this.state.lng
                            }}
                        >
                            {this.state.listOfPlaces.filter(f => {
                                for (let i = 0; i < this.state.place.length; i++) {
                                    if (this.state.place[i] == f._id) return true
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
                </div>
            </div >
        )
    }
}

Trip = GoogleApiWrapper({
    apiKey: ("AIzaSyB5l825tRVdGi22ObjlkYF890s6ME2XSD8")
})(Trip);