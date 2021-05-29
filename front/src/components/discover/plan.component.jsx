import React, { Component } from 'react'
import CityService from '../../services/city.service'
import PlaceService from '../../services/place.service'
import './plan.component.scss'
import Footer from '../footer/footer.component'
import { json } from 'body-parser'
import Loading from '../others/loading.component'
import { Switch, Route, Link, Redirect } from "react-router-dom";
import UserService from '../../services/user.service'
import Places from './place.component'
import Pagination from '../others/pagination.component'

const urlPlace = 'http://localhost:8080/api/place'
export default class Plan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfCities: [],
            listOfPlaces: [],
            input: '',
            cityID: '',
            loading: false,
            successful: false,
            content: '',
            currentPage: 1,
            placesPerPage: 10,
        }
    }

    componentDidMount() {
        UserService.getGuestBoard().then(
            res => {
                this.setState({ content: res.data, successful: true })
            }, err => {
                this.setState({
                    content: (err.res && err.res.data && err.res.data.message)
                        || err.message
                        || err.toString()
                })
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
        this.filterByCity()
        this.search()
    }

    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    search() {
        fetch(urlPlace)
            .then(res => res.json())
            .then(json => {
                let data = json.filter((d, i) => d.name == this.state.input)
                this.setState({ listOfPlaces: data })
            })
    }

    filterByCity() {
        this.setState({ loading: true })
        fetch(urlPlace)
            .then(res => res.json())
            .then(json => {
                let data = json.filter((d, i) => d.city == this.state.cityID)
                this.setState({ listOfPlaces: data })
            })
        this.setState({ loading: false, currentPage: 1 })
    }

    render() {
        // const { loading, successful, currentPlace, placesPerPage } = this.state;

        const { successful, currentPage, placesPerPage, listOfPlaces, loading } = this.state;

        const indexOfLastPlace = currentPage * placesPerPage;
        const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
        const currentPlaces = listOfPlaces.slice(indexOfFirstPlace, indexOfLastPlace);

        const paginate = pageNum => this.setState({ currentPage: pageNum });

        const nextPage = () => {
            if (currentPage != Math.ceil(listOfPlaces.length / placesPerPage)) {
                this.setState({ currentPage: currentPage + 1 })
            }
        };

        const prevPage = () => {
            if (currentPage != 1) {
                this.setState({ currentPage: currentPage - 1 })
            }
        };


        return (
            <div className="plan-page">
                {successful ? (
                    <div className="top">
                        <div className="title">
                            <h1>Get with us and get away</h1>
                        </div>
                        <div className="searchbar">
                            <form className='search-form' >
                                <input type="text" placeholder='Search for a destination'
                                    name='input' value={this.state.input}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </form>
                            <button className="submit" onClick={this.search.bind(this)}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                        <div className="city">
                            {this.state.listOfCities.map(p => (
                                <ul className="list-of-city">
                                    <li onClick={this.filterByCity.bind(this)}>

                                        <strong className='city' onClick={() => {
                                            this.setState({ cityID: p._id })
                                        }}>
                                            {p.name}
                                        </strong>

                                    </li>
                                </ul>
                            ))}
                        </div>

                        <Places listOfPlaces={currentPlaces} loading={loading} />
                        <Pagination placesPerPage={placesPerPage} totalPlaces={listOfPlaces.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                    </div>
                ) : (
                    <div className="notifi">
                        {this.state.content}
                    </div>
                )
                }

                < div className="bottom">
                    <Footer />
                </div>

            </div >
        )
    }
}