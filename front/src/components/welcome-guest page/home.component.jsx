import React, { Component } from "react";
import UserService from '../../services/user.service'
import { Switch, Route, Link, Redirect } from "react-router-dom";
import './home.component.scss'
import Footer from '../footer/footer.component'



const url = 'https://www.youtube.com/embed/xLDM6ukEMtc?autoplay=1&mute=1&controls=0&playlist=xLDM6ukEMtc&loop=1'
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            loggedIn: false,
            appear: false,
        }
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            res => {
                this.setState({ content: res.data })
            }, error => {
                this.setState({
                    content: (error.res && error.res.data) || error.message || error.toString()
                })
            }
        )

        window.addEventListener('scroll', this.appear)
    }

    appear = () => {
        if (window.scrollY >= 720) {
            this.setState({ appear: true })
        } else {
            this.setState({ appear: false })
        }
    }

    render() {
        const { loggedIn, appear } = this.state;
        return (
            <div className='guest-homepage'>
                <div className="welcomepage">
                    <img className='overlap' src="https://wanderlog.com/assets/LandingPageInner__hero.jpg" alt="" />
                    <img className='overlap2' src="https://wanderlog.com/assets/LandingPageInner__foreground.png" alt="" />
                    <img className='overlap3' src="https://wanderlog.com/assets/LandingPageInner__path.png" alt="" />
                    <img className='overlap4 active' src="https://wanderlog.com/assets/LandingPageInner__girl.png" alt="" />

                    <div className="welcome">
                        <h1>The easiest way</h1>
                        <h3>to plan your trip</h3>
                        <p>Build, organize, and map your itineraries <br />in a free travel app designed for vacations <br />& road trips</p>
                    </div>

                    <div className="button-group">
                        <div className="button" data-toggle='modal' data-target='#ln'>Start planning a trip</div>
                        <div className="button mobile">Get the mobile app</div>
                    </div>
                </div>

                <div className="body">
                    <div className="body1">
                        <img src="https://www.vippng.com/png/detail/35-356758_icon-png-images-free-download-location-map.png" alt="" />
                        <div className="text">
                            <h1><strong>Your itinerary and your map <br /> in one view</strong></h1>
                            <p>No more switching between different <br /> apps, tabs, and tools to keep track of <br /> your travel plans.</p>
                        </div>
                    </div>

                    <div className="body2">
                        <div className={appear ? "grid active" : "grid"}>
                            <div className="gridone">
                                <img src="https://wanderlog.com/assets/LandingPageInner__addPlaces.png" alt="" />
                                <div className="text">
                                    <h3>Add places from guides with 1 click</h3>
                                    <p>We crawled the web so you don’t have to. <br />Easily save mentioned places.</p>
                                </div>
                            </div>
                            <div className="gridtwo">
                                <img src="https://wanderlog.com/assets/LandingPageFeatures__recommendations.png" alt="" />
                                <div className="text">
                                    <h3>Get personalized suggestions</h3>
                                    <p>Find the best places to visit with smart <br /> recommendations based on your itinerary.</p>
                                </div>
                            </div>
                            <div className="gridthree">
                                <img src="https://wanderlog.com/assets/LandingPageFeatures__export.png" alt="" />
                                <div className="text">
                                    <h3>Export your places to Google Maps</h3>
                                    <p>Synced automatically, for when plans change.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="body3">
                        <div className="text">
                            <h3>Join us on our mobile application</h3>
                            <p>With VNomad's mobile travel planner on<br/> Android and iOS, access and edit your trips<br/> wherever you go — even while offline.</p>
                            <div className="imgmobile">
                                <img src="https://wanderlog.com/assets/AppBadge__ios.png" alt=""/>
                                <img src="https://wanderlog.com/assets/AppBadge__android.png" alt=""/>
                            </div>
                        </div>
                        <img className='imgbody3' src="https://wanderlog.com/assets/LandingPageAppPromo__app.png" alt=""/>
                    </div>
                    <Footer />
                </div>


                <div className='modal fade' id='ln'>
                    <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content'>

                            <div className='modal-header'>
                                <button type='button' className='close' data-dismiss='modal'>&times;</button>
                            </div>

                            <div className='modal-body'>
                                You need to login to use this function!
                            </div>

                            <div className='modal-footer'>
                                <button className='btn btn-primary' data-dismiss='modal' onClick={() => { this.setState({ loggedIn: true }) }}>
                                    OK
                                </button>
                                {loggedIn && (
                                    <Redirect to={'/login'} target='_blank' />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}