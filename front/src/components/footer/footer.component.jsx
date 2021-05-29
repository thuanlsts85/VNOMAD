import React from 'react'
import { Link } from 'react-router-dom'
import './footer.component.scss'


export default class Footer extends React.Component {


    render() {
        return (
            <div className='footer'>
                <section className="footer-title">
                    <h2 className="title">
                        Join the Adventure newsletter to receive our best vacation deals
                    </h2>

                    <h3 className="sub-title">
                        You can unsubscribe at any time.
                    </h3>

                    <div className="input-area">
                        <form>
                            <input type="email" name='email'
                                placeholder='Your Email'
                                className="email-subscribe" />

                            <button className="button-subscribe">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

                <div className="footer-content">
                    <div className="footer-content-wrapper">
                        <div className="footer-content-items">
                            <h2>About</h2>
                            <Link>How it works</Link>
                            <Link>Terms of Service</Link>
                            <Link>About Us</Link>
                            <Link>Bla blas</Link>

                        </div>

                        <div className="footer-content-items">
                            <h2>Contact</h2>
                            <Link>Contact Us</Link>
                            <Link>Support</Link>
                            <Link>Bla blas</Link>
                            <Link>Bla blas</Link>

                        </div>
                        <div className="footer-content-items">
                            <h2>Videos</h2>
                            <Link>Submit Video</Link>
                            <Link>Ambassadors</Link>
                            <Link>Agency</Link>
                            <Link>Influencer</Link>

                        </div>

                        <div className="footer-content-items">
                            <h2>Media</h2>
                            <Link>Instagram</Link>
                            <Link>Facebook</Link>
                            <Link>Youtube</Link>
                            <Link>Twitter</Link>
                        </div>
                    </div>
                </div>

                <section className="social-media">
                    <div className="social-media-wrap">
                        <div className="footer-logo">
                            <Link className='social-logo'>
                                VNomad <i style={{color:'red'}} className='fa fa-map-marker' />
                            </Link>
                        </div>

                        <small className="website-rights">VNomad © 2021</small>

                        <div className="social-icons">
                            <Link target='_blank' aria-label='Facebook' className="social-icon-link facebook">
                                <i className="fab fa-facebook-f"></i>
                            </Link>

                            <Link target='_blank' aria-label='Instagram' className="social-icon-link instagram">
                                <i className="fab fa-instagram"></i>
                            </Link>

                            <Link target='_blank' aria-label='Twitter' className="social-icon-link twitter">
                                <i className="fab fa-twitter"></i>
                            </Link>

                            <Link target='_blank' aria-label='Youtube' className="social-icon-link youtube">
                                <i className="fab fa-youtube"></i>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}