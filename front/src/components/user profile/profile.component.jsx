import React, { Component } from 'react'
import AuthService from '../../services/auth.service'
import './profile.component.scss'
import Footer from '../footer/footer.component'
import TripService from '../../services/trip.service'
import CityService from '../../services/city.service'
import PlaceService from '../../services/place.service'
import { Switch, Route, Link, Redirect } from "react-router-dom";
import PlaceTrip from '../plan trip/place-trip.component'
import Pagination from '../others/pagination.component'
import { format } from 'date-fns'


export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            listOfTrips: [],
            listOfCities: [],
            listOfPlaces: [],
            isUpdate: false,
            tripID: '',
            title: '',
            note: '',
            city: '',
            place: [],
            startDate: '',
            endDate: '',
            loading: false,
            currentPage: 1,
            placesPerPage: 4,
            type: 'text',
        }
    }

    componentDidMount() {
        TripService.getTrip().then(
            res => {
                this.setState({ listOfTrips: res.data })
            }
        )
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

    handleDeleteTrip(id) {
        TripService.deleteTrip(id)
        window.location.reload();
    }

    handleEdit(tripID, title, note, city, place, startDate, endDate) {
        this.setState({ tripID: tripID, title: title, note: note, city: city, place: [], startDate: startDate, endDate: endDate, isUpdate: true })

    }

    handleUpdateTrip(id) {
        TripService.putTrip(
            id,
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

    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    render() {
        const { currentUser, isUpdate, loading, currentPage, placesPerPage } = this.state;

        const indexOfLastPlace = currentPage * placesPerPage;

        const indexOfFirstPlace = indexOfLastPlace - placesPerPage;

        const currentPlaces = this.state.listOfPlaces.filter(f => f.city == this.state.city).slice(indexOfFirstPlace, indexOfLastPlace);

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
            <div className='profile'>
                <div className="row">
                    <div className="col-3">
                        <div className="card">
                            <img src="https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Tynan-Allan.jpeg" alt="" />
                            <div className="card-header">
                                <h2>
                                    <strong>{currentUser.username}</strong>
                                </h2>
                            </div>

                            <div className="container">
                                {/* <p>
                                    <strong>Token:</strong>{" "}
                                    {currentUser.accessToken.substring(0, 15)} ...{" "}
                                    {currentUser.accessToken.substr(currentUser.accessToken.length - 10)}
                                </p> */}

                                <p>
                                    <strong>ID:</strong>{" "}
                                    {currentUser.id}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {currentUser.email}
                                </p>


                                <ul>
                                    <strong>Authorities:</strong>
                                    {currentUser.roles && currentUser.roles.map((role, i) =>
                                        <li key={i}>
                                            {role}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="list-trip-by-user">
                            {this.state.listOfTrips.filter(f => f.email == currentUser.email).map(p => (
                                <div className="container">
                                    <div className={!isUpdate ? "row" : "row active"}>
                                        <div className="col-8">
                                            <div className="trip-title">
                                                {p.title}
                                                <div className="trip-date">
                                                    {p.startDate} || {p.endDate}
                                                </div>
                                                <div className="buttons">
                                                    <Link to={`/trip-detail/${p._id}`}>
                                                        <button className="view">
                                                            <i class="fas fa-eye"></i> View
                                                        </button>
                                                    </Link>
                                                    <button className="edit" onClick={this.handleEdit.bind(this, p._id, p.title, p.note, p.city, p.place, p.startDate, p.endDate)}>
                                                        <i class="fas fa-edit"></i> Edit
                                                    </button>

                                                    <button className="delete" onClick={this.handleDeleteTrip.bind(this, p._id)}>
                                                        <i class="fas fa-trash-alt"></i> Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="seperator"></div>

                                            <div className="trip-note">
                                                <strong>Note: </strong>
                                                {p.note}
                                            </div>

                                            <div className="trip-city">
                                                <strong>City: </strong>
                                                {this.state.listOfCities.filter(f => f._id == p.city).map(p => (
                                                    p.name
                                                ))}
                                            </div>

                                            <div className="trip-place">
                                                <strong>Place(s): </strong>
                                                <div className="place">
                                                    {this.state.listOfPlaces.filter(f => {
                                                        for (let i = 0; i < p.place.length; i++) {
                                                            if (p.place[i] == f._id) return true
                                                        }
                                                    }).map(p => (
                                                        <div className="location">
                                                            <img src={p.images.url} alt="" />
                                                            <div className="location-name">
                                                                {p.name}
                                                            </div>
                                                            <Link to={`/detail/${p._id}`}>
                                                                <div class="overlay">
                                                                    <div class="text">Click here</div>
                                                                </div>
                                                            </Link>
                                                        </div>

                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <div className="img">
                                                {this.state.listOfCities.filter(f => f._id == p.city).map(p => (
                                                    <img src={p.images.url} alt="" />
                                                ))}
                                            </div>

                                            {/* <button onClick={() => console.log(this.state.title)}>click</button> */}
                                        </div>
                                    </div>

                                    <div className="update-container">
                                        <div className={isUpdate ? "overlay active" : "overlay"}>
                                            <button className="close" onClick={() => this.setState({ isUpdate: false })}>&times;</button>
                                            <div className="row">
                                                <div className="col-5">
                                                    <div className="col-title">
                                                        <strong>Information</strong>
                                                    </div>
                                                    
                                                    <div className="c-trip title">
                                                        <div className="input">
                                                            <div className="label">
                                                                <strong>Title</strong>
                                                            </div>
                                                            <input type="text" name='title' onChange={this.handleChange.bind(this)} value={this.state.title} />
                                                        </div>
                                                    </div>

                                                    <div className="c-trip start-date">
                                                        <div className="input">
                                                            <div className="label">
                                                                <strong>Start Date</strong>
                                                            </div>
                                                            <input type={this.state.type} placeholder="Start date"
                                                                name='startDate' id='startDate'
                                                                onFocus={() => { this.setState({ type: 'date' }) }}
                                                                onBlur={() => { this.setState({ type: 'text' }) }}
                                                                onChange={this.handleChange.bind(this)}
                                                                value={this.state.startDate}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="c-trip end-date">
                                                        <div className="input">
                                                            <div className="label">
                                                                <strong>End Date</strong>
                                                            </div>
                                                            {this.state.startDate && (
                                                                <input type={this.state.type} placeholder="End date"
                                                                    name='endDate' id='endDate'
                                                                    min={format(new Date(this.state.startDate), "yyyy-MM-dd")}
                                                                    onFocus={() => { this.setState({ type: 'date' }) }}
                                                                    onBlur={() => { this.setState({ type: 'text' }) }}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    value={this.state.endDate}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="c-trip note">
                                                        <div className="input">
                                                            <div className="label">
                                                                <strong>Note</strong>
                                                            </div>
                                                            <textarea rows='5' type="text" name='note' onChange={this.handleChange.bind(this)} value={this.state.note} />
                                                        </div>
                                                    </div>

                                                    <div className="buttons">
                                                        <button className={this.state.place != '' ? 'update' : 'update hide'} onClick={this.handleUpdateTrip.bind(this, this.state.tripID)}>
                                                            <i class="fas fa-folder-plus"></i> Update
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-7">
                                                    <div className="c-trip places">
                                                        <div className="place-container" onChange={this.onChangeValue.bind(this)}>
                                                            <PlaceTrip listOfPlaces={currentPlaces} loading={loading} city={this.state.city} place={this.state.place} />
                                                            <Pagination placesPerPage={placesPerPage} totalPlaces={currentPlaces.length} nextPage={nextPage} prevPage={prevPage} />
                                                        </div>
                                                    </div>
                                                    <div className="col-note">
                                                        <strong>Note: </strong>
                                                        Please choose a place to process the update
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}

