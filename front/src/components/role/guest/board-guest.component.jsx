import React, { Component } from 'react'
import UserService from '../../../services/user.service'
import './board-guest.component.scss'
import Footer from '../../footer/footer.component'
import { Link } from 'react-router-dom'

// import vnomad from './VNOMAD.mp4'
// import video from './video-resort.mp4'

// const url = 'https://www.youtube.com/embed/xLDM6ukEMtc?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&playlist=xLDM6ukEMtc&loop=1'
// const url = 'https://www.youtube.com/embed/Ilui-mb3sT0?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&playlist=xLDM6ukEMtc&loop=1'
export default class Guest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            successful: false,
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

    }

    render() {
        const { successful } = this.state;
        return (
            <div className='user-homepage'>
                {successful ? (
                    <div className="top">
                        {/* Up file mp4 here */}
                        <video src={''} autoPlay loop muted />
                        <div className="overlay"></div>

                        <div className="title">
                            Made possible by VNomad
                        </div>
                        <div className='text'>
                            <h2>Welcome to Vietnam</h2>
                            <h3>A country of the beauty and peace</h3>
                            <p>Vietnam has a firm position in a bucket list of many travelers worldwide. Say that most of your friends or relatives advise you to visit this Southeast Asian country at least once, but you still cannot buy their words. Then, the following bits are well-written with an attempt to win your interest. As the destination warmly welcomes you, just say <strong>“Hello Vietnam.”</strong> </p>
                            <Link to={'/discover'}>
                                <button className='discoverr'>explore</button>
                            </Link>
                        </div>
                        <ul className="social-media">
                            <li>
                                <i className="fab fa-facebook-f"></i>
                            </li>

                            <li>
                                <i className="fab fa-instagram"></i>
                            </li>

                            <li>
                                <i className="fab fa-twitter"></i>
                            </li>

                            <li>
                                <i className="fab fa-youtube"></i>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="notifi">
                        {this.state.content}
                    </div>
                )
                }
                {/* <div className="footer">
                    <Footer />
                </div> */}

            </div>
        )
    }
}
