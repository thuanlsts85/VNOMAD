import React, { Component } from 'react'
import UserService from '../../../services/user.service'
import CityService from '../../../services/city.service'
import PlaceService from '../../../services/place.service'
import CategoryService from '../../../services/category.service'
import authHeader from '../../../services/auth-header'
import Footer from '../../footer/footer.component'
import './board-admin.component.scss'
import placeService from '../../../services/place.service'
import axios from 'axios'
import Loading from '../../others/loading.component'
import { Switch, Route, Link, Redirect } from "react-router-dom";


const API_URL = 'http://localhost:8080/api/place'
export default class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddPlace = this.handleAddPlace.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.state = {
            listOfPlaces: [],
            listOfCities: [],
            listOfCategories: [],
            successful: false,
            loading: false,
            edited: false,
            content: '',
            hiddenID: '',
            placeID: '',
            name: '',
            address: '',
            city: '',
            description: '',
            images: [],
            category: '',
            lat: '',
            lng: '',
            URL: '',
            limit: 5,
        }
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
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
        CategoryService.getCategory().then(
            res => {
                this.setState({ listOfCategories: res.data })
            }
        )

    }

    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleAddPlace(e) {
        e.preventDefault();
        try {
            if (!this.state.placeID
                || !this.state.name
                || !this.state.description
                || !this.state.address
                || !this.state.city
                || !this.state.category
                || this.state.images === ''
                || !this.state.lat
                || !this.state.lng
                || !this.state.URL
            ) {
                return alert("Please fill all the form!")
            }
            PlaceService.createPlace(
                this.state.placeID,
                this.state.name,
                this.state.description,
                this.state.address,
                this.state.city,
                this.state.category,
                this.state.images,
                this.state.lat,
                this.state.lng,
                this.state.URL
            )
            window.location.reload();
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    handleDelete(id) {
        PlaceService.deletePlace(id)
        window.location.reload()
    }

    handleClear() {
        this.setState({
            hiddenID: '', placeID: '', name: '',
            address: '', city: '', category: '',
            lat: '', lng: '', URL: '',
            description: '', edited: false
        })
    }

    handleEdit(hiddenID, placeID, name, address, city, category, lat, lng, url, description, images) {
        this.setState({
            hiddenID: hiddenID, placeID: placeID, name: name,
            address: address, city: city, category: category,
            lat: lat, lng: lng, URL: url, description: description,
            images: images, edited: true
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    handleUpdatePlace(id, e) {
        e.preventDefault();
        try {
            PlaceService.putPlace(
                id,
                this.state.placeID,
                this.state.name,
                this.state.description,
                this.state.address,
                this.state.city,
                this.state.category,
                this.state.images,
                this.state.lat,
                this.state.lng,
                this.state.URL,
            )
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    handleUpload = async e => {
        e.preventDefault();
        try {
            const file = e.target.files[0]
            // console.log(file);

            if (!file) {
                return alert('file not exist')
            }

            //if file size > 1 mb
            if (file.size > 1024 * 1024) {
                return alert('file too large')
            }

            //Only PNG or JPEG
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                return alert('incorrect file format')
            }

            let formData = new FormData()
            formData.append('file', file)

            this.setState({ loading: true })
            const res = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: authHeader()
            })

            this.setState({ images: res.data, loading: false })
            console.log(this.state.images);

        } catch (error) {
            alert(error.response.data.msg)
        }

    }

    handleDestroy = async () => {
        try {
            this.setState({ loading: true })
            await axios.post('http://localhost:8080/api/destroy', { public_id: this.state.images.public_id }, {
                headers: authHeader()
            })

            this.setState({ images: [], loading: false })
            document.getElementById('file_up').value = '';
            console.log(this.state.images);
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    handleLoadMore() {
        this.setState({ loading: true })
        this.setState({ limit: this.state.limit + 5, loading: false })
    }

    render() {
        const { successful, loading, limit, edited } = this.state;


        return (
            <div className='admin-page'>
                {successful ? (
                    <div className="place-form">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="upload">
                                    <input type="file" name='file' id='file_up' onChange={this.handleUpload} />
                                    {loading ? (
                                        <div id="file_img">
                                            <Loading />
                                        </div>
                                    ) : (
                                        <div id="file_img" style={{ display: this.state.images != '' ? "block" : "none" }}>
                                            <img src={this.state.images ? this.state.images.url : ''} alt="" />
                                            <span onClick={this.handleDestroy}>&times;</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <form className='createPlace'>
                                    <div className="left-block">
                                        {this.props.match.params._id}
                                        <div className="c-place ID">
                                            <label htmlFor="placeID">Place ID</label>
                                            <input type="text" name='placeID' id='placeID' required
                                                value={this.state.placeID} placeholder='Please input place ID'
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>

                                        <div className="c-place name">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" name='name' id='name' required
                                                value={this.state.name} placeholder='Please input place name'
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>

                                        <div className="c-place address">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" name='address' id='address' required
                                                value={this.state.address} placeholder='Please input place address'
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>

                                        <div className="c-place city">
                                            <label htmlFor="city">City</label>
                                            <select name="city" id="city" value={this.state.city}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                                <option value="">Please choose a city</option>
                                                {this.state.listOfCities.map(p => (
                                                    <option value={p._id} key={p._id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="c-place category">
                                            <label htmlFor="category">Category</label>
                                            <select name="category" id="category" value={this.state.category}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                                <option value="">Please choose a category</option>
                                                {this.state.listOfCategories.map(p => (
                                                    <option value={p._id} key={p._id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="right-block">
                                        <div className="c-place latitude">
                                            <label htmlFor="lat">Latitude</label>
                                            <input type="number" name='lat' id='lat' required
                                                value={this.state.lat} placeholder='Please input place latitude'
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>

                                        <div className="c-place longtitude">
                                            <label htmlFor="lng">Longtitude</label>
                                            <input type="number" name='lng' id='lng' required
                                                value={this.state.lng} placeholder='Please input place longtitude'
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>

                                        <div className="c-place placeURL">
                                            <label htmlFor="url">URL</label>
                                            <input type="text" name='URL' id='URL' required
                                                value={this.state.URL} placeholder='Please input place URL'
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>

                                        <div className="c-place description">
                                            <label htmlFor="description">Description</label>
                                            <textarea name="description" id="description" rows="4"
                                                value={this.state.description} required
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>

                                    {/* if edit, toggle update button */}
                                    {edited ? (
                                        <div className="buttons">
                                            <button type='submit' onClick={this.handleUpdatePlace.bind(this, this.state.hiddenID)}>
                                                <i class="fas fa-folder-plus"></i> Update
                                            </button>

                                            <button className="button" onClick={this.handleClear}>
                                                <i class='fas fa-eraser'></i> Clear
                                            </button>
                                        </div>

                                    ) : (
                                        <div className="buttons">
                                            <button type='submit' onClick={this.handleAddPlace}>
                                                <i class="fas fa-folder-plus"></i> Create
                                            </button>

                                            <button className="button" onClick={this.handleClear}>
                                                <i class='fas fa-eraser'></i> Clear
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        <div className="row place-display">
                            <div className="col-md-12">
                                <div className="places">
                                    {this.state.listOfPlaces.slice(0, this.state.limit).map(p => (
                                        <div className="a-place">
                                            <div className="place-image">
                                                <Link to={`/detail/${p._id}`}>
                                                    <img src={p.images.url} alt="" />
                                                </Link>
                                            </div>

                                            <div className="place-info">
                                                <div className="place-name">
                                                    {p.name}
                                                </div>
                                                <div className="place-des">
                                                    {p.description}

                                                </div>
                                            </div>

                                            <div className="place-button">
                                                <button className='edit'
                                                    onClick={this.handleEdit.bind(this,
                                                        p._id,
                                                        p.place_id,
                                                        p.name,
                                                        p.address,
                                                        p.city,
                                                        p.category,
                                                        p.lat,
                                                        p.lng,
                                                        p.URLs,
                                                        p.description,
                                                        p.images
                                                    )}
                                                >
                                                    <i class="fas fa-edit"></i> Edit
                                                </button>

                                                <button className="delete" onClick={this.handleDelete.bind(this, p._id)}>
                                                    <i class="fas fa-trash-alt"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {limit < this.state.listOfPlaces.length && (
                                    <button className='loadmore' onClick={this.handleLoadMore.bind(this)}>
                                        Load More...
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="footer">
                            <Footer />
                        </div>
                    </div>

                ) : (
                    <div className="title">
                        {this.state.content}
                    </div>
                )
                }
            </div >
        )
    }
}